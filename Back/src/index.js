import app from './app'
import './database/connection'
const cors = require('cors');

app.listen(app.get('port'))

app.use(cors()); // Permitir todas las solicitudes CORS

console.log("Servidor Trabajando en puerto", app.get('port'))  