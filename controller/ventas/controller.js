
import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

// se usa async await cuando haya una conexion a una base de datos
// awat, uno espera una respuesta a de esa base de datos await funciona para esperar y despues ejecutar mas lineas de codigo
// osea que nosotros si hacemos desde el front  una solicitud al back ahi esparamos por ende tambien se usa en si cuando haya que esperar una respuesta
// se envia la solicitud  se espera y despues se ejecuta el otro codigo
const queryAllSells= async(callback)=>{
    const conexion = getDB()
   await conexion
     .collection('ventas')
     // para hacer consulta con find ejemplo .find({'name':'pepe'})
     .find()
     //se puede quitar el limit
     .limit(50)
     .toArray(callback)
   
}

const consultarVentas= async (id ,callback) =>{
    const conexion = getDB()
    await conexion.collection('ventas')
      // para hacer consulta con find ejemplo .find({'name':'pepe'})
      .findOne({_id: new ObjectId(id)},callback)
      //se puede quitar el limit
      
      
}

const crearVentas = async (datosVentas,callback)=>{
    
       const conexion = getDB();
       await conexion.collection('ventas').insertOne(datosVentas,callback)
    
   
    
}

const editarVentas = async (id, edicion,callback)=>{

    const filtroVentas = {_id: new ObjectId(id)};
   
    const operacion ={
        $set:edicion,
    }
    const conexion = getDB();
    await conexion
    .collection('ventas')
    .findOneAndUpdate(
        filtroVentas,
        operacion,
        {upsert:true,returnOriginal:true},callback)

}

const eliminarVentas = async (id,callback)=>{
    const filtroVentas = {_id: new ObjectId(id)};
    const conexion = getDB();
    conexion.collection('ventas').deleteOne(filtroVentas,callback)
}

export {queryAllSells, crearVentas,editarVentas, eliminarVentas,consultarVentas};