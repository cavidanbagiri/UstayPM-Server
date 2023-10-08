
const { sequelize, WarehouseModel, SMModel } = require('../../models');

const ProcurementQueries = require('../queries/procurement.queries')
const WarehouseQueries = require('../queries/warehouse.queries');

// Fetch processing SMS
class WarehouseServiceFetchProcessingSMS {
  static async fetchProcessingSMS(){
    const result = await sequelize.query(ProcurementQueries.select_all_sm_query)
    return result[0];
  }
}

// Accept SM
class WarehouseServiceAcceptSMS {

  // Accept SMS To Warehouse
  static async acceptSMS(data){

    for( let i =0 ; i < data.checked_values.length ; i ++){

      const res = await this.#createWarehouseModel( data, i );

    }     
    return "OK";
  }

  // Create Warehouse Model
  static async #createWarehouseModel(data, each) {
    const result = await WarehouseModel.create({
      delivery_material_name: data.checked_values[each].sm_material_name,
      delivery_material_amount : data.table_data[each].entering_delivery_amount,
      delivery_material_unit : data.table_data[each].delivery_unit,
      delivery_material_price : data.checked_values[each].price,
      delivery_material_total : data.checked_values[each].total,
      delivery_material_currency : data.checked_values[each].currency,
      doc_number : data.sms_data.doc_number, 
      doc_date : data.sms_data.doc_date, 
      certificate : data.table_data[each].certificate,
      passport : data.table_data[each].passport,
      acceptedBy : data.user.id,
      smId: data.checked_values[each].sm_id
    }).then(async (respond)=>{
      await this.#withdrowSMAmount(data, each);
    })
    return result;
  }

  // Withdrow From SMS LeftOver
  static async #withdrowSMAmount (data, each) {
    console.log('withdrow work-----------------------');
    // Get Current SM Amount
    const entering_amount = Number(data.table_data[each].entering_delivery_amount)

    // Find SM with id
    const result = await this.#findSMById( data.checked_values[each].sm_id )
    .then(async (respond)=>{
      console.log('sec -------------------------', respond);
      const sm_amount = Number(respond.dataValues.sm_material_amount);
      console.log('Entering Amount ',entering_amount, typeof entering_amount, ' sm : ', sm_amount, typeof sm_amount);
      // If Entering Amount Greater Than SM AMount
      if(entering_amount > sm_amount){

        // Find Max Accepting Value
        const max_accepting_amount = sm_amount + (sm_amount * 0,1);
        // If Greater Than Max Accepting Value Return Error
        if( entering_amount > max_accepting_amount ){
          console.log('here also------------------------------');
          throw new Error(`Wrong Operation, Amount Cant Be Greater Than ${max_accepting_amount}`);
        }
        else{
          await this.#updateSMLeftOverAmount(data.checked_values[each].sm_id, entering_amount);   
        }
      }
      // If Not
      else{
        console.log('work----------------------');
        await this.#updateSMLeftOverAmount(data.checked_values[each].sm_id, entering_amount);
      }
    }).catch((err)=>{
      console.log('error is : ', err);
    })

  }

  // Find sm row with id
  static async #findSMById(sm_id) {
    const result = await SMModel.findOne({
      where:{
        id : sm_id
      }
    });
    return result;
  }

  // Update SM Left Over Amount
  static async #updateSMLeftOverAmount(sm_id, entering_amount) {
    const string_query = `
      UPDATE sm_models set left_over = left_over - ${entering_amount} where id = ${sm_id}; 
    `
    const result = await sequelize.query(string_query);

    return result;
  }

}

class WarehouseServiceFetchReceivedSMS {

  // Fetch Received SM From Warehouse
  static async fetchSMFromWarehouse (){

    const result = await sequelize.query(WarehouseQueries.received_sms_from_warehouse_query);
    // console.log('rec result is ', result[0]);
    return result[0];

  }

} 

module.exports = {
  WarehouseServiceFetchProcessingSMS,
  WarehouseServiceAcceptSMS,
  WarehouseServiceFetchReceivedSMS
}