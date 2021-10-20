
import Express from "express"
import { getDB } from "../../db/db.js";

const rutasUsuarios = Express.Router();
//el mensaje lo mustra el servidor en la terminal de visual studio code USAR GET
rutasUsuarios.route('/usuarios').get((req,res)=>{
    console.log('alguien hizo get en la ruta /usuarios')
       const conexion = getDB()
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
rutasUsuarios.route('/usuarios/nuevo').post((req,res)=>{
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
        
        const conexion = getDB();
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


rutasUsuarios.route('/usuarios/editar').patch((req,res)=>{

    const edicion = req.body;
    const filtroUsuarios = {_id: new ObjectId(edicion.id)};
    delete edicion.id
    const operacion ={
        $set:edicion,
    }
    const conexion = getDB();
    conexion
    .collection('usuarios')
    .findOneAndUpdate(
        filtroUsuarios,
        operacion,
        {upsert:true,returnOriginal:true},
        (err,result)=>{
        if (err) {
            console.error('Error editar usuarios',err)
            res.sendStatus(500)
        }else{
            console.log("Actualizado con exito")
            res.sendStatus(200)
        }
    })

})

rutasUsuarios.route('/usuarios/eliminar').delete((req,res)=>{
   
    const filtroUsuarios = {_id: new ObjectId(req.body.id)};
    const conexion = getDB();
    conexion.collection('usuarios').deleteOne(filtroUsuarios,(err,resul)=>{

            if (err) {
                console.error(err)
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
             } 
    })
})

export default rutasUsuarios 