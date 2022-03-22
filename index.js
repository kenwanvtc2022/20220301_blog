const Koa = require('koa')
// const Router = require ('koa-router')

const app = new Koa()
// const router = new Router()

/*
 * Define route handler(s):
 * 
 * This means we connect HTTP methods: GET, POST, ...
 * and URI paths: /some/uri/path
 * to JavaScript functions that handle the request.
 * 
 * Once defined we then add them to the app object.
*/

// app.use(router.routes())

// Define the actual handler functions

/*
function welcomeAPI(ctx, next) {
  ctx.body = {
    message: "Welcome to the blog API!"
  }
}
*/

// router.get('/api/v1', welcomeAPI)
const articles = require('./routes/articles')
const special = require('./routes/special')
app.use(articles.routes())
app.use(special.routes())


// Finally, run the app as a process on a given port

let port = process.env.PORT || 10888
app.listen(port)

