const express = require("express");
const app = express();
const dotenv = require ("dotenv");
dotenv.config();
//http://localhost:8888/rol

//-------------------------GET---------------------------------
const{connection}= require ("../config/config.db");
const getCargo= (request, responde) =>{
    connection.query("Select * from roles",
    (error, results) => {
        if (error)
        throw error;
    responde.status(200).json(results);
    });
} 
//RUTA CARGO
app.route("/rol").get(getCargo);
module.exports = app;
