const db = require('../helpers/database')

exports.findByUsername = async function getByUsername(username) {
  const query = 'select * from users where username = ?'
  let values = [username]
  const user = await db.run_query(query, values)
  return user
}