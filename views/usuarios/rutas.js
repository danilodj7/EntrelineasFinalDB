
import Express from "express"
import { queryallUsers, crearUsuarios } from "../../controller/usuarios/controller.js";
import { getDB } from "../../db/db.js";

const rutasUsuarios = Express.Router();


const genericCallback =(res)=> (err,result)=>{
        if (err) {
            res.status(500).send('Error consultando Vehiculos')
        }else{
            res.json(result)
        }
    }
    


//el mensaje lo mustra el servidor en la terminal de visual studio code USAR GET
rutasUsuarios.route('/usuarios').get((req,res)=>{
    console.log('alguien hizo get en la ruta /usuarios')
    queryallUsers(genericCallback(res)); // ponerle responseUsuarios() por si falla
});

// post create usuario del crud, req solicita de front al procesamiento del backend,  
//res es el  backend devolviendo la respuesta
rutasUsuarios.route('/usuarios/nuevo').post((req,res)=>{
    
        crearUsuarios(req.body,genericCallback(res))

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