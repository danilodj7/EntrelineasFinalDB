import Express from "express"
import { queryallUsers, crearUsuarios, editarUsuarios, eliminarUsuarios } from "../../controller/usuarios/controller.js";


const rutasUsuarios = Express.Router();

const genericCallback =(res)=> (err,result)=>{
        if (err) {
            res.status(500).send('Error consultando Usuarios')
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

  editarUsuarios(req.body, genericCallback(res))

})

rutasUsuarios.route('/usuarios/eliminar').delete((req,res)=>{
   
    eliminarUsuarios(req.body.id,genericCallback(res))
})

export default rutasUsuarios 