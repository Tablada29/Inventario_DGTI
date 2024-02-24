import { getConnection } from "../database/connection";

//Obtiene las marcas Correspondientes REgistradas en el sistema
//Productos
export const getProducts = (req, res) => {};

//Marcas
export const getMarcas = async (req, res) => {
const pool = await getConnection();
const result = await pool.request().query("SELECT * FROM [Catalogos].[Marca]");
console.log(result);

res.json(result.recordset);

};
