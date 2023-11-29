
// Import Express
const express = require('express');
const app = express();

// Use .env variables
require('dotenv').config();

// Import Socket Functions
const {CommonServiceNewSTFNotification, CommonServiceFetchMessage, CommonServiceSendMessage} = require("./src/services/service.common");

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

  /*
    Name setup connection coming from client and
    Create socket with user id
  */
  socket.on('setup', (userData)=>{
    socket.join(userData.id);
    console.log('setup room ', socket.rooms);
    socket.data.user_id = userData.id;
  })

  /*
    Fetch New STF Notifications and send to client side
  */
  socket.on("newstfnotification", async ()=>{
    await CommonServiceNewSTFNotification.getNewSTFNotification(socket.data.user_id);  
  })  

  /*
    Socket room will be selected user id
  */
  socket.on('join_room', async(current, selected) => {
    const fetch_messages = await CommonServiceFetchMessage.fetchMessage(current, selected);
    socket.join('cavidan');
    socket.emit('fetch_messages', fetch_messages);
  })

  /*
    Send Message 
  */
  socket.on('send_message', async(message_data)=>{
    console.log('socket send messade data room id : ', message_data.roomid);
    // console.log('message data room id : ', message_data.room1);
    // console.log('message data room id : ', message_data.room2);
    await CommonServiceSendMessage.sendMessage(message_data);
    const fetch_messages = await CommonServiceFetchMessage.fetchMessage(socket.data.user_id, message_data.sender_id);
    // await socket.to(message_data.room1).emit('fetch_messages', fetch_messages); // -> notify to selected
    // await socket.to(message_data.room2).emit('fetch_messages', fetch_messages); // -> notify to selected
    socket.to('cavidan').emit('fetch_messages', fetch_messages);
    // await socket.to(message_data.current_id).emit('fetch_messages', fetch_messages); // -> notify to selected
    // await socket.emit('fetch_messages', fetch_messages); // -> notify to selected
    // await socket.emit('fetch_messages', fetch_messages); // -> notify to own
  
  })

  /*
    Fetch Chats
  */
//  socket.on("sendmessage", async () => {
//   console.log('send message emit work ');
  // await CommonServiceFetchMessage.fetchMessage()
//  })

})