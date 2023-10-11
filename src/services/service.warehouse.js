const {
  sequelize,
  WarehouseModel,
  SMModel,
  ProvidedModel,
} = require("../../models");

const ProcurementQueries = require("../queries/procurement.queries");
const WarehouseQueries = require("../queries/warehouse.queries");

// Fetch processing SMS
class WarehouseServiceFetchProcessingSMS {
  static async fetchProcessingSMS() {
    const result = await sequelize.query(
      ProcurementQueries.select_all_sm_query
    );
    return result[0];
  }
}

// Accept SM
class WarehouseServiceAcceptSMS {
  // Accept SMS To Warehouse
  static async acceptSMS(data) {
    for (let i = 0; i < data.checked_values.length; i++) {
      const res = await this.#withdrowSMAmount(data, i);
    }
    return "OK";
  }

  // Create Warehouse Model
  static async #createWarehouseModel(data, each) {
    const result = await WarehouseModel.create({
      delivery_material_name: data.checked_values[each].sm_material_name,
      delivery_material_amount: data.table_data[each].entering_delivery_amount,
      delivery_left_over_amount: data.table_data[each].entering_delivery_amount,
      delivery_material_unit: data.table_data[each].delivery_unit,
      delivery_material_price: data.checked_values[each].price,
      delivery_material_total: data.checked_values[each].total,
      delivery_material_currency: data.checked_values[each].currency,
      doc_number: data.sms_data.doc_number,
      doc_date: data.sms_data.doc_date,
      certificate: data.table_data[each].certificate,
      passport: data.table_data[each].passport,
      acceptedBy: data.user.id,
      smId: data.checked_values[each].sm_id,
    })
    return result;
  }

  // Withdrow From SMS LeftOver
  static async #withdrowSMAmount(data, each) {
    // Get Current SM Amount
    const entering_amount = Number(
      data.table_data[each].entering_delivery_amount
    );

    // Find SM with id
    const result = await this.#findSMById(data.checked_values[each].sm_id)
      .then(async (respond) => {
        const sm_amount = Number(respond.dataValues.sm_material_amount);
        // If Entering Amount Greater Than SM AMount
        if (entering_amount > sm_amount) {
          // Find Max Accepting Value
          const max_accepting_amount = sm_amount + (sm_amount * 0, 1);
          // If Greater Than Max Accepting Value Return Error
          if (entering_amount > max_accepting_amount) {
            throw new Error(
              `Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`
            );
          } else {
            await this.#updateSMLeftOverAmount(
              data.checked_values[each].sm_id,
              entering_amount
            ).then(async(respond)=>{
              await this.#createWarehouseModel(data, each)
              .then((respond)=>{

              }).catch((err)=>{
                throw new Error(
                  `Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`
                );
              })
            }).catch((err)=>{
              throw new Error(
                `Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`
              );
            })
          }
        }
        // If Not
        else {
          await this.#updateSMLeftOverAmount(
            data.checked_values[each].sm_id,
            entering_amount
          ).then(async(respond)=>{
            await this.#createWarehouseModel(data, each)
              .then((respond)=>{

              }).catch((err)=>{
                throw new Error(
                  `Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`
                );
              })
          }).catch((err)=>{
            throw new Error(
              `Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`
            );
          })
        }
      })
      .catch((err) => {
        console.log("error is : ", err);
      });
  }

  // Find sm row with id
  static async #findSMById(sm_id) {
    const result = await SMModel.findOne({
      where: {
        id: sm_id,
      },
    });
    return result;
  }

  // Update SM Left Over Amount
  static async #updateSMLeftOverAmount(sm_id, entering_amount) {
    const string_query = `
      UPDATE sm_models set left_over = left_over - ${entering_amount} where id = ${sm_id}; 
    `;
    const result = await sequelize.query(string_query);

    return result;
  }
}

// Fetch Received Warehouse
class WarehouseServiceFetchReceivedSMS {
  // Fetch Received SM From Warehouse
  static async fetchSMFromWarehouse() {
    const result = await sequelize.query(
      WarehouseQueries.received_sms_from_warehouse_query
    );
    // console.log('rec result is ', result[0]);
    return result[0];
  }
}

// Provide Sm From Warehouse To Area
class WarehouseServiceProvideSM {
  // Provide Material
  static async provideMaterial(data) {

    for (let i of data.data){

      // const res = await this.#createProvideModel(data.user, i);
      const each = await this.#findWarehouseItemById(i.warehouse_id);
  
      const res = await this.checkWithdrow(data.user, each, i)
      .then((respond)=>{
        // return respond;
      }).catch((err)=>{
        return new Error(err);
      })

    }

  }

  // Find Warehouse Data With Id
  static async #findWarehouseItemById (warehouse_id) {
    const res = await WarehouseModel.findOne({
      where:{
        id : warehouse_id
      }
    })
    console.log('finding is : ',res);
    return res.dataValues;
  }

  // Check If Withdrow if possible
  static async checkWithdrow (user_id, warehouse_item, data){
    if (warehouse_item.delivery_left_over_amount - data.provide_amount >= 0){
      const res = await this.#updateWarehouseItemLeftOver(warehouse_item.id, data.provide_amount)
      .then(async(respond)=>{
        return this.#createProvideModel(user_id, data);
      }).catch((err)=>{
        console.log('err ',err);
        return new Error("Check Withdrow Error : ",err);
      })
      return res;
    }
    else{
      return null;
    }
  }

  // Update Left Over Amount From Warehouse
  static async #updateWarehouseItemLeftOver(warehouse_id, provide_amount){
    const res = sequelize.query(WarehouseQueries.updateWarehouseLeftOverAmount(warehouse_id, provide_amount));
  }

  // Create Provide Model
  static async #createProvideModel (userId, data){
    const res = await ProvidedModel.create({
      warehouseId: data.warehouse_id,
      userId: userId,
      typeId: data.type,
      departmentId: data.provide_department,
      provided_amount: data.provide_amount,
      deliver_to: data.provide_user,
      card_number: data.provide_user_card_number,
    });
    return res;
  }


}

// Fetch Departments
class WarehouseServiceFetchDepartments {
  static async fetchDepartments(){
    const res = await sequelize.query(WarehouseQueries.fetch_departments);
    return res[0];
  }

}

// Fetch Departments
class WarehouseServiceFetchWarehouseDeliveryTypes {
  static async fetchWarehouseDeliveryTypes(){
    const res = await sequelize.query(WarehouseQueries.fetch_warehouse_delivery_types);
    return res[0];
  }
  
}

module.exports = {
  WarehouseServiceFetchProcessingSMS,
  WarehouseServiceAcceptSMS,
  WarehouseServiceFetchReceivedSMS,
  WarehouseServiceProvideSM,
  WarehouseServiceFetchDepartments,
  WarehouseServiceFetchWarehouseDeliveryTypes
};
