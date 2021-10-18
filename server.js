//hacer el import de express
//const express = require('express');

//hacer el import de express de una nueva forma
import  Express  from "express";

//importar mongodb
import { MongoClient } from "mongodb";



const stringConexion=
'mongodb+srv://danilodj:500pesos2019.@proyectoproductoscar.sjr7k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


const client = new MongoClient(stringConexion,{

        useNewUrlParser:true,
        useUnifiedTopology:true,
});

let conexion;

// app se agrega todo eje rutas 
const app = Express();
app.use(Express.json());

//el mensaje lo mustra el servidor en la terminal de visual studio code USAR GET
app.get('/usuarios',(req,res)=>{
    console.log('alguien hizo get en la ruta /usuarios')
        conexion
        .collection('usuarios')
        // para hacer consulta con find ejemplo .find({'name':'pepe'})
        .find({})
        //se puede quitar el limit
        .limit(50)
        .toArray((err,resul)=>{
                if (err) {
                    res.status(500).send('Error consultando Vehiculos')
                }else{
                    res.json(resul)
                }
        })
    
   
});

// post create usuario del crud, req solicita de front al procesamiento del backend,  
//res es el  backend devolviendo la respuesta
app.post('/usuarios/nuevo',(req,res)=>{
   const datosUsuarios=req.body;
    console.log("llaves",Object.keys(datosUsuarios));
    try {
        if (
            Object.keys(datosUsuarios).includes('code') &&
            Object.keys(datosUsuarios).includes('name') &&
            Object.keys(datosUsuarios).includes('lastName') &&
            Object.keys(datosUsuarios).includes('email') &&
            Object.keys(datosUsuarios).includes('idCard') &&
            Object.keys(datosUsuarios).includes('phone') 


    ) {
        conexion.collection('usuarios').insertOne(datosUsuarios,(err,result)=>{

            if (err) {
                // error 500 no encontro la ruta 
                console.error(err)
        res.sendStatus(500)
            }else{
                 //implementeatr codigo para devolver respuesta ok usuario en el procesamiento del backend al front
                 console.log(result)
            res.sendStatus(200)
            }
        })
    }else{
        res.sendStatus(500)
    }
    } catch {
        // error 500 no encontro la ruta 
        res.sendStatus(500)
    }
    
  
   //traer de imnsonia los datos en el console.log
    console.log("usuario a crear",req.body);
    

})


//escucha solicitudes con .list, se pone el puerto 5000 porque react tiene el puerto 3000


const main = ()=>{
    client.connect((err,db)=>{

        if(err){
            console.error("Error conectando a la base de datos")
            return 'Error prrrrrr';
        }
         conexion = db.db('administradores');
         console.log('Conexion exitosa')
        return app.listen(5000,() => {
            console.log('Escuchando el pueto 5000')
        });
    })
    
}

main();