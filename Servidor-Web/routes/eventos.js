const express = require("express");
const app = express();
const dotenv = require ("dotenv");
dotenv.config();

//-------------------------GET---------------------------------
const{connection}= require ("../config/config.db");
const getEvento = (request, response) => {
    const query = `
        SELECT \
            ev.id_evento, \
            ev.nombre_evento,\
            ev.fechahora_inicio,\
            ev.tipo_evento,\
            te.tipo_evento AS nombre_tipo_evento, \
            ev.nombre_ponente, \
            ev.lugar,\
            ev.tipo_carrera,\
            ev.nombre_organizador,\
            ev.cargo_organizador,\
            ev.comentarios,\
            ev.fechahora_fin,\
            ev.tipo_dato,\

            d.count AS datos_count,\
            d.end_date AS datos_end_date\
        FROM \
            datosevento ev \
        INNER JOIN 
            tiposeventos te 
        ON 
            ev.tipo_evento = te.id \
        INNER JOIN 
            datos d 
        ON 
            ev.tipo_dato = d.id \
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error al obtener los eventos:", error);
            response.status(500).json({ error: "Error al obtener los eventos" });
            return;
        }
        response.status(200).json(results); // Devuelve los resultados en formato JSON
    });
};
app.route("/eventos").get(getEvento);
module.exports = app;
//-------------------------GET-ID-------------------------------
const getEventoId = (request, response) => {
    const id = request.params.id;
    console.log('Imprimiendo id eventos');
    console.log(id);
    
    connection.query(
        "SELECT \
            ev.id_evento, \
            ev.nombre_evento, \
            ev.fechahora_inicio, \
            ev.tipo_evento, \
            te.tipo_evento AS nombre_tipo_evento, \
            ev.nombre_ponente, \
            ev.lugar, \
            ev.tipo_carrera, \
            ev.nombre_organizador, \
            ev.cargo_organizador, \
            ev.comentarios, \
            ev.fechahora_fin, \
            ev.tipo_dato, \
            d.count AS datos_count, \
            d.end_date AS datos_end_date \
        FROM \
            datosevento ev \
        INNER JOIN tiposeventos te ON ev.tipo_evento = te.id \
        INNER JOIN datos d ON ev.tipo_dato = d.id \
        WHERE ev.id_evento = ?",
        [id],
        (error, results) => {
            if (error) {
                console.error('Error en la consulta:', error);
                response.status(500).json({ error: 'Error en el servidor' });
                return;
            }
            response.status(200).json(results);
        }
    );
};

app.route("/eventos/:id").get(getEventoId);
module.exports = app;

// -----------------------------------------------POST------------------------------------------------
const postEventos = (request, response)=>{
    const {action,id, nombre_evento, fechahora_inicio, tipo_evento, nombre_ponente, lugar, tipo_carrera, nombre_organizador, cargo_organizador, comentarios, fechahora_fin, tipo_dato, id_evento} = request.body;
   if(action === "insert"){
   connection.query("INSERT INTO datosevento (`nombre_evento`, `fechahora_inicio`, `tipo_evento`, `nombre_ponente`, `lugar`, `tipo_carrera`, `nombre_organizador`, `cargo_organizador`, `comentarios`, `fechahora_fin`, `tipo_dato`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
   [nombre_evento, fechahora_inicio, tipo_evento, nombre_ponente, lugar, tipo_carrera, nombre_organizador, cargo_organizador, comentarios, fechahora_fin, tipo_dato],
   (error,results)=>{
       if (error)
      throw error;
    response.status(201).json({"Item añadidoo correctamente":results.affectedRows});
    });
    }
   else{
        connection.query("UPDATE datosevento SET nombre_evento = ?, fechahora_inicio = ?, tipo_evento = ?, nombre_ponente = ?, lugar= ?, tipo_carrera= ?, nombre_organizador= ?, cargo_organizador= ?, comentarios= ?, fechahora_fin= ?, tipo_dato= ? WHERE id_evento = "+id_evento+"",
        [nombre_evento, fechahora_inicio, tipo_evento, nombre_ponente, lugar, tipo_carrera, nombre_organizador, cargo_organizador, comentarios, fechahora_fin, tipo_dato,id],
       (error,results)=>{
           if (error)
           throw error;
            response.status(201).json({"Item editado correctamente":results.affectedRows});
        }); }
    
    };
    app.route("/eventos").post(postEventos);

// -----------------------------------------------DELETE---------------------------------------------
const delEventos =(request, response) => {
    const id = request.params.id;
                 connection.query("DELETE FROM datosevento WHERE id_evento=?",
       [id],
      (error, results)=>{
            if (error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
        });
    };
    app.route("/eventos/:id").delete(delEventos);