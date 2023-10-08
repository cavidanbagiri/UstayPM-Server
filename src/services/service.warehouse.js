
const { sequelize } = require('../../models');

const ProcurementQueries = require('../queries/procurement.queries')

// Fetch processing SMS
class WarehouseServiceFetchProcessingSMS {
  static async fetchProcessingSMS(){
    const result = await sequelize.query(ProcurementQueries.select_all_sm_query)
    return result[0];
  }
}

class WarehouseServiceAcceptSMS {

  static async acceptSMS(data){

  }

}


module.exports = {
  WarehouseServiceFetchProcessingSMS,
  WarehouseServiceAcceptSMS,
}