const {
  sequelize,
  WarehouseModel,
  SMModel,
  ProvidedModel,
  ConditionModel,
} = require("../../models");
const EmptyFieldError = require("../exceptions/EmptyFieldError");

const WarehouseQueries = require("../queries/warehouse.queries");
const WhereQuery = require("../utils/whereQuery");

const {getSocketInstance} = require('../utils/io');

// Accept SM
class WarehouseServiceAcceptSMS {

  // Check Entering Warehouse Data
  static async #checkBeforeForComingData(data){
    // console.log('data : ', data);
    // First Check 
    // for (let i = 0; i < data.checked_values.length; i++) {
    //   let max_entering_value = data.checked_values[i].left_over + (data.checked_values[i].left_over * 0.1) ;
    //   if(data.table_data[i].entering_delivery_amount > max_entering_value ){
    //     throw new EmptyFieldError(`${i} Index, Error Happen, Entering Value Greater Than Left Over Value`, 400);
    //   }
    // }

    for(let i = 0 ; i < data.checked_values.length; i++){
      // Find Material With Id;
      const result = await SMModel.findByPk(data.checked_values[i].sm_id);
      const left_over_amount = result.dataValues.left_over;
      // Count First Max Can Entering Value
      let max_entering_value = left_over_amount + (left_over_amount * 0.1);
      // Compare entering value and finding material left over amount
      if(data.table_data[i].entering_delivery_amount > max_entering_value){
          throw new EmptyFieldError(`${i} Index, Error Happen, Entering ${data.table_data[i].entering_delivery_amount} Greater Than ${left_over_amount} Left Over Value and you can enter max ${max_entering_value}`, 400);
      }
    }
  }

  // Accept SMS To Warehouse
  static async acceptSMS(data) {

    try {
      await this.#checkBeforeForComingData(data);
    } catch (err) {
      throw new Error(err)
    }

    for (let i = 0; i < data.checked_values.length; i++) {
      const res = await this.#withdrowSMAmount(data, i);
    }

    console.log('data is : ', data);
    // Step 3 Emit that function
    const emit_socket_inform = {
      sm_num: data.checked_values[0].sm_num,
      orderer_id: data.checked_values[0].orderer_id,
      orderer_name: data.checked_values[0].orderer,
    }
    console.log('emit data : ', emit_socket_inform);
    const io = getSocketInstance();
    // CommonServiceNewSTFNotification.getNewSTFNotification(0);
    console.log('socket emit is worked');
    io.emit('accept_sms', emit_socket_inform);
    return "OK";
    
  }

  // Withdrow From SMS LeftOver
  static async #withdrowSMAmount(data, each) {
    /*
      ******************* Step 1 - Take Entering Amount 
    */
    // Get Current SM Amount
    const entering_amount = Number(
      data.table_data[each].entering_delivery_amount
    );
    let max_accepting_amount = 0;
    /*
      ******************* Step 2 - Find Same Material With sm id 
    */
    // Find SM with id
    const result = await this.#findSMById(data.checked_values[each].sm_id)
      .then(async (respond) => {
        if (respond) {
          /*
            ******************* Step 3 - Take Left Over Values 
          */
          const sm_amount = Number(respond?.dataValues?.left_over);
          /*
            ******************* Step 4 - Compare Left Over Values 1 - If Entering amount greater than sm material left over value
          */
          // If Entering Amount Greater Than SM AMount
          if (entering_amount > sm_amount) {
            // Find Max Accepting Value
            /*
              ******************* Step 4.1 - Find Max Values for left over value
            */
            max_accepting_amount = sm_amount + (sm_amount * 0, 1);
            // If Greater Than Max Accepting Value Return Error
            if (entering_amount > max_accepting_amount) {
              throw new Error(
                `Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`
              );
            } else {
              await this.#updateSMLeftOverAmount(
                data.checked_values[each].sm_id,
                entering_amount
              )
                .then(async (respond) => {
                  await this.#createWarehouseModel(data, each)
                    .then(async(respond) => {
                      await this.#changeSMSituation(data, each)
                      .then((respond) => {})
                      .catch((err) => {
                        console.log(
                          "Error in Change Condition Situation : ",
                          err
                        );
                        throw new Error(
                          `Error in Change Condition Situation : ${err}`
                        );
                      });
                    })
                    .catch((err) => {
                      throw new Error(
                        `Wrong Operation, Accepting SM Cant execute and err :  ${err}`
                      );
                    });
                })
                .catch((err) => {
                  throw new Error(`Wrong Operation, Error is : ${err} `);
                });
            }
          }
          else if (entering_amount === sm_amount){
            await this.#updateSMLeftOverAmount(
              data.checked_values[each].sm_id,
              entering_amount
            )
              .then(async (respond) => {
                await this.#createWarehouseModel(data, each)
                  .then(async (respond) => {
                    await this.#changeSMSituation(data, each)
                      .then((respond) => {})
                      .catch((err) => {
                        console.log(
                          "Error in Change Condition Situation : ",
                          err
                        );
                        throw new Error(
                          `Error in Change Condition Situation : ${err}`
                        );
                      });
                  })
                  .catch((err) => {
                    console.log("first : ", err);
                    throw new Error(
                      `Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`
                    );
                  });
              })
              .catch((err) => {
                console.log("second ", err);
                throw new Error(
                  `Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`
                );
              });
          }
          // If Not
          else {
            await this.#updateSMLeftOverAmount(
              data.checked_values[each].sm_id,
              entering_amount
            )
              .then(async (respond) => {
                await this.#createWarehouseModel(data, each)
                  .then(async (respond) => {})
                  .catch((err) => {
                    console.log("first : ", err);
                    throw new Error(
                      `Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`
                    );
                  });
              })
              .catch((err) => {
                console.log("second ", err);
                throw new Error(
                  `Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`
                );
              });  
          }

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

  // Create Warehouse Model
  static async #createWarehouseModel(data, each) {
    const result = await WarehouseModel.create({
      delivery_material_name: data.checked_values[each].sm_material_name,
      delivery_material_amount: data.table_data[each].entering_delivery_amount,
      stock: data.table_data[each].entering_delivery_amount,
      delivery_material_unit: data.table_data[each].delivery_unit,
      delivery_material_price: data.checked_values[each].price,
      delivery_material_total: data.checked_values[each].total,
      delivery_material_currency: data.checked_values[each].currency,
      doc_number: data.sms_data.doc_number,
      doc_date: data.sms_data.doc_date,
      providing_date: data.sms_data.providing_date,
      certificate: data.table_data[each].certificate,
      passport: data.table_data[each].passport,
      acceptedBy: data.user.id,
      smId: data.checked_values[each].sm_id,
    });
    return result;
  }

  // If SM Left Over Amount is equals 0 or less than 0, condition will change and will be complete
  static async #changeSMSituation(data, each) {
    const result = await ConditionModel.update(
      { situationId: 2 },
      {
        where: {
          smId: data.checked_values[each].sm_id,
        },
      }
    );
  }
}

// Fetch Received Warehouse
class WarehouseServiceFetchWarehouseData {
  // Fetch Received SM From Warehouse
  static async fetchWarehouseData() {
    const result = await sequelize.query(
      WarehouseQueries.received_sms_from_warehouse_query
    );
    return result[0];
  }
}

// Provide Sm From Warehouse To Area
class WarehouseServiceProvideSM {
  static async #checkStock(data) {
    let rows = 0;
    for(let i of data.data){
      rows++;
      const res = await this.#findWarehouseItemById(i.warehouse_id);
      if(res){
        if(res.stock - i.provide_amount < 0){
          throw new Error(`${rows} Row Stock Is Not Enough`)
        }
      }
    }

    return 'OK';
  }
  // Provide Material
  static async provideMaterial(data) {

    try{
      await this.#checkStock(data);
    }
    catch(err){
      throw new Error(err);
    }

    for (let i of data.data) {
      // Find Selectinf row from warehouse models
      const each = await this.#findWarehouseItemById(i.warehouse_id);
      if (each) {
        // Check withdrow if possible
        const res = await this.checkWithdrow(data.user, each, i)
          .then((respond) => {
            // return respond;
          })
          .catch((err) => {
            return new Error(err);
          });
      }
    }
  }

  // Find Warehouse Data With Id
  static async #findWarehouseItemById(warehouse_id) {
    const res = await WarehouseModel.findOne({
      where: {
        id: warehouse_id,
      },
    });
    if (res) {
      return res?.dataValues;
    } else {
      return null;
    }
  }

  // Check If Withdrow if possible
  static async checkWithdrow(user_id, warehouse_item, data) {
    // If Withdrow Amount less than possible leftoveramount
    if (warehouse_item.stock - data.provide_amount >= 0) {
      const res = await this.#updateWarehouseItemLeftOver(
        warehouse_item.id,
        data.provide_amount
      )
        .then(async (respond) => {
          return this.#createProvideModel(user_id, data);
        })
        .catch((err) => {
          console.log("err ", err);
          return new Error("Check Withdrow Error : ", err);
        });
      return res;
    }
    // If Not
    else {
      return null;
    }
  }

  // Update Left Over Amount From Warehouse
  static async #updateWarehouseItemLeftOver(warehouse_id, provide_amount) {
    const res = sequelize.query(
      WarehouseQueries.updateWarehouseLeftOverAmount(
        warehouse_id,
        provide_amount
      )
    );
  }

  // Create Provide Model
  static async #createProvideModel(userId, data) {
    const res = await ProvidedModel.create({
      warehouseId: data.warehouse_id,
      userId: userId,
      typeId: data.type,
      departmentId: data.provide_department,
      provided_amount: data.provide_amount,
      deliver_to: data.provide_user,
      card_number: data.provide_user_card_number,
      serial_no: data.serial_no,
      unique_id: data.unique_id
    });
    return res;
  }
}

// Fetch Departments
class WarehouseServiceFetchDepartments {
  static async fetchDepartments() {
    const res = await sequelize.query(WarehouseQueries.fetch_departments);
    return res[0];
  }
}

// Fetch Departments
class WarehouseServiceFetchWarehouseDeliveryTypes {
  static async fetchWarehouseDeliveryTypes() {
    const res = await sequelize.query(
      WarehouseQueries.fetch_warehouse_delivery_types
    );
    return res[0];
  }
}

module.exports = {
  WarehouseServiceAcceptSMS,
  WarehouseServiceFetchWarehouseData,
  WarehouseServiceProvideSM,
  WarehouseServiceFetchDepartments,
  WarehouseServiceFetchWarehouseDeliveryTypes,
};
