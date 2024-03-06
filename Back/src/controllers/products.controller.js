import { getConnection } from "../database/connection";

//Obtiene las marcas Correspondientes REgistradas en el sistema
//Productos
export const getProducts = (req, res) => {};


// // Equipos Registrados en Orfis
// export const getEquiposOrfis = async (req, res) => {
//     const pool = await getConnection();
//     const result = await pool.request().query(`
//             SELECT
//             CE.ClasificacionEquipoDescripcion AS Equipo,
//             M.MarcaDescripcion AS Marca,
//             EQ.Modelo,
//             EQ.Descripcion,
//             EQ.NombreEquipo,
//             E.ClaveProducto,
//             E.NumeroInventario,
//             E.NumeroInventarioArmonizado,
//             E.FechaCompra,
//             EA.Area,
//             EA.NombrePersonal AS AsignadoA
//         FROM
//             [InventarioDGCIFS].[Servicio].[Producto] AS E
//             INNER JOIN [InventarioDGCIFS].[Catalogos].[Marca] AS M ON E.Marca = M.MarcaId
//             LEFT JOIN [InventarioDGCIFS].[Servicio].[EquipoAsignacion] AS EA ON E.ProductoId = EA.Equipo
//             LEFT JOIN [InventarioDGCIFS].[Servicio].[Equipo] AS EQ ON E.ProductoId = EQ.EquipoId
//             LEFT JOIN [InventarioDGCIFS].[Catalogos].[ClasificacionEquipo] AS CE ON EQ.Clasificacion = CE.ClasificacionEquipoId
//     `);
//     console.log(result);
//     res.json(result.recordset);
// };

// WITH CantidadEquipos AS (
//     SELECT COUNT(*) AS TotalEquipos FROM [InventarioDGCIFS].[Servicio].[Equipo]
// )
// SELECT
//     CE.ClasificacionEquipoDescripcion AS Equipo,
//     M.MarcaDescripcion AS Marca,
//     EQ.Modelo,
//     EQ.Descripcion,
//     EQ.NombreEquipo,
//     E.ClaveProducto,
//     E.NumeroInventario,
//     E.NumeroInventarioArmonizado,
//     E.FechaCompra,
//     EA.Area,
//     EA.NombrePersonal AS AsignadoA
// FROM
//     [InventarioDGCIFS].[Servicio].[Producto] AS E
//     INNER JOIN [InventarioDGCIFS].[Catalogos].[Marca] AS M ON E.Marca = M.MarcaId
//     LEFT JOIN [InventarioDGCIFS].[Servicio].[EquipoAsignacion] AS EA ON E.ProductoId = EA.Equipo
//     LEFT JOIN [InventarioDGCIFS].[Servicio].[Equipo] AS EQ ON E.ProductoId = EQ.EquipoId
//     LEFT JOIN [InventarioDGCIFS].[Catalogos].[ClasificacionEquipo] AS CE ON EQ.Clasificacion = CE.ClasificacionEquipoId
//     CROSS JOIN CantidadEquipos;


//**********************     C O N S U L T A R      ************************* */

// // Equipos Registrados en Orfis
// export const getEquiposOrfis = async (req, res) => {
//     const pool = await getConnection();
//     const result = await pool.request().query(`
//     WITH CantidadEquipos AS (
//         SELECT COUNT(*) AS TotalEquipos FROM [InventarioDGCIFS].[Servicio].[Equipo]
//     )
//     SELECT
//         ROW_NUMBER() OVER (ORDER BY EQ.EquipoId) AS Id,
//         CE.ClasificacionEquipoDescripcion AS Equipo,
//         M.MarcaDescripcion AS Marca,
//         EQ.Modelo,
//         EQ.Descripcion,
//         EQ.NombreEquipo,
//         E.ClaveProducto,
//         E.NumeroInventario,
//         E.NumeroInventarioArmonizado,
//         E.FechaCompra,
//         E.FechaVencimientoGarantia,
//         A.AreaDescripcion AS Area, -- Cambio a AreaDescripcion
//         EA.NombrePersonal AS AsignadoA
//     FROM
//         [InventarioDGCIFS].[Servicio].[Producto] AS E
//         INNER JOIN [InventarioDGCIFS].[Catalogos].[Marca] AS M ON E.Marca = M.MarcaId
//         LEFT JOIN [InventarioDGCIFS].[Servicio].[EquipoAsignacion] AS EA ON E.ProductoId = EA.Equipo
//         LEFT JOIN [InventarioDGCIFS].[Servicio].[Equipo] AS EQ ON E.ProductoId = EQ.EquipoId
//         LEFT JOIN [InventarioDGCIFS].[Catalogos].[ClasificacionEquipo] AS CE ON EQ.Clasificacion = CE.ClasificacionEquipoId
//         LEFT JOIN [InventarioDGCIFS].[Catalogos].[Area] AS A ON EA.Area = A.AreaId -- Unir la tabla Area para obtener AreaDescripcion
//         CROSS JOIN CantidadEquipos;    
    
//     `);
//     console.log(result);
//     res.json(result.recordset);
// };

export const getEquiposOrfis = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(`
    WITH CantidadEquipos AS (
        SELECT COUNT(*) AS TotalEquipos FROM [InventarioDGCIFS].[Servicio].[Equipo]
    )
    SELECT
        ROW_NUMBER() OVER (ORDER BY EQ.EquipoId) AS Id,
        CE.ClasificacionEquipoId AS Equipo,
        M.MarcaId AS Marca,
        EQ.Modelo,
        EQ.Descripcion,
        EQ.NombreEquipo,
        E.ClaveProducto,
        E.NumeroInventario,
        E.NumeroInventarioArmonizado,
        E.FechaCompra,
        E.FechaVencimientoGarantia,
        A.AreaDescripcion AS Area, -- Cambio a AreaDescripcion
        EA.NombrePersonal AS AsignadoA
    FROM
        [InventarioDGCIFS].[Servicio].[Producto] AS E
        INNER JOIN [InventarioDGCIFS].[Catalogos].[Marca] AS M ON E.Marca = M.MarcaId
        LEFT JOIN [InventarioDGCIFS].[Servicio].[EquipoAsignacion] AS EA ON E.ProductoId = EA.Equipo
        LEFT JOIN [InventarioDGCIFS].[Servicio].[Equipo] AS EQ ON E.ProductoId = EQ.EquipoId
        LEFT JOIN [InventarioDGCIFS].[Catalogos].[ClasificacionEquipo] AS CE ON EQ.Clasificacion = CE.ClasificacionEquipoId
        LEFT JOIN [InventarioDGCIFS].[Catalogos].[Area] AS A ON EA.Area = A.AreaId -- Unir la tabla Area para obtener AreaDescripcion
        CROSS JOIN CantidadEquipos;    
    
    `);
    console.log(result);
    res.json(result.recordset);
};




//Nombres Equipos
export const getEquipos = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT *  FROM [InventarioDGCIFS].[Catalogos].[ClasificacionEquipo]");
    console.log(result);

    res.json(result.recordset);

};

//Marcas
export const getMarcas = async (req, res) => {
const pool = await getConnection();
const result = await pool.request().query("SELECT * FROM [Catalogos].[Marca]");
console.log(result);

res.json(result.recordset);

};





//*****************************   A G R E G A R     ******************************** */

// Insertar equipos desde tabla Producto
export const postProductos = async (req, res) => {
    try {
        // console.log(req);
        // const pool = await getConnection();
        // let query = `
        //     DECLARE @ProximoProductoId INT;
        //     SELECT @ProximoProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

        //     INSERT INTO [Servicio].[Producto] (ProductoId, Tipo, Marca, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto, 
        //         Estado, FechaCompra, FechaVencimientoGarantia, Licitacion, Activo, FHCreado, CreadoPor, FHModificado, ModificadoPor)
        //     `;
       
        // if (Array.isArray(req.body)) {

        //     query += 'VALUES ';
        //     req.body.forEach((equipo, index) => {
        //         console.log(equipo);
        //         query += `(@ProximoProductoId, '${equipo.Tipo}', '${equipo.Marca}', '${equipo.NumeroInventario}', '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
        //         if (index !== req.body.length - 1) {
        //             query += ', ';
        //         }
        //     });
        // } else {
        //     const equipo = req.body;
        //     console.log(equipo);
        //     query += `VALUES (@ProximoProductoId, '${equipo.Tipo}', '${equipo.Marca}', '${equipo.NumeroInventario}', 
        //     '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', 
        //     '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', 
        //     '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
        // }
        
        // const result = await pool.request().query(query);
        console.log(req.body);
       // console.log(result);
        res.status(200).json({ message: 'Equipos insertados correctamente desde tabla Producto.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al insertar equipos desde tabla Producto.', error });
    }
};


