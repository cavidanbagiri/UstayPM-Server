
// Import Express
const express = require('express');
const app = express();

// Use .env variables
require('dotenv').config();

// Import Socket Functions
const {CommonServiceNewSTFNotification} = require("./src/services/service.common");

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


const { initializeSocket, getSocketInstance } = require('./src/utils/io');

initializeSocket(server);


// Create Socket Connection
const io = getSocketInstance();

// Socket Option
io.on('connection', (socket)=>{

  console.log('socket id ',socket.id);

  /*
    Name setup connection coming from client and
    Create socket with user id
  */
  socket.on('setup', (userData)=>{
    socket.join(userData.id);
    socket.data.user_id = userData.id;
    // console.log('user data by socket is : ', socket);
    // console.log('user data by socket is dat : ', socket.data);
    console.log('rooms : ', socket.rooms);
  })

  socket.on("newstfnotification", async ()=>{
    console.log('-> ',socket.data.user_id);
    // await CommonServiceNewSTFNotification.getNewSTFNotification(socket.data.user_id)
    // console.log('news emit : ',userData);
    await CommonServiceNewSTFNotification.getNewSTFNotification(socket.data.user_id);
    // socket.emit("newstfnotification",)
  })  

})