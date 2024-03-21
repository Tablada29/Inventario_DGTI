import express from 'express';
import config from './config'
import productsRoutes from './routes/products.routes';
import cors from 'cors';


const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Configurar CORS para permitir todas las solicitudes desde cualquier origen
app.use(cors());
// Configurar CORS para permitir las cabeceras específicas en las solicitudes preflight
app.options('*', cors());


//setings 
app.set('port', config.port)


app.use(productsRoutes);


export default app