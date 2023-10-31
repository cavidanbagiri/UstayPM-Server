const HomeRouter = require("./route.home");
const AdminRouter = require("./route.admin");
const UserRouter = require("./route.user");
const STFRouter = require("./route.stf");
const ProcurementRouter = require('./route.procurement');
const WarehouseRouter = require('./route.warehouse');
const CommonController = require('./route.common');

module.exports = {
  HomeRouter,
  AdminRouter,
  UserRouter,
  STFRouter,
  ProcurementRouter,
  WarehouseRouter,
  CommonController
};
