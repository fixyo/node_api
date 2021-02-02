
const db = require('../app/database')
class UserService {
    async create(user) {
        const { name, password } = user 
        const sql = `INSERT INTO users (name, password) VALUES (?, ?);`
        const result = await db.execute(sql, [name, password])

        return result 
    }

    async getUserByName(name) {
        const sql  = `SELECT * FROM users WHERE name = ?`
        const result = await db.execute(sql, [name])

        return result[0]
    }

    async updateUserAvatarUrl(path, user_id) {
        const sql =  `UPDATE users SET avatar_url = ? WHERE id = ?;`

        const [result] = await db.execute(sql, [path, user_id])

        return result 
    }
}

module.exports = new UserService()