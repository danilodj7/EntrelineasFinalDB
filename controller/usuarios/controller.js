
import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

const queryallUsers= async(callback)=>{
    const conexion = getDB()
   await conexion
     .collection('usuarios')
     // para hacer consulta con find ejemplo .find({'name':'pepe'})
     .find()
     //se puede quitar el limit
     .limit(50)
     .toArray(callback)
   
}


const crearUsuarios = async (datosUsuarios,callback)=>{
    if (
            Object.keys(datosUsuarios).includes('code') &&
            Object.keys(datosUsuarios).includes('name') &&
            Object.keys(datosUsuarios).includes('lastName') &&
            Object.keys(datosUsuarios).includes('email') &&
            Object.keys(datosUsuarios).includes('idCard') &&
            Object.keys(datosUsuarios).includes('phone') 
    ) {
        const conexion = getDB();
       await conexion.collection('usuarios').insertOne(datosUsuarios,callback)
    }else{
        return 'error'
    }
   
    
}

const editarUsuarios = async (edicion,callback)=>{

    const filtroUsuarios = {_id: new ObjectId(edicion.id)};
    delete edicion.id
    const operacion ={
        $set:edicion,
    }
    const conexion = getDB();
    await conexion
    .collection('usuarios')
    .findOneAndUpdate(
        filtroUsuarios,
        operacion,
        {upsert:true,returnOriginal:true},callback)

}
export {queryallUsers, crearUsuarios,editarUsuarios};