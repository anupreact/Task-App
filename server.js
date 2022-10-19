const jsonServer = require("json-server")
const cors = require("cors")
const { default: App } = require("./src/App")
const server = jsonServer.create()
const router = jsonServer.router("./db.json")
const middlewares = jsonServer.defaults({
    static : "./build"
})

const port = process.env.PORT || 5012

server.use(middlewares)

server.use(
    jsonServer.rewriter({
        "/api/*":"/$1"
    })
)
server.use(router)
server.use(cors())
server.listen(port , ()=>{
    console.log(`server running on ${port}`)
})