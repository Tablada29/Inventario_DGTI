import sql from 'mssql'

 const dbSettings = {
    user: 'orfis',
    password: 'zxcv',
    //server: 'localhost',
    server: '10.0.230.142',
    database: 'InventarioDGCIFS',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
    //port
}


export async function getConnection() {
   try {
    const pool = await sql.connect(dbSettings); //funcion asincrona - promesa 
    // const result = await pool.request().query('SELECT 1'); //consulta de seleciconar 1
    // console.log(result);
    return pool; //para que cualquier codigo lo ejeecute 
   } catch (error) {
     console.error(error);
   }
}

// getConnection(); // se ejecuto para prueba