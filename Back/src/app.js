import express from 'express';
import config from './config'
import productsRoutes from './routes/products.routes';
import cors from 'cors';


const app = express();




//setings 
app.set('port', config.port)


app.use(productsRoutes);


export default app