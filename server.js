//hacer el import de express
//const express = require('express');

//hacer el import de express de una nueva forma
import  Express  from "express";

// app se agrega todo eje rutas 
const app = Express();

//el mensaje lo mustra el servidor en la terminal de visual studio code
app.get('/usuarios',(req,res)=>{
    console.log('alguien hizo get en la ruta /usuarios')
    res.send('usuarios no hay')
});

//escucha solicitudes con .list, se pone el puerto 5000 porque react tiene el puerto 3000
app.listen(5000,() => {
    console.log('Escuchando el pueto 5000')
});