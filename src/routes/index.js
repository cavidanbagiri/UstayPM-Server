const HomeRouter = require("./route.home");
const AdminRouter = require("./route.admin");
const UserRouter = require("./route.user");
const STFRouter = require("./route.stf");
const ProcurementRouter = require('./route.procurement');
const WarehouseRouter = require('./route.warehouse');
const CommonRouter = require('./route.common');
const ProvideRouter = require('./route.provide');

module.exports = {
  HomeRouter,
  AdminRouter,
  UserRouter,
  STFRouter,
  ProcurementRouter,
  WarehouseRouter,
  CommonRouter,
  ProvideRouter
};
