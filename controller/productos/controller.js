
import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";

// se usa async await cuando haya una conexion a una base de datos
// awat, uno espera una respuesta a de esa base de datos await funciona para esperar y despues ejecutar mas lineas de codigo
// osea que nosotros si hacemos desde el front  una solicitud al back ahi esparamos por ende tambien se usa en si cuando haya que esperar una respuesta
// se envia la solicitud  se espera y despues se ejecuta el otro codigo
const queryAllProducts= async(callback)=>{
    const conexion = getDB()
   await conexion
     .collection('productos')
     // para hacer consulta con find ejemplo .find({'name':'pepe'})
     .find()
     //se puede quitar el limit
     .limit(50)
     .toArray(callback)
   
}

const consultarProductos= async (id ,callback) =>{
    const conexion = getDB()
    await conexion.collection('productos')
      // para hacer consulta con find ejemplo .find({'name':'pepe'})
      .findOne({_id: new ObjectId(id)},callback)
      //se puede quitar el limit
      
      
}

const crearProductos = async (datosProductos,callback)=>{
    
       const conexion = getDB();
       await conexion.collection('productos').insertOne(datosProductos,callback)
    
   
    
}

const editarProductos = async (id, edicion,callback)=>{

    const filtroProductos = {_id: new ObjectId(id)};
   
    const operacion ={
        $set:edicion,
    }
    const conexion = getDB();
    await conexion
    .collection('productos')
    .findOneAndUpdate(
        filtroProductos,
        operacion,
        {upsert:true,returnOriginal:true},callback)

}

const eliminarProductos = async (id,callback)=>{
    const filtroProductos = {_id: new ObjectId(id)};
    const conexion = getDB();
    conexion.collection('productos').deleteOne(filtroProductos,callback)
}

export {queryAllProducts, crearProductos,editarProductos, eliminarProductos,consultarProductos};