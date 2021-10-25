import Express from "express"
import { queryallUsers, crearUsuarios, editarUsuarios, eliminarUsuarios,consultarUsuarios, consultarOCrearUsuario } from "../../controller/usuarios/controller.js";


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
rutasUsuarios.route('/usuarios').post((req,res)=>{
    
        crearUsuarios(req.body,genericCallback(res))

})

rutasUsuarios.route('/usuarios/self').get((req,res)=>{
    console.log('alguien hizo un get a la reuta self');
    consultarOCrearUsuario(req,genericCallback(res));
   // consultarUsuarios(req.params.id,genericCallback(res)); // ponerle responseUsuarios() por si falla
});

// get consulta
rutasUsuarios.route('/usuarios/:id').get((req,res)=>{
    console.log('alguien hizo un get a un solo usuario, hizo una consulta')
    consultarUsuarios(req.params.id,genericCallback(res)); // ponerle responseUsuarios() por si falla
});

rutasUsuarios.route('/usuarios/:id').patch((req,res)=>{

  editarUsuarios(req.params.id,req.body, genericCallback(res))

})

rutasUsuarios.route('/usuarios/:id').delete((req,res)=>{
   
    eliminarUsuarios(req.params.id,genericCallback(res))
})

export default rutasUsuarios 