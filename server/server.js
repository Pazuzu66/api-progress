const express = require('express')
const cors = require('cors')
const { dbConection } = require('../database/config')

class Server {
    constructor() {
        //Creation of app with express
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            auth:       '/api/auth',
            progress:   '/api/progress',
            user:       '/api/user',
            role:       '/api/role'
        }

        //Func to Connect DB
        this.conectDB()

        this.middlewares()

        this.routes()

    }

    async conectDB() {
        await dbConection()        
    }

    middlewares() {
        //CORS
        this.app.use( cors() )
        //Read and Parse of request from body
        this.app.use( express.json() )        
    }

    routes() {
        this.app.use(this.paths.role,   require('../routes/role.routes'))
        this.app.use(this.paths.auth,   require('../routes/auth.routes'))
        this.app.use(this.paths.user,   require('../routes/user.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App Listening at http://localhost:${this.port}`);
        } )
    }
}

module.exports = Server
