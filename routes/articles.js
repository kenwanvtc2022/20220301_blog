// This file will define the API route handlers for Articles
const Router = require('koa-router')
// We are going to parse request bodies so import koa-bodyparser
const bodyParser = require('koa-bodyparser')
// Since we are handling articles use a URI that begins with an appropriate path
const router = Router({prefix: '/api/v1/articles'})

const model = require('../models/articles')

const {validateArticle} = require('../controllers/validation')

// Temporarily define some random articles in an array.
// Later this will come from the DB.

/*
let articles = [ 
  {title:'hello article', fullText:'some text here to fill the body'},
  {title:'another article', fullText:'again here is some text here to fill'},
  {title:'coventry university ', fullText:'some news about coventry university'},
  {title:'smart campus', fullText:'smart campus is coming to IVE'}
]
*/

// Routes are needed to connect path endpoints to handler functions.
// When an Article id needs to be matched we use a pattern to match
// a named route parameter. Here the name of the parameter will be 'id'
// and we will define the pattern to match at least 1 numeral.

router.get('/', getAll)
router.post('/', bodyParser(), validateArticle, createArticle)
router.get('/:id([0-9]{1,})', getById)
//router.put('/:id([0-9]{1,})', updateArticle)
//router.del('/:id([0-9]{1,})', deleteArticle)

router.get('/m', getAllM)
router.get('/m/:id([0-9]{1,})', getByIdM)
router.post('/m', bodyParser(), createArticleM)


async function getAll(ctx){
  let articles = await model.getAll()
  if(articles.length){
    ctx.body = articles
  }
}

async function getById(ctx){
  let id = ctx.params.id
  let article = await model.getById(id)
  if(article.length) {
    ctx.body = article[0]
  }
}

async function createArticle(ctx){
  const body = ctx.request.body
  let result = await model.add(body)
  if(result){
    ctx.status = 201
    ctx.body = {ID: result.insertId}
  }
}

async function getAllM(ctx) {
  let articles = await model.getAllMongo()
  if(articles){
    ctx.body = articles
  }
}

async function getByIdM(ctx){
  let id = ctx.params.id
  let article = await model.getByIdMongo(id)
  if(article.length) {
    ctx.body = article[0]
  }
}

async function createArticleM(ctx){
  const body = ctx.request.body
  let result = await model.addMongo(body)
  if(result){
    ctx.status = 201
    ctx.body = result
  }
}

// Now we define the handler functions used above.

/*
function getAll(cnx, next){  
  // Use the response body to send the articles as JSON.
  cnx.body = articles
}  

function getById(cnx, next){
  // Get the ID from the route parameters.
  let id = cnx.params.id

  // If it exists then return the article as JSON.
  // Otherwise return a 404 Not Found status code
  if ((id < articles.length+1) && (id > 0)) {
    cnx.body = articles[id-1]
  } else {
    cnx.status = 404
  }
}

function createArticle(cnx, next) {
  // The body parser gives us access to the request body on cnx.request.body.
  // Use this to extract the title and fullText we were sent.
  let {title, fullText} = cnx.request.body
  // In turn, define a new article for addition to the array.
  let newArticle = {title:title, fullText:fullText}
  articles.push(newArticle)
  // Finally send back appropriate JSON and status code.
  // Once we move to a DB store, the newArticle sent back will now have its ID.
  cnx.status = 201
  cnx.body = newArticle
}  

function updateArticle(cnx, next){  
  let id = cnx.params.id
  if ((id < articles.length) && (id > 0)) {
    articles[id-1] = {title:title, fullText:fullText}
    cnx.status = 201
    cnx.body = articles[id-1]
  } else {
    cnx.status = 404
  } 
}  

function deleteArticle(cnx, next){  
  let id = cnx.params.id
  if ((id < articles.length) && (id > 0)) {
    articles.slice(id-1, 1)
    cnx.status = 201
    cnx.body = articles
  } else {
    cnx.status = 404
  } 
}  
*/

// Finally, define the exported object when 'require'd from other scripts. 
module.exports = router
