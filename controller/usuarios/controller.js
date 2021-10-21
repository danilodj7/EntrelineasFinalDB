
import { getDB } from "../../db/db.js";

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
        conexion.collection('usuarios').insertOne(datosUsuarios,callback)
    }else{
        return 'error'
    }
   
    
}

export {queryallUsers, crearUsuarios};