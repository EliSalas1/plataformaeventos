const express = require("express");
const app = express();
const dotenv = require ("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");

// Configuración del cliente de Google
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//-------------------------GET---------------------------------
const{connection}= require ("../config/config.db");
const getUsuario= (request, responde) =>{
    connection.query("Select al.*, cr.tipo_rol FROM usuarios al LEFT JOIN  roles cr ON al.cargo_usua = cr.id_rol",
    (error, results) => {
        if (error)
        throw error;
    responde.status(200).json(results);
    });
} 
app.route("/usuarios").get(getUsuario);
module.exports = app;
//-------------------------GET-ID-------------------------------

const getUsuarioId= (request, response) =>{
    const id = request.params.id;
    console.log('Imprimiendo id usuarios')
   console.log(id)
    connection.query("Select al.*, cr.tipo_rol FROM usuarios al LEFT JOIN  roles cr ON al.cargo_usua = cr.id_rol Where al.id_usuario = ?",
        [id],
        (error, results) => {
            if (error)
            {
                throw error;
            }
        response.status(200).json(results);
        });
} 
app.route("/usuarios/:id").get(getUsuarioId);
module.exports = app;

// -----------------------------------------------POST--Usuarios---------------------------------------------
const postUsuarios = (request, response)=>{
    const {action,id,nombre_usuario,correo,contraseña,cargo_usua,id_usuario} = request.body;
   if(action == "insert"){
   connection.query("INSERT INTO usuarios(`id_usuario`, `nombre_usuario`, `correo`, `contraseña`, `cargo_usua`) VALUES(NULL,?,?,?,?)",
   [nombre_usuario,correo,contraseña,cargo_usua],
//    nombre_usuario,correo,contraseña,id_rol
   (error,results)=>{
       if (error)
      throw error;
    response.status(201).json({"Item añadido correctamente":results.affectedRows});
    });
    }
   else{
         //console.log(action);return false;
        connection.query("UPDATE usuarios SET `nombre_usuario`=?, `correo`= ?, `contraseña`= ?, `cargo_usua`= ? WHERE id_usuario = "+id_usuario+"",
        [nombre_usuario,correo,contraseña,cargo_usua,id],
       (error,results)=>{
           if (error)
           throw error;
            response.status(201).json({"Item modificado correctamente":results.affectedRows});
        }); }
   
    };
    app.route("/usuarios").post(postUsuarios);
    
// -----------------------------------------------DELETE---------------------------------------------
const delUsuarios =(request, response) => {
    const id = request.params.id;
             //console.log(id); return false;
                 connection.query("DELETE FROM usuarios WHERE id_usuario=?",
       [id],
      (error, results)=>{
            if (error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
        });
    };
    app.route("/usuarios/:id").delete(delUsuarios);
    
// ----------------------------------------Ruta de login (verificación de usuario)-------------------------------------------
const loginUsuario = (request, response) => {
    const { email, password } = request.body;

    connection.query(
        "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?",
        [email, password],
        (error, results) => {
            if (error) throw error;

            if (results.length > 0) {
                // Usuario encontrado
                response.status(200).json({ success: true, user: results[0] });
            } else {
                // Credenciales incorrectas
                response.status(401).json({ success: false, message: "Credenciales incorrectas" });
            }
        }
    );
};

app.route("/login").post(loginUsuario);
module.exports = app;

