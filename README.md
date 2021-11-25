
# Proyecto Softwae

## Instrucciones
Primeramente lo que debes de tener instalado para poder correr el programa son las siguientes cosas:


[NodeJs](https://nodejs.org/en/download/)

[PostgreSQL](https://www.enterprisedb.com/software-downloads-postgres)


**Nota:** Si no sabes como importar la base de datos, aqui te dejo un link:
[Importar base de datos PostgreSQL](https://www.youtube.com/watch?v=icEvkyIXqug)

Posteriormente despues de instalar los paquetes de arriba, hay que situarnos en la carpeta desde consola para poder instalar los paquetes necesarios para que funcione el software:

### Express
```bash
    npm install express
```
### Pug
```bash
    npm install pug --save
```
### Nodemon
 
```bash
    npm install nodemon -D
```

### Postgres (PG)
```bash
    npm i express pg
```
### Body Parser
```bash
    npm install body-parser --save
```

Ya que se llegó a este punto, se tiene que cambiar la contraseña, el usuario y el nombre de la base de datos del código para poder acceder a la base de datos de tu computadora. Esto es posible ingresando al archivo: **app.js** y en donde venga este pedazo de código **(especificamente en la línea 26)**:
```bash
// DATABASE
const { Pool } = require("pg");
const { json } = require("body-parser")
const { query } = require("express")
const config = {
    user: "postgres", <--- Cambialo por tu usuario PostgreSQL.
    host: "localhost",
    database: "flor", <--- Cambialo por el nombre que le diste a la base de datos cuando la importaste.
    password: "3317", <--- Cambialo por tu contraseña de PostgreSQL.
    port: 5432,
};
```
Cabia lo que mencionamos arriba y todo debería de ir correctamente,

Ya para finalizar para iniciar el sotware se hace con el siguiente comando:
```bash
npm run dev
```
Ahora ve a tu navegador y en la barra de direcciones escribe: *localhost:3000* pulsa enter y ingresarás a la pagina.

**Nota:** El comando de arriba se escribe en la consola/terminal de tu computadora como lo es PowerShell, al igual que todos los comandos anteriores que inician con *npm*.
