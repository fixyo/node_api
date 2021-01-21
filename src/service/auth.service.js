const db = require('../app/database')

class AuthService {
    async checkMomentPermission(momentId, userId) {
        try {
            const sql = 'SELECT * FROM moment WHERE id = ? AND userid = ?'
            const [result] = await db.execute(sql, [momentId, userId])
            return result.length ? true : false 
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new AuthService() 