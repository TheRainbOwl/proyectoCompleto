// IMPORTACIONES
const express = require("express") // Nos permite utilizar funciones express.
const app = express() // Usams funcion express
const {render} = require("pug")
const port = 3000  // Puerto para server
const bodyParser = require("body-parser")

// GLOBALES
let usuarioGlobal
const usuarioGlobalCopy = usuarioGlobal
let temporadaConsulta
let compraHecha
let numberId = 0

// ARCHIVOS ESTATICOS
app.use("/views", express.static(__dirname))
app.use("/css", express.static("public/css"))
app.use("/images", express.static("public/images"))
app.use("/logos", express.static("public/logos"))
app.use("/js", express.static("public/js"))
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


// DATABASE

const { Pool } = require("pg");
const { json } = require("body-parser")
const { query } = require("express")
const config = {
    user: "postgres",
    host: "localhost",
    database: "flor",
    password: "3317",
    port: 5432,
};

const pool = new Pool(config)


// PETICIONES

app.get("/", (req, res) => {
	res.render('usuario.pug', {root: __dirname})
});

app.get("/compras", async (req, res) =>{
    const db = await pool.query(`SELECT * FROM "Compra"`)
    const dataCompras = db.rows
    const numberCompras = db.rowCount
    res.render("compras.pug", { root: __dirname, data: dataCompras, size: numberCompras})
})

app.get("/flores", async (req, res) =>{
    let variable = temporadaConsulta
    const db = await pool.query(`SELECT * FROM "Flor" where "Temporada" like '%${variable}%'`)
    const dbRows = db.rows
    const lenght = db.rowCount
    res.render("flores.pug", { root: __dirname,  floresData: dbRows, floresNum : lenght})
})

app.get("/historial", async (req, res) =>{
    const db = await pool.query(`select "Nombre", TO_CHAR(fecha::date, 'dd/mm/yyyy') AS fecha, price, cantidad, usuario from "Flor" INNER JOIN historial ON "ID_Flor" = compras WHERE usuario = ${usuarioGlobal.ID_Usuario}`)
    const data = db.rows
    const size = db.rowCount
    res.render("historial.pug", { root: __dirname, dataHistorial: data, sizeHistorial: size})
})

app.get("/consulta", (req, res) =>{ 
    res.render("consulta.pug", { root: __dirname , nombreUser: usuarioGlobal.Usuario, idUser: usuarioGlobal.ID_Usuario })
})

// CONEXIONES
app.post("/inicio-sesion", async (req, res) =>{
    const usuario = req.body.usuario
    const contrasenia = req.body.contrasenia
    const db = await pool.query(`select * from "Usuarios"`)
    let size =  db.rowCount
    let flag = 0
    for(let i = 0; i < size; i++)
    {
        if(usuario == db.rows[i].Usuario && contrasenia == db.rows[i].Contrasenia)
        {
            usuarioGlobal = db.rows[i]
            flag = 1
            res.redirect("/consulta")                   
        }
    }
    if(flag == 0)
    {
        res.redirect("/")
    }
})

app.post("/temporada-selector", async (req, res) =>{
    const temporada = req.body.temporada
    temporadaConsulta = temporada
    res.redirect("/flores")
})

app.post("/send-compra", async (req, res) =>{
    const compra = req.body
    compraHecha = compra
    const florData = await pool.query(`SELECT * FROM "Flor" WHERE "Nombre" = '${compra.nombre}'`)
    const idFlor = florData.rows[0].ID_Flor
    let priceDB = florData.rows[0].Precio
    let priceTotal = Number(priceDB.replace(/[^0-9\.]+/g, "")) * compra.size
    await pool.query(`INSERT INTO "Compra" VALUES('${compra.nombre}', ${compra.size}, ${priceTotal}, ${idFlor})`)
    res.sendStatus(200)
})

app.post("/accept-compra", async (req, res) =>{
    const aceptadoI = req.body
    const accept = aceptadoI.status
    const dbCompra = await pool.query(`SELECT * FROM "Compra"`)
    const dbRows = dbCompra.rows
    const size = dbCompra.rowCount
    let dbCantidad = parseInt(dbRows[0].Cantidad) 
    console.log(dbCantidad)
    const date = new Date()
    const dateFormated = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() 
    for(let i = 0; i < size; i++){
        await pool.query(`INSERT INTO historial(compras, fecha, usuario, price, cantidad) VALUES(${dbRows[i].ID_flor}, '${dateFormated}', ${usuarioGlobal.ID_Usuario}, ${Number(dbRows[i].Precio.replace(/[^0-9\.]+/g, ""))}, ${dbRows[i].Cantidad})`)
    }
    await pool.query(`DELETE FROM "Compra"`)
    res.sendStatus(200)
})

app.post("/decline-compra", async (req, res) =>{
    await pool.query(`DELETE FROM "Compra"`)
    res.sendStatus(200)
})
// SERVER ESCUCHANDO EN EL PUERTO 3000

app.listen(port, () =>{
    console.log(`Servidor corriendo en: http://localhost:${port}`)
})