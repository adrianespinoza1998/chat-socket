const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('../routes/usuarioRoutes');

const {dbConnection} = require('../database/config');

class Server {

    constructor(){

        //Inicializar express
        this.app = express();

        this.port = process.env.PORT;

        //Rutas de la api
        this.path = {
            usuarios : '/api/usuarios',
            mensajes : '/api/mensajes'
        }

        //Conectar la base de datos
        this.dbConnnect();

        //Inicializar middlewares al llamar la instancia de server
        this.middlewares();

        //Inicializar las rutas al llamar la instancia de server
        this.routes();
    }

    middlewares() {
        //Carpeta publica
        this.app.use(express.static('public'));

        //Habilitar acceso de otros dispositivos
        this.app.use( cors());

        //Lectura y escritura en JSON
        this.app.use( express.json());
    }

    routes() {
        this.app.use(this.path.usuarios, usuarioRoutes);
    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log(`Escuchando el puerto ${this.port}`);
        });
    }

    async dbConnnect() {
        await dbConnection();
    }

}

module.exports = Server;