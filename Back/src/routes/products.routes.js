
import {Router} from 'express';
import { getProducts, getMarcas, getEquipos, getEquiposOrfis, postProductos,insertarDatos,
        getAreas
} from '../controllers/products.controller';

const router = Router();

//GET PARA OBTENER CATALOGOS DE INFORMACION

router.get('/productosOrfis', getEquiposOrfis); // Devuelve el listado de los Productos de Orfis registrados
router.get('/equipos', getEquipos); //devuelve los nombres de los equipos registrados
router.get('/marcas', getMarcas); //devuelve las marcas existentes
router.get('/areas', getAreas); //devuelve las marcas existentes


//POST

router.post('/agregarProducto', postProductos);
router.post('/insertarInventario', insertarDatos);






router.get('/products', getProducts);
router.get('/products', getProducts);
router.get('/products', getProducts);

router.get('/products', getProducts);
router.get('/products', getProducts);
router.get('/products', getProducts);

export default router

// GET / products   