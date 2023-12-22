// Import Express
const express = require("express");
const app = express();

// Use .env variables
require("dotenv").config();

// Import Socket Functions
const {
  CommonServiceNewSTFNotification,
  CommonServiceFetchMessage,
  CommonServiceSendMessage,
  CommonServiceFetchMessagesUnreadCounting
} = require("./src/services/service.common");

// Activate Database Connection
// require('./src/configs/database');
const { sequelize } = require("./models");
const main = async () => {
  await sequelize.authenticate();
  // await sequelize.sync({force: false})
};
main();

// Import cookieParser for using Frontend sending
const cookieParser = require("cookie-parser");

// Import ErrorHandler
const errorHandler = require("./src/middleware/errorHandler");


// Import Routers
const {
  HomeRouter,
  AdminRouter,
  UserRouter,
  STFRouter,
  ProcurementRouter,
  WarehouseRouter,
  CommonRouter,
  ProvideRouter,
} = require("./src/routes");

// Create Cors For Using Frontend
const cors = require("cors");

// Use User Sending values
app.use(express.json());

// Using Cors Policy
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["https://www.ustaypm.site", "ustaypm.site", "http://localhost:5173", "https://ustaypm-client.onrender.com"],
  })
);

// Get Node Static files
app.use(express.static("./src/public"));

// Use Routers
app.use("/index", HomeRouter);
app.use("/admin", AdminRouter);
app.use("/user", UserRouter);
app.use("/stf", STFRouter);
app.use("/procurement", ProcurementRouter);
app.use("/warehouse", WarehouseRouter);
app.use("/provides", ProvideRouter);
app.use("/common", CommonRouter);

// Handle Error
app.use(errorHandler);

// Listen Server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running in ${process.env.PORT} port`);
});

// const server = app.listen(3000, () => {
//   console.log(`Server is running in ${process.env.PORT} port`);
// });

const { initializeSocket, getSocketInstance } = require("./src/utils/io");

initializeSocket(server);

// Create Socket Connection
const io = getSocketInstance();

// Socket Option
io.on("connection", (socket) => {
  /*
    Name setup connection coming from client and
    Create socket with user id
  */
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.data.user_id = userData.id;
    socket.emit("connected");
  });

  /*
    Socket Disconnect
    User WIll Leave From Socket
  */
//  socket.on("disconnect", )


  /*
    Fetch New STF Notifications and send to client side
  */
  socket.on("newstfnotification", async (userData) => {
    await CommonServiceNewSTFNotification.getNewSTFNotification(userData.id);
  });

  /*
    Socket room will be selected user id
  */
  socket.on("join_room", async (current, selected, roomId) => {
    socket.join(roomId);
  });

  /*
    When User Selected And Selected User Is Typing
  */
  socket.on("typing", (room_id) => {
    socket.in(room_id).emit("typing", room_id);
  });

  /*
    When User Send New Messages, This will show new message to sender
  */
  socket.on("new_messages", async (message_data) => {
    /*
    -----------This Fetching Operation and Emiting For Common Messages Notification and realtime chatting
    */
    const fetch_messages = await CommonServiceFetchMessage.fetchMessage(
      message_data.current_id,
      message_data.sender_id
    );
    await socket.in(message_data.room_id).emit("fetch_messages", fetch_messages); // -> notify to selected
  
    socket.broadcast.emit("broadcastmessage", fetch_messages);
    /*
    ----------- This Emitting Unread Messages Count
    */
    const fetch_messages_unread_counting = await CommonServiceFetchMessagesUnreadCounting.fetchMessagesUnreadCounting(fetch_messages[0].roomId, fetch_messages[fetch_messages.length-1].receiverId);
    socket.broadcast.emit("broadcastunreadcountingmessages", fetch_messages_unread_counting);
  
  
  });
});
