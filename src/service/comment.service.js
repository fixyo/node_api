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
            
            return result
        } catch(err) {
            console.error(err)
        }
    }
}

module.exports = new CommentService()