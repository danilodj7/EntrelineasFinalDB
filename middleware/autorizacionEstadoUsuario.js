import { getDB } from "../db/db.js";
import { ObjectId } from "mongodb";
import jwt_decode from 'jwt-decode'


const autorizacionEstadoUsuario =async (req, res, next )=>{
         
        
        // paso 1: obtener el usuario desde el token 
        const token =  req.headers.authorization.split('Bearer ')[1];
        const user = jwt_decode(token)['http://localhost/userData'];
        console.log(user)
        
        const conexion = getDB();
        await conexion .collection("usuarios").findOne({email:user.email}, async (err ,response)=>{
            console.log("response consulta db",response)
            if (response) {
                
                console.log(response)
                if(response.estado==='rechazado'){
                    res.sendStatus(401) // error de autenticacion
                }else{
                  console.log('Habilitado')
                  next();
                }

            }else{
        
                next();
        }
        })
        // paso 2: consultar el usuario en la base de datos
        // paso 3: verificar el estado del usuario 
        // paso 4: si el estado de usuario esta pendiente o habilitado pasar a next 
        // paso 5: si el usuario es rechazado, devolver un error de autentizacion 
        
}

export default autorizacionEstadoUsuario;