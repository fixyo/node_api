const db = require('../app/database')

class LabelService {
    async create (name) {
        try {
            const sql =  `INSERT INTO label(name) VALUES(?);`
            const [result] = await db.execute(sql, [name])
            return result 
        } catch (err) {
            console.error(err)
        }
    }

    async getLabelByName(name) {
        try {
            const sql = `SELECT * FROM label WHERE name = ?`
            const [result] = await db.execute(sql, [name])

            return result[0]
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new LabelService()