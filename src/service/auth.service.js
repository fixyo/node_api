const db = require('../app/database')

class AuthService {
    async checkPermission(tableName, id, userId) {
        try {
            const sql = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
            const [result] = await db.execute(sql, [id, userId])
            return result.length ? true : false 
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new AuthService() 