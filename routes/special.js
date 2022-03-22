const Router = require ('koa-router')
const bodyParser = require('koa-bodyparser')
const auth = require('../controllers/auth')

const router = new Router({prefix: '/api/v1'})

router.get('/', publicAPI)
router.get('/private', auth, privateAPI)

function publicAPI(ctx, next) {
  ctx.body = {
    message: "Public API!"
  }
}

function privateAPI(ctx) {
  const user = ctx.state.user
  ctx.body = {
    message: `Hello, ${user.username}. You registered on ${user.dateregistered}`
  }
}

module.exports = router