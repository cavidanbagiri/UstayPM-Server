
// Import Express
const express = require('express');
const app = express();

// Use .env variables
require('dotenv').config();

// Activate Database Connection
require('./src/configs/database');

// Import cookieParser for using Frontend sending
const cookieParser = require('cookie-parser');


// Import Routers
const { HomeRouter } = require('./src/routes');

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
app.use('/api/index',HomeRouter);



// Listen Server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running in ${process.env.PORT} port`);
})