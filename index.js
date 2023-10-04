
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
const { HomeRouter, AdminRouter, UserRouter, STFRouter, ProcurementRouter } = require('./src/routes');

// Create Cors For Using Frontend
const cors = require('cors');

// Use User Sending values
app.use(express.json());

// Using Cors Policy
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);

// Use Routers
app.use('/api/index', HomeRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/user', UserRouter);
app.use('/api/stf', STFRouter);
app.use('/api/procurement', ProcurementRouter);


// Handle Error
app.use(errorHandler);

// Listen Server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running in ${process.env.PORT} port`);
})