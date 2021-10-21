//hacer el import de express
//const express = require('express');
//hacer el import de express de una nueva forma
import  Express  from "express";
import Cors from 'cors';
import dotenv from 'dotenv'
import { conectarBd,getDB } from "./db/db.js";
//importar mongodb
import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasVentas from "./views/productos/rutas.js";



dotenv.config({path:'./.env'})

// app se agrega todo eje rutas 
const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(rutasUsuarios)
app.use(rutasVentas)
  


const main = ()=>{
     //escucha solicitudes con .list, se pone el puerto 5000 porque react tiene el puerto 3000
    return app.listen(process.env.PORT, () => { 
        console.log(`Escuchando el pueto ${process.env.PORT}`);
      });
    
}

conectarBd(main());