const db = require('../app/database')
// const userRouter = require('../router/user.router')

class FileUpload {
    async saveUploadFileInfo({ filename, size, user_id, mimetype }) {
        console.log(filename, size, user_id, mimetype)
        try {
            const sql = 'INSERT INTO avatar (filename, size, user_id, mimetype) VALUES (?, ?, ?, ?);'
            const [result] = await db.execute(sql, [filename, size, user_id, mimetype])
            return result
        } catch (err) {
            console.log(err)
        }
        
    }

    async saveUploadPictureInfo({ filename, size, user_id, mimetype, momentId }) {
        try {
           const sql = `INSERT INTO file(filename, size, user_id, mimetype, moment_id) VALUES (?, ?, ?, ?, ?);`
           const [result] = await db.execute(sql, [filename, size, user_id, mimetype, momentId]) 
           return result[0]
        } catch (err) {
            console.error(err)
        }
    }

    async getAvatarByUserId(userId) {
        try {
            const sql = `SELECT * FROM avatar WHERE user_id = ?;`
            const [result] = await db.execute(sql, [userId])
            console.log(result[0])
            return result[0]
        } catch (err) {
            console.error(err)
        }
    }

    async getPictureByFilename(filename) {
        console.log('execute 999')
        try {
           const sql = `SELECT * FROM file WHERE filename = ?;`
           const [result] = await db.execute(sql, [filename]) 
           return result[0]
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = new FileUpload()