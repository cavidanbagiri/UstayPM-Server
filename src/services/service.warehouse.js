
const { sequelize, WarehouseModel } = require('../../models');

const ProcurementQueries = require('../queries/procurement.queries')

// Fetch processing SMS
class WarehouseServiceFetchProcessingSMS {
  static async fetchProcessingSMS(){
    const result = await sequelize.query(ProcurementQueries.select_all_sm_query)
    return result[0];
  }
}

class WarehouseServiceAcceptSMS {

  // Accept SMS To Warehouse
  static async acceptSMS(data){

    for( let i =0 ; i < data.checked_values.length ; i ++){

      const res = await this.#createWarehouseModel( data, i );

    }     
    return "OK";
  }

  // Create Warehouse Model
  static async #createWarehouseModel(data, each){

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

    })

    return result;

  }

}


module.exports = {
  WarehouseServiceFetchProcessingSMS,
  WarehouseServiceAcceptSMS,
}