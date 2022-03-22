// 1. Connect to the database
// 2. Run SQL then end the connection
const {Sequelize, QueryTypes} = require('sequelize')
const info = require('../config')

exports.run_query = async function run_query(query, values){
  try{
    const sequelize = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)
    await sequelize.authenticate() // Make Connection
    let data = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.SELECT
    }) // Execute SQL (Query)
    await sequelize.close() // Close Connection
    return data
  } catch(error){
    console.error(error, query, values)
    throw 'Database query error'
  }
}

exports.run_insert = async function run_insert(sql, values){
  try{
    const sequelize = new Sequelize(`postgres://${info.config.user}:${info.config.password}@${info.config.host}:${info.config.port}/${info.config.database}`)
    await sequelize.authenticate() // Make Connection
    console.log('start '+values)
    let data = await sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.SELECT
    }) // Execute SQL (Insert)
    console.log('end')
    await sequelize.close() // Close Connection
    console.log('return')
    return data
  } catch(error){
    console.error(error, sql, values)
    throw 'Database query error'
  }
}