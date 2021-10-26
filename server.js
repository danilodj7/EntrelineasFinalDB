//hacer el import de express
//const express = require('express');
//hacer el import de express de una nueva forma
import  Express  from "express";
import Cors from 'cors';
import dotenv from 'dotenv'
import { conectarBd,getDB } from "./db/db.js";
//importar mongodb

import rutasUsuarios from "./views/usuarios/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";
import rutasProductos from "./views/productos/rutas.js";

import jwt from 'express-jwt'
import jwks from 'jwks-rsa'
import autorizacionEstadoUsuario from "./middleware/autorizacionEstadoUsuario.js";


dotenv.config({path:'./.env'})

const port = process.env.PORT || 5000;
// app se agrega todo eje rutas 
const app = Express();
app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://ventas-productoscar.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-autenticacion-productos-carros',
issuer: 'https://ventas-productoscar.us.auth0.com/',
algorithms: ['RS256']
});

// paso 4 y 5  enviarle el token a auth0 para que devuelva si es valido o no 
app.use(jwtCheck )
app.use(autorizacionEstadoUsuario)
app.use(rutasUsuarios)
app.use(rutasVentas)
app.use(rutasProductos)
  


const main = ()=>{
     //escucha solicitudes con .list, se pone el puerto 5000 porque react tiene el puerto 3000
    return app.listen(port, () => { 
        console.log(`Escuchando el pueto ${port}`);
      });
    
}

conectarBd(main());