import Express from "express"
import { queryAllProducts, crearProductos, editarProductos, eliminarProductos,consultarProductos } from "../../controller/productos/controller.js";


const rutasProductos = Express.Router();

const genericCallback =(res)=> (err,result)=>{
        if (err) {
            res.status(500).send('Error consultando productos')
        }else{
            res.json(result)
        }
    }

//el mensaje lo mustra el servidor en la terminal de visual studio code USAR GET
rutasProductos.route('/productos').get((req,res)=>{
    console.log('alguien hizo get en la ruta /productos')
    queryAllProducts(genericCallback(res)); // ponerle responseProductos() por si falla
});

// post create usuario del crud, req solicita de front al procesamiento del backend,  
//res es el  backend devolviendo la respuesta
rutasProductos.route('/productos').post((req,res)=>{
    
        crearProductos(req.body,genericCallback(res))

})

// get consulta
rutasProductos.route('/productos/:id').get((req,res)=>{
    console.log('alguien hizo un get a un solo usuario, hizo una consulta')
    consultarProductos(req.params.id,genericCallback(res)); // ponerle responseProductos() por si falla
});

rutasProductos.route('/productos/:id').patch((req,res)=>{

  editarProductos(req.params.id,req.body, genericCallback(res))

})

rutasProductos.route('/productos/:id').delete((req,res)=>{
   
    eliminarProductos(req.params.id,genericCallback(res))
})

export default rutasProductos 