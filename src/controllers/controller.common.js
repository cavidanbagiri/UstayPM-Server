const {
  CommonServiceFilterSTF,
  CommonServiceFilterSM,
  CommonServiceFilterWarehouse,
  CommonServiceFetchFields,
  CommonServiceFetchCompanies,
  CommonServiceFetchProcurementUsers,
  CommonServiceFetchCreatedSTFUsers,
  CommonServiceFetchDepartments,
  CommonServiceFetchSTFRowInform,
  CommonServiceFilterProvided,
  CommonServiceStatisticData,
  CommonServiceReadNotification,
  CommonServiceFetchAllUsers,
  CommonServiceSendMessage,
  CommonServiceFetchMessage,
  CommonServiceFetchUnreadMessages,
  CommonServiceFilteredVendorNames,
  CommonServiceFetchUnreadMessagesAndUsers
} = require("../services/service.common");
const tryCatch = require("../utils/trycatch");

class CommonController {
  // Fetch STF Filter Function
  static async filterSTF(req, res, next) {
    const query = req.query;
    tryCatch(
      await CommonServiceFilterSTF.filterSTF(query)
        .then((respond) => {
          return res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Filter STF Error : ", err);
          next(err);
        })
    );
  }

  // Filter STF Result
  static async filterSM(req, res, next) {
    const query = req.query;
    tryCatch(
      await CommonServiceFilterSM.filterSM(query)
        .then((respond) => {
          return res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Filter STF Error : ", err);
          next(err);
        })
    );
  }

  // Filter STF Result
  static async filterWarehouse(req, res, next) {
    const query = req.query;
    tryCatch(
      await CommonServiceFilterWarehouse.filterWarehouse(query)
      .then((respond)=>{
        return res.status(200).send(respond)
      })
      .catch((err)=>{
        console.log('Filter STF Error : ',err);
        next(err);
      })
    )
  }

  // Filter STF Result
  static async filterProvided(req, res, next) {
    const query = req.query;
    tryCatch(
      await CommonServiceFilterProvided.filterProvided(query)
      .then((respond)=>{
        return res.status(200).send(respond)
      })
      .catch((err)=>{
        console.log('Filter STF Error : ',err);
        next(err);
      })
    )
  }

  // Fetch Fields Name 
  static async fetchfields (req, res, next){
    const project_id = req.params.project_id;
    tryCatch(
      await CommonServiceFetchFields.fetchfields(project_id)
      .then((respond)=>{
        res.status(200).send(respond);
      })
      .catch((err)=>{
        console.log('Project Id Row Created Error : ',err);
        next(err)
      })
    )
  }

  // Fetch Companies
  static async fetchCompanies (req, res, next){
    tryCatch(
      await CommonServiceFetchCompanies.fetchCompanies()
        .then((respond) => {
          res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Fetch COmpanies Error From Procurement");
          next(err);
        })
    );
    return "OK";
  }

  // Fetch Procurement Users
  static async fetchProcurementUsers(req, res, next) {
    tryCatch(
      await CommonServiceFetchProcurementUsers.fetchProcurementUsers()
        .then((respond) => {
          res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Fetch Procurement Users Errors From Procurement");
          next(err);
        })
    );
    return "OK";
  }

  // Fetch Procurement Users
  static async fetchSTFCreateUsernames(req, res, next) {
    tryCatch(
      await CommonServiceFetchCreatedSTFUsers.fetchSTFCreateUsernames()
        .then((respond) => {
          res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Fetch Procurement Users Errors From Procurement");
          next(err);
        })
    );
    return "OK";
  }

  // Fetch Departments
  static async fetchDepartments(req, res, next) {
    tryCatch(
      await CommonServiceFetchDepartments.fetchDepartments()
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log("Fetch Departments Error : ", err);
          next(err);
        })
    );
  }

  // Fetch Row Inform By STF ID
  static async fetchSTFRowInform(req, res, next) {
    const stf_id = req.params.stf_id;
    tryCatch(
      await CommonServiceFetchSTFRowInform.fetchSTFRowInform(stf_id)
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log("Fetch Departments Error : ", err);
          next(err);
        })
    );

    return 'OK';
  }

  // Get Statistic Data
  static async getStatisticData (req, res, next) {
    const user_id = req.params.user_id;
    tryCatch(
      await CommonServiceStatisticData.getStatisticData(user_id)
      .then((respond) => {
        return res.send(respond);
      })
      .catch((err) => {
        console.log("Fetch Departments Error : ", err);
        next(err);
      })
    )
  }

  // Read Notification
  static async readNotification (req, res, next) {
    const user_id = req.params.user_id;
    tryCatch(
      await CommonServiceReadNotification.readNotification(user_id)
      .then((respond) => {
        return res.send(respond);
      })
      .catch((err) => {
        console.log("Read Notification Error : ", err);
        next(err);
      })
    )
  }

  // Send Message
  static async sendMessage (req, res, next) {
    tryCatch(
      await CommonServiceSendMessage.sendMessage(req.body)
      .then((respond) => {
        return res.send(respond);
      })
      .catch((err) => {
        console.log("Send Message Error : ", err);
        next(err);
      })
    )
    return 'OK'
  }

  // Fetch Message
  static async fetchMessage (req, res, next) {
    const current_id = req.params.current_id;
    const selected_id = req.query.selected_id;
    tryCatch(
      await CommonServiceFetchMessage.fetchMessage(current_id, selected_id)
      .then((respond) => {
        return res.send(respond);
      })
      .catch((err) => {
        console.log("Fetch Message Error : ", err);
        next(err);
      })
    )
  }

  static async fetchAllUsers (req, res, next) {
    tryCatch(
      await CommonServiceFetchAllUsers.fetchAllUsers()
      .then((respond) => {
        res.status(200).send(respond);
      })
      .catch((err) => {
        console.log("Fetch All Users Error in Common : ",err);
        next(err);
      })
    );
  }

  // Fetch Unread Messages
  static async fetchUnreadMessages(req, res, next) {
    const current_id = req.params.current_id;
    tryCatch(
      await CommonServiceFetchUnreadMessages.fetchUnreadMessages(current_id)
      .then((respond) => {
        return res.send(respond);
      })
      .catch((err) => {
        console.log("Fetch Unread Message Error : ", err);
        next(err);
      })
    )
  }

  // Fetch Unread Messages and All Users
  static async fetchUnreadMessagesAndUsers(req, res, next) {
    const current_id = req.params.current_id;
    tryCatch(
      await CommonServiceFetchUnreadMessagesAndUsers.fetchUnreadMessagesAndUsers(current_id)
      .then((respond) => {
        return res.send(respond);
      })
      .catch((err) => {
        console.log("Fetch Unread Messages and Users Error : ", err);
        next(err);
      })
    )
  }

  static async filterVendorName(req, res, next) {
    const selected_text = req.query.selected_text;
    tryCatch(
      await CommonServiceFilteredVendorNames.filterVendorName(selected_text)
      .then((respond) => {
        return res.send(respond);
      })
      .catch((err) => {
        console.log("Filtered Vendor Name Error : ", err);
        next(err);
      })    
    )
  }


}

module.exports = CommonController;
