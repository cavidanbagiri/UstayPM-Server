const { Server } = require('socket.io');

// Create Socket Variable For Returning Globally
let io = null;

// Create Socket Connection
const initializeSocket = (server) => {
  io = new Server(server, {
    cors:{
      credentials: true,
      origin: ["https://www.ustaypm.site", "ustaypm.site", "http://localhost:5173", "http://localhost:4173", "https://ustaypm-client.onrender.com"]
    }
  });
};

// Return Socket 
const getSocketInstance = () => {
  return io;
}

module.exports = {

  initializeSocket,
  getSocketInstance,

}