const db = require('../app/database')

class CommentService {
    async create(comment) {
        try {
            let { moment_id, user_id, content, comment_id } = comment
            if (!comment_id) comment_id = null  
            const sql = 'INSERT INTO comment(moment_id, user_id, content, comment_id) VALUES (?, ?, ?, ?)'
            const [ result ] = await db.execute(sql, [moment_id, user_id, content, comment_id])

            return result 
        } catch (err) {
            console.log(err)
        }
        
    }

    async update(commentId, content) {
        try {
            const sql = `UPDATE comment SET content = ? WHERE id = ?;`
            const [ result ] = await db.execute(sql, [content, commentId])
            return result
        } catch(err) {
            console.error(err)
        }
    }

    async remove(commentId) {
        try {
            const sql = `DELETE FROM comment WHERE id = ?;`
            const [ result ] = await db.execute(sql, [commentId])
            // console.log(result, 'reslut')
            return result
        } catch(err) {
            console.error(err)
        }
    }

    async list(momentId) {
 
        try {
            const sql = `
                SELECT 
                    c.id AS id, c.content AS content, c.createAt AS createTime, c.comment_id AS comment_id, c.to_id AS to_id,
                    JSON_OBJECT('id', u.id, 'username', u.name) user,
                    (SELECT JSON_OBJECT('id', tou.id, 'username', tou.name) WHERE tou.id is not null) reply_to 
                FROM comment AS c
                    LEFT JOIN users AS u on c.user_id = u.id
                    LEFT JOIN users AS tou on c.to_id = tou.id
                WHERE c.moment_id = 3;
            `
            const [result] = await db.execute(sql, [momentId])

            return result 
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new CommentService()