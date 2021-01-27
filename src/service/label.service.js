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
}

module.exports = new LabelService()