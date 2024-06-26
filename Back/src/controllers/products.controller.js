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
        E.Activo,
        E.ClaveProducto,
        E.NumeroInventario,
        E.NumeroInventarioArmonizado,
        E.FechaCompra,
        E.Licitacion,
        E.FechaVencimientoGarantia,
        A.AreaId AS Area, -- Cambio a AreaDescripcion
        EA.IP AS IPEquipo,
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
   // console.log(result);
    res.json(result.recordset);
};
//Nombres Equipos
export const getEquipos = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT *  FROM [InventarioDGCIFS].[Catalogos].[ClasificacionEquipo] ORDER BY ClasificacionEquipoDescripcion ASC");
    //console.log(result);
    res.json(result.recordset);
};
//Marcas
export const getMarcas = async (req, res) => {
const pool = await getConnection();
const result = await pool.request().query("SELECT * FROM [Catalogos].[Marca] ORDER BY MarcaDescripcion ASC");
//console.log(result);

res.json(result.recordset);

};
//Areas
export const getAreas = async (req, res) => {
    
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM [Catalogos].[Area] where Activo=1 AND Clasificacion=1 ORDER BY AreaDescripcion ASC");
   // console.log(result);
    
    res.json(result.recordset);
    
    };



//*****************************   I N S E R T A R    ******************************** */

// Insertar equipos desde tabla Producto
// export const postProductos = async (req, res) => {
//     try {
        
//          const pool = await getConnection();
//         let query = `
//             DECLARE @ProximoProductoId INT;
//             SELECT @ProximoProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

//             INSERT INTO [Servicio].[Producto] (ProductoId, Tipo, Marca, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto, 
//                 Estado, FechaCompra, FechaVencimientoGarantia, Licitacion, Activo, FHCreado, CreadoPor, FHModificado, ModificadoPor)
//             `;

//         if (Array.isArray(req.body)) {

//             query += 'VALUES ';
//             req.body.forEach((equipo, index) => {
//                 console.log(equipo);
//                 query += `(@ProximoProductoId, '${equipo.Tipo}', '${equipo.Marca}', '${equipo.NumeroInventario}', '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
//                 if (index !== req.body.length - 1) {
//                     query += ', ';
//                 }
//             });
//         } else {
//             const equipo = req.body;
//             console.log(equipo);
//             query += `VALUES (@ProximoProductoId, '${equipo.Tipo}', '${equipo.Marca}', '${equipo.NumeroInventario}', 
//             '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', 
//             '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', 
//             '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
//         }
        
//         const result = await pool.request().query(query);
//         console.log(req.body);
//         console.log(result);
//         res.status(200).json({ message: 'Equipos insertados correctamente desde tabla Producto.' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error al insertar equipos desde tabla Producto.', error });
//     }
// };

export const postProductos11 = async (req, res) => {
    try {
        const pool = await getConnection();

        let query = `
            DECLARE @ProximoProductoId INT;
            SELECT @ProximoProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

            INSERT INTO [Servicio].[Producto] (ProductoId, Tipo, Marca, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto, 
                Estado, FechaCompra, FechaVencimientoGarantia, Licitacion, Activo, FHCreado, CreadoPor, FHModificado, ModificadoPor)
        `;

        if (Array.isArray(req.body)) {
            query += 'VALUES ';
            req.body.forEach((equipo, index) => {
                query += `(@ProximoProductoId, '${equipo.Tipo}', '${equipo.Marca}', '${equipo.NumeroInventario}', '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
                if (index !== req.body.length - 1) {
                    query += ', ';
                }
            });
        } else {
            const equipo = req.body;
            query += `VALUES (@ProximoProductoId, '${equipo.Tipo}', '${equipo.Marca}', '${equipo.NumeroInventario}', 
            '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', 
            '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', 
            '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
        }

        // Insertar en la tabla Producto
        await pool.request().query(query);

        let equipoAsignacionQuery = '';
        if (Array.isArray(req.body)) {
            //const equipo = req.body;
           //console.log("Valor equipo"+req.body);
            equipoAsignacionQuery = `
                DECLARE @ProximoEquipoAsignacionId INT;
                SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];
                
                INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
                VALUES `;
            
            req.body.forEach((equipo, index) => {
              //  console.log(equipo);
                equipoAsignacionQuery += `(@ProximoEquipoAsignacionId, 1750 ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)`;
                console.log(equipoAsignacionQuery);
                if (index !== req.body.length - 1) {
                    equipoAsignacionQuery += ', ';
                }
            });
        } else {
            const equipo = req.body;
            //console.log("Valor equipo"+equipo);
            equipoAsignacionQuery = `
                DECLARE @ProximoEquipoAsignacionId INT;
                SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

                INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
                VALUES (@ProximoEquipoAsignacionId, NULL ,${equipo.Area}, 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)
            `;
            //console.log(equipoAsignacionQuery);
        }

        // Insertar en la tabla EquipoAsignacion
        await pool.request().query(equipoAsignacionQuery);

        res.status(200).json({ message: 'Datos insertados correctamente' });
    } catch (error) {
        console.error('Error al insertar datos:', error.message);
        res.status(500).json({ message: 'Error al insertar datos' });
    }
};


export const insertarDatos = async (req, res) => {
    try {
        const pool = await getConnection();
        const { Equipo, Marca, Modelo, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto, FechaCompra, Area, AsignadoA } = req.body;

        // Insertar datos en la tabla Producto
        const productoResult = await pool.request().query(`
            INSERT INTO [InventarioDGCIFS].[Servicio].[Producto] (Tipo, Marca, Modelo, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto, Estado, FechaCompra, FechaVencimientoGarantia)
            OUTPUT INSERTED.ProductoId
            VALUES (1, ${Marca}, '${Modelo}', '${NumeroInventario}', '${NumeroInventarioArmonizado}', '${ClaveProducto}', 1, '${FechaCompra}', NULL);
        `);
        const productoId = productoResult.recordset[0].ProductoId;

        // Insertar datos en la tabla EquipoAsignacion
        await pool.request().query(`
            INSERT INTO [InventarioDGCIFS].[Servicio].[EquipoAsignacion] (Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
            VALUES (${productoId}, '${Area}', 1, '${AsignadoA}', NULL, GETDATE(), 1);
        `);

        res.status(200).json({ message: 'Datos insertados correctamente' });
    } catch (error) {
        console.error('Error al insertar datos:', error.message);
        res.status(500).json({ message: 'Error al insertar datos' });
    }
};


//funciona pero dublica primary key 
// export const postProductos = async (req, res) => {
//     try {
//         const pool = await getConnection();

//         var existeNumeroInventarioArmonizadoQuery='';
//         var numInvArmCheck = '';
//         if (Array.isArray(req.body)) {
//             req.body.forEach((equipo) => {
//                 console.log(equipo);
//                  existeNumeroInventarioArmonizadoQuery = `
//                     SELECT COUNT(*) AS Total FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${equipo.NumeroInventarioArmonizado}';
//                 `;
//                 numInvArmCheck = equipo.NumeroInventarioArmonizado;
//                 // Aquí puedes ejecutar la consulta SQL
//             });
//         }

//         // Validar si existe el NumeroInventarioArmonizado
       
//         // const existeNumeroInventarioArmonizadoQuery = `
//         //     SELECT COUNT(*) AS Total FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${req.body.NumeroInventarioArmonizado}';
//         // `;
        
//       // console.log(existeNumeroInventarioArmonizadoQuery);
//         const existeNumeroInventarioArmonizadoResult = await pool.request().query(existeNumeroInventarioArmonizadoQuery);
//         //console.log(existeNumeroInventarioArmonizadoResult);
//         const existeNumeroInventarioArmonizado = existeNumeroInventarioArmonizadoResult.recordset[0].Total > 0;
//         //console.log(existeNumeroInventarioArmonizado);

//         if (existeNumeroInventarioArmonizado === true) {
//            // console.log('entre');
//             //console.log(numInvArmCheck);
//             const numeroInventarioDuplicadoQuery = `
//                 SELECT * FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${numInvArmCheck}';
//             `;
//             const numeroInventarioDuplicadoResult = await pool.request().query(numeroInventarioDuplicadoQuery);
//            // console.log(numeroInventarioDuplicadoResult.recordset[0])
//             const numeroInventarioDuplicado = numeroInventarioDuplicadoResult.recordset[0];

//             return res.status(400).json({ 
//                 message: `El Numero de Inventario Armonizado '${numInvArmCheck}' ya encuentra registrado con los siguientes datos '${JSON.stringify(numeroInventarioDuplicado)}', no se puede agregar el inventario hasta que se corrija ese dato.`
//                 , existeDuplicado: true
//             });
            
//             // return res.status(400).json({ 
//             //     message: `El Numero de Inventario Armonizado '${numInvArmCheck}' ya encuentra registrado con los siguientes datos:\n${formatObject(numeroInventarioDuplicado)}`,
//             //     existeDuplicado: true
//             // });
            
        
//         }
//         else{
//                     // Continuar con la lógica de inserción
//                     let query = `
//                     DECLARE @ProximoProductoId INT;
//                     SELECT @ProximoProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

//                     INSERT INTO [Servicio].[Producto] (ProductoId, Tipo, Marca, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto, 
//                         Estado, FechaCompra, FechaVencimientoGarantia, Licitacion, Activo, FHCreado, CreadoPor, FHModificado, ModificadoPor)
//                 `;
//                 console.log(query);
//                 if (Array.isArray(req.body)) {
//                     query += 'VALUES ';
//                     req.body.forEach((equipo, index) => {
//                         let tipoProductoIdQuery = `
//                             DECLARE @TipoProductoId INT;
//                             SELECT @TipoProductoId = TipoProductoId FROM [Catalogos].[TipoProducto] WHERE TipoProductoDescripcion = 'Equipo';
//                         `;

//                         // Ejecutar la consulta para obtener el TipoProductoId
//                         const tipoProductoIdResult = await pool.request().query(tipoProductoIdQuery);
//                         const tipoProductoId = tipoProductoIdResult.recordset[0].TipoProductoId;


//                         query += `(@ProximoProductoId, '@TipoProductoId', '${equipo.Marca}', '${equipo.NumeroInventario}', 
//                         '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', 
//                         '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', 
//                         '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
//                         if (index !== req.body.length - 1) {
//                             query += ', ';
//                         }
//                         console.log(query);
//                     });
//                 } 
//                 else {
//                     const equipo = req.body;
//                     console.log(equipo);
//                     query += `VALUES (@ProximoProductoId, '@TipoProductoId', '${equipo.Marca}', '${equipo.NumeroInventario}', 
//                     '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', 
//                     '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', 
//                     '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
//                     console.log(query);
//                 }

//                 // Insertar en la tabla Producto
//                 await pool.request().query(query);

//                 let equipoAsignacionQuery = '';
//                 if (Array.isArray(req.body)) {
//                     equipoAsignacionQuery = `
//                         DECLARE @ProximoEquipoAsignacionId INT;
//                         SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];
                        
//                         INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
//                         VALUES `;
                    
//                         console.log(equipoAsignacionQuery);
//                     req.body.forEach((equipo, index) => {
//                         equipoAsignacionQuery += `(@ProximoEquipoAsignacionId, NULL ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)`;
//                         if (index !== req.body.length - 1) {
//                             equipoAsignacionQuery += ', ';
//                         }
//                     });
//                 } else {
//                     const equipo = req.body;
//                     equipoAsignacionQuery = `
//                         DECLARE @ProximoEquipoAsignacionId INT;
//                         SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

//                         INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
//                         VALUES (@ProximoEquipoAsignacionId, NULL ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)
//                     `;
//                     console.log(equipoAsignacionQuery);
//                 }

//                 // Insertar en la tabla EquipoAsignacion
//                 await pool.request().query(equipoAsignacionQuery);

//                 res.status(200).json({ message: 'Datos insertados correctamente' });

//         }

//     } catch (error) {
//         console.error('Error al insertar datos:', error.message);
//         res.status(500).json({ message: 'Error al insertar datos' });
//     }
// };



// export const postProductos = async (req, res) => {
//     try {
//         const pool = await getConnection();

//         var existeNumeroInventarioArmonizadoQuery='';
//         var numInvArmCheck = '';
//         if (Array.isArray(req.body)) {
//             req.body.forEach((equipo) => {
//                 console.log(equipo);
//                 existeNumeroInventarioArmonizadoQuery = `
//                     SELECT COUNT(*) AS Total FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${equipo.NumeroInventarioArmonizado}';
//                 `;
//                 numInvArmCheck = equipo.NumeroInventarioArmonizado;
//                 // Aquí puedes ejecutar la consulta SQL
//             });
//         }

//         // Validar si existe el NumeroInventarioArmonizado
//         const existeNumeroInventarioArmonizadoResult = await pool.request().query(existeNumeroInventarioArmonizadoQuery);
//         const existeNumeroInventarioArmonizado = existeNumeroInventarioArmonizadoResult.recordset[0].Total > 0;

//         if (existeNumeroInventarioArmonizado === true) {
//             const numeroInventarioDuplicadoQuery = `
//                 SELECT * FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${numInvArmCheck}';
//             `;
//             const numeroInventarioDuplicadoResult = await pool.request().query(numeroInventarioDuplicadoQuery);
//             const numeroInventarioDuplicado = numeroInventarioDuplicadoResult.recordset[0];

//             return res.status(400).json({ 
//                 message: `El Numero de Inventario Armonizado '${numInvArmCheck}' ya encuentra registrado con los siguientes datos '${JSON.stringify(numeroInventarioDuplicado)}', no se puede agregar el inventario hasta que se corrija ese dato.`,
//                 existeDuplicado: true
//             });
//         } else {
//             let query = `
//                 DECLARE @ProximoProductoId INT;
//                 SELECT @ProximoProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

//                 DECLARE @TipoProductoId INT;
//                 SELECT @TipoProductoId = TipoProductoId FROM [Catalogos].[TipoProducto] WHERE TipoProductoDescripcion = 'Equipo';

//                 INSERT INTO [Servicio].[Producto] (ProductoId, Tipo, Marca, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto, 
//                     Estado, FechaCompra, FechaVencimientoGarantia, Licitacion, Activo, FHCreado, CreadoPor, FHModificado, ModificadoPor)
//             `;
//             if (Array.isArray(req.body)) {
//                 query += 'VALUES ';
//                 req.body.forEach((equipo, index) => {
//                     query += `(@ProximoProductoId, @TipoProductoId, '${equipo.Marca}', '${equipo.NumeroInventario}', 
//                         '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', 
//                         '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', 
//                         '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
//                     if (index !== req.body.length - 1) {
//                         query += ', ';
//                     }
//                 });
//             } else {
//                 const equipo = req.body;
//                 query += `VALUES (@ProximoProductoId, @TipoProductoId, '${equipo.Marca}', '${equipo.NumeroInventario}', 
//                     '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', 
//                     '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', 
//                     '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
//             }

//             // Insertar en la tabla Producto
//             await pool.request().query(query);

//             let equipoAsignacionQuery = '';
//             if (Array.isArray(req.body)) {
//                 equipoAsignacionQuery = `
//                     DECLARE @ProximoEquipoAsignacionId INT;
//                     SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];
                    
//                     INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
//                     VALUES `;
                
//                 req.body.forEach((equipo, index) => {
//                     equipoAsignacionQuery += `(@ProximoEquipoAsignacionId, NULL ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)`;
//                     if (index !== req.body.length - 1) {
//                         equipoAsignacionQuery += ', ';
//                     }
//                 });
//             } else {
//                 const equipo = req.body;
//                 equipoAsignacionQuery = `
//                     DECLARE @ProximoEquipoAsignacionId INT;
//                     SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

//                     INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
//                     VALUES (@ProximoEquipoAsignacionId, NULL ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)
//                 `;
//             }

//             // Insertar en la tabla EquipoAsignacion
//             await pool.request().query(equipoAsignacionQuery);

//             res.status(200).json({ message: 'Datos insertados correctamente' });
//         }

//     } catch (error) {
//         console.error('Error al insertar datos:', error.message);
//         res.status(500).json({ message: 'Error al insertar datos' });
//     }
// };




//fucnionara pero no tiene rollback
// export const postProductos = async (req, res) => {
//     try {
//         const pool = await getConnection();

//         var existeNumeroInventarioArmonizadoQuery = '';
//         var numInvArmCheck = '';
//         if (Array.isArray(req.body)) {
//             req.body.forEach((equipo) => {
//                 console.log(equipo);
//                 existeNumeroInventarioArmonizadoQuery = `
//                     SELECT COUNT(*) AS Total FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${equipo.NumeroInventarioArmonizado}';
//                 `;
//                 numInvArmCheck = equipo.NumeroInventarioArmonizado;
//                 // Aquí puedes ejecutar la consulta SQL
//             });
//         }

//         // Validar si existe el NumeroInventarioArmonizado
//         const existeNumeroInventarioArmonizadoResult = await pool.request().query(existeNumeroInventarioArmonizadoQuery);
//         const existeNumeroInventarioArmonizado = existeNumeroInventarioArmonizadoResult.recordset[0].Total > 0;
//         //Si el registro existe
//         if (existeNumeroInventarioArmonizado === true) {
//             const numeroInventarioDuplicadoQuery = `
//                 SELECT * FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${numInvArmCheck}';
//             `;
//             const numeroInventarioDuplicadoResult = await pool.request().query(numeroInventarioDuplicadoQuery);
//             const numeroInventarioDuplicado = numeroInventarioDuplicadoResult.recordset[0];

//             return res.status(400).json({
//                 message: `El Numero de Inventario Armonizado '${numInvArmCheck}' ya encuentra registrado con los siguientes datos '${JSON.stringify(numeroInventarioDuplicado)}', no se puede agregar el inventario hasta que se corrija ese dato.`,
//                 existeDuplicado: true
//             });
//         } 

//         //En caso de que el registro no exista, procedemos con la inserción
//         else {
//             let proximoProductoId;

//                 // Obtener el próximo ProductoId
//                 await pool.request().query(`

//                 SELECT ProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

//                 `).then(result => {
//                     //console.log(result.recordset[0].ProductoId);
//                     proximoProductoId = parseInt(result.recordset[0].ProductoId);
//                 });
//              //Inserción de Producto 
//             let query = `
                
//                             DECLARE @ProximoProductoId INT;
//                                 SELECT @ProximoProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

//                     DECLARE @TipoProductoId INT;
//                     SELECT @TipoProductoId = TipoProductoId FROM [Catalogos].[TipoProducto] WHERE TipoProductoDescripcion = 'Equipo';


//                     INSERT INTO [Servicio].[Producto] (ProductoId, Tipo, Marca, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto,
//                         Estado, FechaCompra, FechaVencimientoGarantia, Licitacion, Activo, FHCreado, CreadoPor, FHModificado, ModificadoPor)
//                     `;

           
//             if (Array.isArray(req.body)) {
//                 query += 'VALUES ';
//                 let contador = proximoProductoId;
//                 req.body.forEach((equipo, index) => {
//                     query += `(${contador}, @TipoProductoId, '${equipo.Marca}', '${equipo.NumeroInventario}',
//                         '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}',
//                         '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}',
//                         '${equipo.FHModificado}', '${equipo.ModificadoPor}');`;

//                     if (index !== req.body.length - 1) {
//                         query += ', ';
//                     }
//                     contador = contador + 1;
//                     console.log(query);
//                     // Incrementar el contador
//                 });

//             } else {
//                 const equipo = req.body;
//                 query += `VALUES (@ProximoProductoId, @TipoProductoId, '${equipo.Marca}', '${equipo.NumeroInventario}',
//                     '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}',
//                     '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}',
//                     '${equipo.FHModificado}', '${equipo.ModificadoPor}');`;
//                     console.log("Individual");
//                     console.log(query);
//             }

        
            
//             await pool.request().query(query);
        
// /******************************************************************* INSERCION  EQUIPO ******************************************************************/
//             //Realiza inserción tambien a Servicio Producto
//             let proximoEquipoIdProducto;
//                 // Obtener el próximo EquipoId
//                 await pool.request().query(`

//                 SELECT EquipoId = ISNULL(MAX(ProductoId), 0) 
//                 FROM [Servicio].[Producto];

//                 `).then(result => {
//                     proximoEquipoIdProducto = parseInt(result.recordset[0].EquipoId);
//                 });

//           //  console.log("valor de equipoId: "+proximoEquipoIdProducto);
 
//             //Se declara la consulta a la base de datos 
//                 let query2 = `
//                 DECLARE @EquipoProductoId INT;
//                      SELECT  @EquipoProductoId = ISNULL(MAX(ProductoId), 0) 
//                      FROM [Servicio].[Producto];
            

//                 INSERT INTO [Servicio].[Equipo] (EquipoId, Producto, 
//                     Clasificacion, Modelo, Descripcion, SistemaOperativo, 
//                     MSOffice, Observaciones, NombreEquipo, ContrasenaAdministrador)
//                 `;
//                 //si el array trae mas de un valor entonces hace un for para recorrer valores 
//                 //console.log("Valor de Equipo "+req.body);
//                 console.log("Valor contador "+proximoEquipoIdProducto);
//                 if (Array.isArray(req.body)) {
//                     query2 +='VALUES ';
//                     //'${contador2}'
//                     //@ProximoProductoId
//                     let contador2 = proximoEquipoIdProducto;
                    
//                     req.body.forEach((equipo, index) => {
//                         query2 += `('${contador2}', '${contador2}' ,'${equipo.Equipo}', 
//                         '${equipo.Modelo}', '${equipo.Descripcion}'
//                         ,NULL, NULL, NULL, NULL, NULL);`;
//                         if (index !== req.body.length - 1) {
//                             query2 += ', ';
//                         }
//                         contador2 = contador2 + 1;
//                         console.log(query2);
//                     });
                    
//                 } 
//                 //Si solo es 1
//                 else {
//                     const query2 = req.body;
//                     equipo = `
   
//                     DECLARE @EquipoProductoId INT;
//                                 SELECT  @EquipoProductoId = ISNULL(MAX(ProductoId), 0) FROM [Servicio].[Producto];
            
//                      INSERT INTO [Servicio].[Equipo] (EquipoId, Producto, Clasificacion, Modelo, Descripcion, SistemaOperativo, MSOffice, 
//                                     Observaciones, NombreEquipo, ContrasenaAdministrador)
//                                 VALUES  (@EquipoProductoId, @EquipoProductoId ,'${equipo.Equipo}', 1, '${equipo.Modelo}', '${equipo.Descripcion}',
//                         NULL, NULL, NULL, NULL, 'OOOO')
//                     `;
//                     console.log(query2);
//                 }
            
//                 // Insertar en la tabla Equipo
//                 await pool.request().query(query2);
            

// /**************************************************** INSERCION EQUIPO ASIGNACION ******************************************************/
//             //consulta de EquipoAsignación - pobtener el proximo producto 
//             let proximoEquipoId;

//                 // Obtener el próximo EquipoAsignacionId
//                 await pool.request().query(`

//                     SELECT EquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

//                 `).then(result => {
                    
//                     proximoEquipoId = parseInt(result.recordset[0].EquipoAsignacionId);
//                 });

//                 console.log("valor de: "+proximoEquipoId);
//                 //realiza inserción en EquipoAsignación 
//             let equipoAsignacionQuery = '';
//             //si son muchos
//             console.log(req.body);
//             if (Array.isArray(req.body)) {

//                 equipoAsignacionQuery = `
//                 DECLARE @ProximoEquipoAsignacionId INT;
//                 SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

//                 DECLARE @EquipoProductoId INT;
//                 SELECT  @EquipoProductoId = ISNULL(MAX(ProductoId), 0) FROM [Servicio].[Producto];
        
//                     INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
//                     VALUES `;
//                 //'${contador2}'
//                 //@ProximoProductoId
//                 let contador2 = proximoEquipoId;
//                 req.body.forEach((equipo, index) => {
//                     equipoAsignacionQuery += ` ('${contador2}',  @EquipoProductoId ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)`;
//                     if (index !== req.body.length - 1) {
//                         equipoAsignacionQuery += ', ';
//                     }
//                     contador2 = contador2 + 1;
                    
//                 });
//                 console.log(equipoAsignacionQuery);
//             } 
//             //Si solo es 1
//             else {
//                 const equipo = req.body;
//                 equipoAsignacionQuery = `
//                     DECLARE @ProximoEquipoAsignacionId INT;
//                     SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

//                     DECLARE @EquipoProductoId INT;
//                     SELECT  @EquipoProductoId = ISNULL(MAX(ProductoId), 0) FROM [Servicio].[Producto];
        
//                     INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
//                     VALUES (@ProximoEquipoAsignacionId,   @EquipoProductoId ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)
//                 `;
//                 console.log(equipoAsignacionQuery);
//             }
        
//             // Insertar en la tabla EquipoAsignacion
//             await pool.request().query(equipoAsignacionQuery);
        




//             res.status(200).json({ message: 'Datos insertados correctamente' });
//         }
        
        
//     } catch (error) {
//         console.error('Error al insertar datos:', error.message);
//         res.status(500).json({ message: 'Error al insertar datos' });
//     }
// };


//contiene rollback
export const postProductos = async (req, res) => {
    let rollback = false; // Variable para controlar el rollback
    try {
        const pool = await getConnection();

        var existeNumeroInventarioArmonizadoQuery = '';
        var numInvArmCheck = '';
        if (Array.isArray(req.body)) {
            req.body.forEach((equipo) => {
                console.log(equipo);
                existeNumeroInventarioArmonizadoQuery = `
                    SELECT COUNT(*) AS Total FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${equipo.NumeroInventarioArmonizado}';
                `;
                numInvArmCheck = equipo.NumeroInventarioArmonizado;
                // Aquí puedes ejecutar la consulta SQL
            });
        }

        // Validar si existe el NumeroInventarioArmonizado
        const existeNumeroInventarioArmonizadoResult = await pool.request().query(existeNumeroInventarioArmonizadoQuery);
        const existeNumeroInventarioArmonizado = existeNumeroInventarioArmonizadoResult.recordset[0].Total > 0;
        //Si el registro existe
        if (existeNumeroInventarioArmonizado === true) {
            const numeroInventarioDuplicadoQuery = `
                SELECT * FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${numInvArmCheck}';
            `;
            const numeroInventarioDuplicadoResult = await pool.request().query(numeroInventarioDuplicadoQuery);
            const numeroInventarioDuplicado = numeroInventarioDuplicadoResult.recordset[0];

            return res.status(400).json({
                message: `El Numero de Inventario Armonizado '${numInvArmCheck}' ya encuentra registrado con los siguientes datos '${JSON.stringify(numeroInventarioDuplicado)}', no se puede agregar el inventario hasta que se corrija ese dato.`,
                existeDuplicado: true
            });
        } 

        //En caso de que el registro no exista, procedemos con la inserción
        else {
            let proximoProductoId;

            // Obtener el próximo ProductoId
            await pool.request().query(`

                SELECT ProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

            `).then(result => {
                //console.log(result.recordset[0].ProductoId);
                proximoProductoId = parseInt(result.recordset[0].ProductoId);
            });
            //Inserción de Producto 
            let query = `
                DECLARE @ProximoProductoId INT;
                SELECT @ProximoProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

                DECLARE @TipoProductoId INT;
                SELECT @TipoProductoId = TipoProductoId FROM [Catalogos].[TipoProducto] WHERE TipoProductoDescripcion = 'Equipo';

                INSERT INTO [Servicio].[Producto] (ProductoId, Tipo, Marca, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto,
                    Estado, FechaCompra, FechaVencimientoGarantia, Licitacion, Activo, FHCreado, CreadoPor, FHModificado, ModificadoPor)
            `;

            if (Array.isArray(req.body)) {
                query += 'VALUES ';
                let contador = proximoProductoId;
                req.body.forEach((equipo, index) => {
                    query += `(${contador}, @TipoProductoId, '${equipo.Marca}', '${equipo.NumeroInventario}',
                        '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}',
                        '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}',
                        '${equipo.FHModificado}', '${equipo.ModificadoPor}');`;

                    if (index !== req.body.length - 1) {
                        query += ', ';
                    }
                    contador = contador + 1;
                    console.log(query);
                    // Incrementar el contador
                });

            } else {
                const equipo = req.body;
                query += `VALUES (@ProximoProductoId, @TipoProductoId, '${equipo.Marca}', '${equipo.NumeroInventario}',
                    '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}',
                    '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}',
                    '${equipo.FHModificado}', '${equipo.ModificadoPor}');`;
                    console.log("Individual");
                    console.log(query);
            }

            await pool.request().query(query);
            
            // Inserción en la tabla Equipo
            let proximoEquipoIdProducto;
            // Obtener el próximo EquipoId
            await pool.request().query(`

                SELECT EquipoId = ISNULL(MAX(ProductoId), 0) FROM [Servicio].[Producto];

            `).then(result => {
                proximoEquipoIdProducto = parseInt(result.recordset[0].EquipoId);
            });

            // Se declara la consulta a la base de datos 
            let query2 = `
                DECLARE @EquipoProductoId INT;
                SELECT  @EquipoProductoId = ISNULL(MAX(ProductoId), 0) FROM [Servicio].[Producto];

                INSERT INTO [Servicio].[Equipo] (EquipoId, Producto, Clasificacion, Modelo, Descripcion, SistemaOperativo, MSOffice, 
                                Observaciones, NombreEquipo, ContrasenaAdministrador)
            `;
            if (Array.isArray(req.body)) {
                query2 +='VALUES ';
                //'${contador2}'
                //@ProximoProductoId
                let contador2 = proximoEquipoIdProducto;
                
                req.body.forEach((equipo, index) => {
                    query2 += `('${contador2}', '${contador2}' ,'${equipo.Equipo}', 
                    '${equipo.Modelo}', '${equipo.Descripcion}'
                    ,NULL, NULL, NULL, NULL, NULL);`;
                    if (index !== req.body.length - 1) {
                        query2 += ', ';
                    }
                    contador2 = contador2 + 1;
                    console.log(query2);
                });
                
            } 
            // Si solo es 1
            else {
                const query2 = req.body;
                equipo = `
                    DECLARE @EquipoProductoId INT;
                    SELECT  @EquipoProductoId = ISNULL(MAX(ProductoId), 0) FROM [Servicio].[Producto];

                    INSERT INTO [Servicio].[Equipo] (EquipoId, Producto, Clasificacion, Modelo, Descripcion, SistemaOperativo, MSOffice, 
                                    Observaciones, NombreEquipo, ContrasenaAdministrador)
                    VALUES  (@EquipoProductoId, @EquipoProductoId ,'${equipo.Equipo}', 1, '${equipo.Modelo}', '${equipo.Descripcion}',
                    NULL, NULL, NULL, NULL, 'OOOO')
                `;
                console.log(query2);
            }

            await pool.request().query(query2);
            
            // Consulta de EquipoAsignación - obtener el próximo producto 
            let proximoEquipoId;

            // Obtener el próximo EquipoAsignacionId
            await pool.request().query(`

                SELECT EquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

            `).then(result => {
                
                proximoEquipoId = parseInt(result.recordset[0].EquipoAsignacionId);
            });

            console.log("valor de: "+proximoEquipoId);
            // Realiza inserción en EquipoAsignación 
            let equipoAsignacionQuery = '';
            // si son muchos
            console.log(req.body);
            if (Array.isArray(req.body)) {

                equipoAsignacionQuery = `
                    DECLARE @ProximoEquipoAsignacionId INT;
                    SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

                    DECLARE @EquipoProductoId INT;
                    SELECT  @EquipoProductoId = ISNULL(MAX(ProductoId), 0) FROM [Servicio].[Producto];
            
                    INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
                    VALUES `;
                    //'${contador2}'
                    //@ProximoProductoId
                let contador2 = proximoEquipoId;
                req.body.forEach((equipo, index) => {
                    equipoAsignacionQuery += ` ('${contador2}',  @EquipoProductoId ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)`;
                    if (index !== req.body.length - 1) {
                        equipoAsignacionQuery += ', ';
                    }
                    contador2 = contador2 + 1;
                    
                });
                console.log(equipoAsignacionQuery);
            } 
            // Si solo es 1
            else {
                const equipo = req.body;
                equipoAsignacionQuery = `
                    DECLARE @ProximoEquipoAsignacionId INT;
                    SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

                    DECLARE @EquipoProductoId INT;
                    SELECT  @EquipoProductoId = ISNULL(MAX(ProductoId), 0) FROM [Servicio].[Producto];
        
                    INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
                    VALUES (@ProximoEquipoAsignacionId,   @EquipoProductoId ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)
                `;
                console.log(equipoAsignacionQuery);
            }
        
            // Insertar en la tabla EquipoAsignacion
            await pool.request().query(equipoAsignacionQuery);

        }
        
    } catch (error) {
        console.error('Error al insertar datos:', error.message);
        rollback = true; // Se activa el rollback si hay un error
        res.status(500).json({ message: 'Error al insertar datos' });
    } 
    //tiene rollback solo que hay que configurarlo bien 
    // finally {
    //     if (rollback) {
    //         // Si se debe realizar rollback, eliminar los registros insertados en todas las tablas
    //         if (proximoProductoId) {
    //             await pool.request().query(`
    //                 DELETE FROM [Servicio].[Producto] WHERE ProductoId >= ${proximoProductoId};
    //             `);
    //         }
    //         if (proximoEquipoIdProducto) {
    //             await pool.request().query(`
    //                 DELETE FROM [Servicio].[Equipo] WHERE EquipoId >= ${proximoEquipoIdProducto};
    //             `);
    //         }
    //         if (proximoEquipoId) {
    //             await pool.request().query(`
    //                 DELETE FROM [Servicio].[EquipoAsignacion] WHERE EquipoAsignacionId >= ${proximoEquipoId};
    //             `);
    //         }

    //         res.status(500).json({ message: 'Error al insertar datos, rollback realizado' });
    //     }else {
    //         res.status(200).json({ message: 'Datos insertados correctamente', reload: true  });
    //     }
    // }
    //version 1 si funciona pero crashea
    finally {
        if (rollback) {
            // Si se debe realizar rollback, eliminar el registro insertado en [Servicio].[Producto]
            await pool.request().query(`
                DELETE FROM [Servicio].[Producto] WHERE ProductoId >= ${proximoProductoId};
            `);

            // Eliminar el registro insertado en [Servicio].[Equipo] si procede
            await pool.request().query(`
                DELETE FROM [Servicio].[Equipo] WHERE EquipoId >= ${proximoEquipoIdProducto};
            `);

            // Eliminar el registro insertado en [Servicio].[EquipoAsignacion] si procede
            await pool.request().query(`
                DELETE FROM [Servicio].[EquipoAsignacion] WHERE EquipoAsignacionId >= ${proximoEquipoId};
            `);

            res.status(500).json({ message: 'Error al insertar datos, rollback realizado' });
        } else {
           res.status(200).json({ message: 'Datos insertados correctamente', reload: true  });
       }
    }


};



// export const postProductos = async (req, res) => {
//     try {
//         const pool = await getConnection();

//         let existeNumeroInventarioArmonizadoQuery = '';
//         let numInvArmCheck = '';
//         if (Array.isArray(req.body)) {
//             req.body.forEach((equipo) => {
//                 existeNumeroInventarioArmonizadoQuery += `
//                     SELECT COUNT(*) AS Total FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${equipo.NumeroInventarioArmonizado}';
//                 `;
//                 numInvArmCheck = equipo.NumeroInventarioArmonizado;
//                 // Aquí puedes ejecutar la consulta SQL
//             });
//         }

//         // Validar si existe el NumeroInventarioArmonizado
//         const existeNumeroInventarioArmonizadoResult = await pool.request().query(existeNumeroInventarioArmonizadoQuery);
//         const existeNumeroInventarioArmonizado = existeNumeroInventarioArmonizadoResult.recordset[0].Total > 0;

//         if (existeNumeroInventarioArmonizado) {
//             const numeroInventarioDuplicadoQuery = `
//                 SELECT * FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${numInvArmCheck}';
//             `;
//             const numeroInventarioDuplicadoResult = await pool.request().query(numeroInventarioDuplicadoQuery);
//             const numeroInventarioDuplicado = numeroInventarioDuplicadoResult.recordset[0];

//             return res.status(400).json({
//                 message: `El Numero de Inventario Armonizado '${numInvArmCheck}' ya está registrado con los siguientes datos '${JSON.stringify(numeroInventarioDuplicado)}', no se puede agregar el inventario hasta que se corrija ese dato.`,
//                 existeDuplicado: true
//             });
//         } else {
//             let query = `
//                 DECLARE @ProximoProductoId INT;
//                 SELECT @ProximoProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

//                 DECLARE @TipoProductoId INT;
//                 SELECT @TipoProductoId = TipoProductoId FROM [Catalogos].[TipoProducto] WHERE TipoProductoDescripcion = 'Equipo';

//                 INSERT INTO [Servicio].[Producto] (ProductoId, Tipo, Marca, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto,
//                     Estado, FechaCompra, FechaVencimientoGarantia, Licitacion, Activo, FHCreado, CreadoPor, FHModificado, ModificadoPor)
//             `;
//             if (Array.isArray(req.body)) {
//                 query += 'VALUES ';
//                 req.body.forEach((equipo, index) => {
                    
//                     const productoId = `@ProximoProductoId${index}`;
//                     query += `(${productoId}, @TipoProductoId, '${equipo.Marca}', '${equipo.NumeroInventario}',
//                         '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}',
//                         '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}',
//                         '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
//                     if (index !== req.body.length - 1) {
//                         query += ', ';
//                     }
//                 });
//             } else {
//                 const equipo = req.body;
//                 query += `VALUES (@ProximoProductoId, @TipoProductoId, '${equipo.Marca}', '${equipo.NumeroInventario}',
//                     '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}',
//                     '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}',
//                     '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
//             }

//             // Insertar en la tabla Producto
//             await pool.request().query(query);

//             let equipoAsignacionQuery = '';
//             if (Array.isArray(req.body)) {
//                 equipoAsignacionQuery = `
//                     DECLARE @ProximoEquipoAsignacionId INT;
//                     SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

//                     INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
//                     VALUES `;
                    
//                 req.body.forEach((equipo, index) => {
//                     const equipoAsignacionId = `@ProximoEquipoAsignacionId${index}`;
//                     equipoAsignacionQuery += `(${equipoAsignacionId}, NULL ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)`;
//                     if (index !== req.body.length - 1) {
//                         equipoAsignacionQuery += ', ';
//                     }
//                 });
//             } else {
//                 const equipo = req.body;
//                 equipoAsignacionQuery = `
//                     DECLARE @ProximoEquipoAsignacionId INT;
//                     SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

//                     INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
//                     VALUES (@ProximoEquipoAsignacionId, NULL ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)
//                 `;
//             }

//             // Insertar en la tabla EquipoAsignacion
//             await pool.request().query(equipoAsignacionQuery);

//             res.status(200).json({ message: 'Datos insertados correctamente' });
//         }

//     } catch (error) {
//         console.error('Error al insertar datos:', error.message);
//         res.status(500).json({ message: 'Error al insertar datos' });
//     }
// };



function formatObject(obj) {
    let formattedObject = '';
    for (const [key, value] of Object.entries(obj)) {
        formattedObject += `${key}: ${JSON.stringify(value, null, 2)},\n`;
    }
    return formattedObject;
}


// export const postProductos = async (req, res) => {
//     try {
//         const pool = await getConnection();

//         // Validar si existe el NumeroInventarioArmonizado
//         const existeNumeroInventarioArmonizadoQuery = `
//             SELECT COUNT(*) AS Total FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${req.body.NumeroInventarioArmonizado}';
//         `;
//         const existeNumeroInventarioArmonizadoResult = await pool.request().query(existeNumeroInventarioArmonizadoQuery);
//         const existeNumeroInventarioArmonizado = existeNumeroInventarioArmonizadoResult.recordset[0].Total > 0;

//         if (existeNumeroInventarioArmonizado) {
//             const numeroInventarioDuplicadoQuery = `
//                 SELECT NumeroInventario FROM [Servicio].[Producto] WHERE NumeroInventarioArmonizado = '${req.body.NumeroInventarioArmonizado}';
//             `;
//             const numeroInventarioDuplicadoResult = await pool.request().query(numeroInventarioDuplicadoQuery);
//             const numeroInventarioDuplicado = numeroInventarioDuplicadoResult.recordset[0].NumeroInventario;

//             return res.status(400).json({ message: `El NumeroInventarioArmonizado '${req.body.NumeroInventarioArmonizado}' ya existe para el número de inventario '${numeroInventarioDuplicado}', no se puede realizar la inserción.` });
//         }

//         // Continuar con la lógica de inserción
//         let query = `
//             DECLARE @ProximoProductoId INT;
//             SELECT @ProximoProductoId = ISNULL(MAX(ProductoId), 0) + 1 FROM [Servicio].[Producto];

//             INSERT INTO [Servicio].[Producto] (ProductoId, Tipo, Marca, NumeroInventario, NumeroInventarioArmonizado, ClaveProducto, 
//                 Estado, FechaCompra, FechaVencimientoGarantia, Licitacion, Activo, FHCreado, CreadoPor, FHModificado, ModificadoPor)
//         `;

//         if (Array.isArray(req.body)) {
//             query += 'VALUES'
//             req.body.forEach((equipo, index) => {
//                 query += `(@ProximoProductoId, '${equipo.Tipo}', '${equipo.Marca}', '${equipo.NumeroInventario}', '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
//                 if (index !== req.body.length - 1) {
//                     query += ', ';
//                 }
//             });
//         } else {
//             const equipo = req.body;
//             query += `VALUES (@ProximoProductoId, '${equipo.Tipo}', '${equipo.Marca}', '${equipo.NumeroInventario}', 
//             '${equipo.NumeroInventarioArmonizado}', '${equipo.ClaveProducto}', '${equipo.Estado}', '${equipo.FechaCompra}', 
//             '${equipo.FechaVencimientoGarantia}', '${equipo.Licitacion}', '${equipo.Activo}', '${equipo.FHCreado}', '${equipo.CreadoPor}', 
//             '${equipo.FHModificado}', '${equipo.ModificadoPor}')`;
//         }

//         // Insertar en la tabla Producto
//         await pool.request().query(query);

//         let equipoAsignacionQuery = '';
//         if (Array.isArray(req.body)) {
//             equipoAsignacionQuery = `
//                 DECLARE @ProximoEquipoAsignacionId INT;
//                 SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];
                
//                 INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
//                 VALUES `;
            
//             req.body.forEach((equipo, index) => {
//                 equipoAsignacionQuery += `(@ProximoEquipoAsignacionId, NULL ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)`;
//                 if (index !== req.body.length - 1) {
//                     equipoAsignacionQuery += ', ';
//                 }
//             });
//         } else {
//             const equipo = req.body;
//             equipoAsignacionQuery = `
//                 DECLARE @ProximoEquipoAsignacionId INT;
//                 SELECT @ProximoEquipoAsignacionId = ISNULL(MAX(EquipoAsignacionId), 0) + 1 FROM [Servicio].[EquipoAsignacion];

//                 INSERT INTO [Servicio].[EquipoAsignacion] (EquipoAsignacionId, Equipo, Area, Permiso, NombrePersonal, IP, FechaAsignacionInicio, Activo)
//                 VALUES (@ProximoEquipoAsignacionId, NULL ,'${equipo.Area}', 1, '${equipo.AsignadoA}', '${equipo.IPEquipo}', GETDATE(), 1)
//             `;
//         }

//         // Insertar en la tabla EquipoAsignacion
//         await pool.request().query(equipoAsignacionQuery);

//         res.status(200).json({ message: 'Datos insertados correctamente' });
//     } catch (error) {
//         console.error('Error al insertar datos:', error.message);
//         res.status(500).json({ message: 'Error al insertar datos' });
//     }
// };
