const db = require('../app/database')
class MomentService {
    async create(userid, content) {
        const sql = `INSERT INTO moment(userid, content) VALUES (?, ?);`
        const [result] = await db.execute(sql, [userid, content])

        if (result && result.affectedRows === 1) {
            return result 
        }
    }
    async getMomentList(offset, size) {
        console.log(offset, size)
        const sql = `
            SELECT 
                m.id AS id, m.content AS content, m.createAt AS createTime, m.updateAt AS updateTime, 
                JSON_OBJECT('id', u.id, 'username', u.name) user 
            FROM moment AS m
            LEFT JOIN users AS u ON m.userid = u.id
            LIMIT ?, ?;
        `
        const [ result ] = await db.execute(sql, [offset, size])

        return result 
    }

    async getMomentById(id) {
        const sql = `
            SELECT 
                m.id AS id, m.content AS content, m.createAt AS createTime, m.updateAt AS updateTime, 
                JSON_OBJECT('id', u.id, 'username', u.name) user 
            FROM moment AS m
            LEFT JOIN users AS u ON m.userid = u.id
            WHERE m.id = ?;
        `
        const [ result ] = await db.execute(sql, [id])

        return result[0] 
    }

    async updateMoment(momentId, content) {
        try {
            const sql = `UPDATE moment SET content = ? WHERE id = ?;`
            const [result] = await db.execute(sql, [content, momentId])
            // console.log(result, 'result')
            return result 
        } catch (err) {
            console.error(err)
        }
    }

    async removeMoment(momentId) {
        try {
            const sql = `DELETE FROM moment WHERE id = ?;`
            const [ result ] = await db.execute(sql, [momentId])
            return result 
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new MomentService()