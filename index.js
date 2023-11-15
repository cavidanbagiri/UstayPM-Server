
// Import Express
const express = require('express');
const app = express();

// Use .env variables
require('dotenv').config();

// Activate Database Connection
// require('./src/configs/database');
const { sequelize } = require('./models');
const main = async ()=>{
  await sequelize.authenticate()
  // await sequelize.sync({force: false})
}
main();

// Import cookieParser for using Frontend sending
const cookieParser = require('cookie-parser');

// Import ErrorHandler
const errorHandler = require('./src/middleware/errorHandler');

// Import Routers
const { HomeRouter, AdminRouter, UserRouter, STFRouter, ProcurementRouter,WarehouseRouter, CommonRouter, ProvideRouter } = require('./src/routes');

// Create Cors For Using Frontend
const cors = require('cors');

// Use User Sending values
app.use(express.json());

// Using Cors Policy
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173','https://ustaypm-client.onrender.com']
  }),
);

// Use Routers
app.use('/index', HomeRouter);
app.use('/admin', AdminRouter);
app.use('/user', UserRouter);
app.use('/stf', STFRouter);
app.use('/procurement', ProcurementRouter);
app.use('/warehouse', WarehouseRouter);
app.use('/provides', ProvideRouter);
app.use('/common', CommonRouter);

// Handle Error
app.use(errorHandler);

// Listen Server
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running in ${process.env.PORT} port`);
})

// Create Socket
const io = require("socket.io")(server,{
  cors:{
    credentials: true,
    origin: ['http://localhost:5173','https://ustaypm-client.onrender.com']
  }
})

// Create Socket Connection
io.on('connection', (socket)=>{
  console.log(`Connection Created By Socket ${socket.id}`);

  socket.on('first',(data)=>{
    // console.log('data is : ', data);
    // socket.broadcast.emit("returnfirst", 'I accept Your Message From Server and am realtime');
    socket.emit('returnfirst',{name:"cavidan"})
  })

})