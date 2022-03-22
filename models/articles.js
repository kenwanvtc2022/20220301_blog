const db = require('../helpers/database')
const dbMongo = require('../helpers/mongodb')

//get a single article by its id
exports.getById = async function getById(id){
  let query = 'select * from articles where id = ?'
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

//list all the articles in the database
exports.getAll = async function getAll(page, limit, order) {
  let query = "select * from articles"
  let data = await db.run_query(query)
  return data
}

//create a new article in the database
exports.add = async function add(article){
  let keys = Object.keys(article)
  let values = Object.values(article)
  keys = keys.join(',')
  let parm = ''
  for(i=0; i<values.length; i++) {
    parm += '?,'
  }
  parm = parm.slice(0,-1)
  let query = `INSERT INTO articles (${keys}) VALUES (${parm})`
  try {
    await db.run_insert(query, values)
    return {'status':201}
  } catch(error) {
    return error
  }
}

exports.getByIdMongo = async function getByIdMongo(id){
  let data = await dbMongo.run_query('articles', {'authorID': parseInt})
  return data
}

exports.getAllMongo = async function getAllMongo(page, limit, order) {
  let data = await dbMongo.run_query('articles', {})
  return data
}

exports.addMongo = async function addMongo(id){
  let data = await dbMongo.run_insert('articles', doucment)
  return status
}
