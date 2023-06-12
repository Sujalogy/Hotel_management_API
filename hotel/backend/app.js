const express = require('express');
require("dotenv").config();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const { connection } = require("./database/db");
const { ownerRouter } = require('./routes/owner.routes');
const { hotelRouter } = require("./routes/hotel.routes");
const { auth } = require("./middleware/auth.middleware");

const app = express();

// middleware
app.use(express.json());

const options = {
    definition:{
         openapi:"3.0.0",
         info:{
            title:"Evaluation Sprint-4",
            version:"1.0.0"
         },
         server:[
            {
                url:"http://localhost:3000"
            }
         ]
    },
    apis:["./routes/*.js"]
}

//openAPI specs
const openAPIspec = swaggerJSDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(openAPIspec));
app.use("/owner", ownerRouter);
app.use(auth);
app.use("/hotel", hotelRouter);

// server and database-
const port = process.env.PORT;
app.listen(port, async () => {
    try {
        console.log("server is running at respective port...")
        await connection;
        console.log("Database connected successfully...")            
    } catch (error) {
        console.log("database not connected..")
    }
})