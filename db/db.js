import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config({path:'./.env'})


const stringConexion= process.env.DATABASE_URL;

const client = new MongoClient(stringConexion,{

    useNewUrlParser:true,
    useUnifiedTopology:true,
});

let conexion;

// callback es una funcion que se ejecuta despues de que pase algo

const conectarBd =(callback)=>{
    client.connect((err,db)=>{
        if(err){
            console.error("Error conectando a la base de datos")
            return 'Error prrrrrr';
        }
         conexion = db.db('administradores');
         console.log('Conexion exitosa')
         return callback;
         
    })
}

const getDB = () =>{
    return conexion;
}

export {conectarBd, getDB}