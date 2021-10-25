
import { getDB } from "../../db/db.js";
import { ObjectId } from "mongodb";
import jwt_decode from 'jwt-decode'



// se usa async await cuando haya una conexion a una base de datos
// awat, uno espera una respuesta a de esa base de datos await funciona para esperar y despues ejecutar mas lineas de codigo
// osea que nosotros si hacemos desde el front  una solicitud al back ahi esparamos por ende tambien se usa en si cuando haya que esperar una respuesta
// se envia la solicitud  se espera y despues se ejecuta el otro codigo
const queryallUsers= async(callback)=>{
    const conexion = getDB()
   await conexion
     .collection('usuarios')
     // para hacer consulta con find ejemplo .find({'name':'pepe'})
     .find({})
     //se puede quitar el limit
     .limit(50)
     .toArray(callback)
   
}

const crearUsuarios = async (datosUsuarios,callback)=>{
    
        const conexion = getDB();
       await conexion.collection('usuarios').insertOne(datosUsuarios,callback)

}


const consultarUsuarios= async (id ,callback) =>{
    const conexion = getDB()
    await conexion.collection('usuarios')
      // para hacer consulta con find ejemplo .find({'name':'pepe'})
      .findOne({_id: new ObjectId(id)},callback)
      //se puede quitar el limit
      
      
}

const consultarOCrearUsuario =async (req, callback) =>{
        //1 obtener los datos del usuario desde el token

        const token =  req.headers.authorization.split('Bearer ')[1];
        // console.log('token',jwt_decode(token)); para pasar la informacion del token en el console
        const user = jwt_decode(token)['http://localhost/userData'];
        console.log(user)
        //2 con el correo o id verificar si esta en la base de datos o no
        const conexion = getDB();
        await conexion .collection("usuarios").findOne({email:user.email}, async (err ,response)=>{
            console.log("response consulta db",response)
            if (response) {
                 //3 si esta en la base de datos, devuelve la info del usuario
                callback(err, response)
               
            }else{

                user.auth0ID = user._id;
                 delete user._id;

                 user.rol = 'Sin rol';
                 user.estado = 'pendiente';
                await crearUsuarios(user,(err, respuesta)=>callback(err,user))

            }
        })

        
        

}



const editarUsuarios = async (id, edicion,callback)=>{

    const filtroUsuarios = {_id: new ObjectId(id)};
   
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

const eliminarUsuarios = async (id,callback)=>{
    const filtroUsuarios = {_id: new ObjectId(id)};
    const conexion = getDB();
    conexion.collection('usuarios').deleteOne(filtroUsuarios,callback)
}

export {queryallUsers, crearUsuarios,editarUsuarios, eliminarUsuarios,consultarUsuarios,consultarOCrearUsuario};