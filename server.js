//hacer el import de express
//const express = require('express');

//hacer el import de express de una nueva forma
import  Express  from "express";

// app se agrega todo eje rutas 
const app = Express();
app.use(Express.json());

//el mensaje lo mustra el servidor en la terminal de visual studio code USAR GET
app.get('/usuarios',(req,res)=>{
    console.log('alguien hizo get en la ruta /usuarios')
    const usuarios =[
        {codigo:'12312' ,nombre:'Pepe', apellido:'almeja',email:'pepe@pepe.com',cedula:'123123',telefono:'13123312'},
        {codigo:'12312' ,nombre:'Pepe', apellido:'almeja',email:'pepe@pepe.com',cedula:'123123',telefono:'13123312'},
        {codigo:'12312' ,nombre:'Pepe', apellido:'almeja',email:'pepe@pepe.com',cedula:'123123',telefono:'13123312'}
    ]
    res.send(usuarios)
});

// post create usuario del crud, req solicita de front al procesamiento del backend,  
//res es el  backend devolviendo la respuesta
app.post('/usuarios/nuevo',(req,res)=>{
   const datosUsuarios=req.body;
    console.log("llaves",Object.keys(datosUsuarios));
    try {
        if (Object.keys(datosUsuarios).includes('code')
    ) {
        //implementeatr codigo para devolver respuesta ok usuario en el procesamiento del backend al front
        res.sendStatus(200)

    }
    } catch {
        // error 500 no encontro la ruta 
        res.sendStatus(500)
    }
    
  
   //traer de imnsonia los datos en el console.log
    console.log("usuario a crear",req.body);
    

})


//escucha solicitudes con .list, se pone el puerto 5000 porque react tiene el puerto 3000
app.listen(5000,() => {
    console.log('Escuchando el pueto 5000')
});