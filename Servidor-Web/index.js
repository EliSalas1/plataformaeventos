const express = require ("express");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = { //Lo puedo quitar
    origin: 'http://localhost:3000' // o el puerto que estés utilizando para React
  };
  app.use(cors(corsOptions));  //Lo puedo quitar
//cargamos el achivo de rutass
app.use(cors());

app.use(require('./routes/roles'));
app.use(require('./routes/firebase'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/eventos'));
//
app.use(require('./routes/tiposeventos'));
app.use(require('./routes/datafire'));

// app.use(requiere(express));

const port = process.env.port;
app.listen(port, ()=>{
    console.log('El servidor escucha en el puerto')+ port;

});
module.exports = app;