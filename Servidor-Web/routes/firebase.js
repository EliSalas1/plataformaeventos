const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connection } = require("../config/config.db");
dotenv.config();

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue } = require("firebase/database");

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBUYkeZ7jp1KXLuWKqqqxcJEuCQS4g9wnU",
    authDomain: "arquitectura-8d40d.firebaseapp.com",
    databaseURL: "https://arquitectura-8d40d-default-rtdb.firebaseio.com",
    projectId: "arquitectura-8d40d",
    storageBucket: "arquitectura-8d40d.appspot.com",
    messagingSenderId: "840870793121",
    appId: "1:840870793121:web:95299fb6188fcea3ed05e0"
};

// Inicializar la aplicación de Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// Función para guardar datos de Firebase en MySQL
function guardarDatosEnMySQL(datos) {
    const query = `
        INSERT INTO datos (id, count, end_date, last_increment_source, manual_increment)
        VALUES ?
        ON DUPLICATE KEY UPDATE
        count = VALUES(count),
        end_date = VALUES(end_date),
        last_increment_source = VALUES(last_increment_source),
        manual_increment = VALUES(manual_increment)
    `;

    const valores = Object.keys(datos).map(key => {
        if (!datos[key].endDate) {
            console.error(`Error: El campo "endDate" es obligatorio para el evento con ID: ${key}`);
            return null; // Ignorar registros sin fecha
        }

        return [
            key,
            datos[key].count || 0,
            datos[key].endDate, 
            datos[key].lastIncrementSource || null,
            datos[key].manualIncrement ? 1 : 0
        ];
    }).filter(item => item !== null); // Filtrar los registros inválidos

    if (valores.length > 0) {
        connection.query(query, [valores], (err, result) => {
            if (err) {
                console.error('Error al insertar datos en MySQL:', err);
                return;
            }
            console.log('Datos insertados/actualizados:', result.affectedRows);
        });
    }
}

// Sincronización en tiempo real desde Firebase a MySQL
const dbRef = ref(database, '/');
onValue(dbRef, (snapshot) => {
    const datos = snapshot.val();
    if (datos) {
        guardarDatosEnMySQL(datos);
    }
});

// Ruta para verificar si el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

module.exports = app;
