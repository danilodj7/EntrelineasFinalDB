import Express from "express"
import { queryAllSells, crearVentas, editarVentas, eliminarVentas,consultarVentas } from "../../controller/Ventas/controller.js";


const rutasVentas = Express.Router();

const genericCallback =(res)=> (err,result)=>{
        if (err) {
            res.status(500).send('Error consultando ventas')
        }else{
            res.json(result)
        }
    }

//el mensaje lo mustra el servidor en la terminal de visual studio code USAR GET
rutasVentas.route('/ventas').get((req,res)=>{
    console.log('alguien hizo get en la ruta /ventas')
    queryAllSells(genericCallback(res)); // ponerle responseVentas() por si falla
});

// post create usuario del crud, req solicita de front al procesamiento del backend,  
//res es el  backend devolviendo la respuesta
rutasVentas.route('/ventas').post((req,res)=>{
    
        crearVentas(req.body,genericCallback(res))

})

// get consulta
rutasVentas.route('/ventas/:id').get((req,res)=>{
    console.log('alguien hizo un get a un solo usuario, hizo una consulta')
    consultarVentas(req.params.id,genericCallback(res)); // ponerle responseVentas() por si falla
});

rutasVentas.route('/ventas/:id').patch((req,res)=>{

  editarVentas(req.params.id,req.body, genericCallback(res))

})

rutasVentas.route('/ventas/:id').delete((req,res)=>{
   
    eliminarVentas(req.params.id,genericCallback(res))
})

export default rutasVentas 