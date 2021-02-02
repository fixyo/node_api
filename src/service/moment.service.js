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
                JSON_OBJECT('id', u.id, 'username', u.name) user,
                (SELECT COUNT(*) FROM comment AS c WHERE c.moment_id = m.id) commentCount
            FROM moment AS m
            LEFT JOIN users AS u ON m.user_id = u.id
            LIMIT ?, ?;
        `
        const [ result ] = await db.execute(sql, [offset, size])

        return result 
    }

    async getMomentById(id) {
        // SELECT 
        //     m.id AS id, m.content AS content, m.createAt AS createTime, m.updateAt AS updateTime, 
        //     JSON_OBJECT('id', u.id, 'username', u.name) user 
        // FROM moment AS m
        // LEFT JOIN users AS u ON m.user_id = u.id
        // WHERE m.id = ?;
        try {
            // const sql = `
            //         SELECT 
            //         m.id AS id, m.content AS content, m.createAt AS createTime, m.updateAt AS updateTime,
            //         JSON_OBJECT('id', u.id, 'username', u.name) user,
            //         IF(COUNT(c.id), 
            //             JSON_ARRAYAGG(
            //                 JSON_OBJECT('id', c.id, 'content', c.content,'createTime', c.createAt, 'updateTime', c.updateAt,
            //                         'user', JSON_OBJECT('id', cu.id, 'username', cu.name)
            //                 )
            //             )
            //         , NULL) comments,
            //         IF (COUNT(l.id),
            //             JSON_ARRAYAGG(
            //                 JSON_OBJECT('id', l.id, 'name', l.name)
            //             )
            //         , NULL) labels,
            //         (SELECT COUNT(*) FROM comment AS c WHERE c.moment_id = m.id) commentCount
            //     FROM moment AS m
            //     LEFT JOIN users AS u ON m.user_id = u.id
            //     LEFT JOIN comment AS c ON c.moment_id = m.id
            //     LEFT JOIN users AS cu on c.user_id = cu.id
            //     LEFT JOIN moment_label AS ml ON ml.moment_id = m.id
            //     LEFT JOIN label AS l ON ml.label_id = l.id 
            //     WHERE m.id = ?;
            // `
            const sql = `
                SELECT 
                    m.id AS id, m.content AS content, m.createAt AS createTime, m.updateAt AS updateTime,
                    JSON_OBJECT('id', u.id, 'username', u.name, 'avatar', u.avatar_url) user,
                    ( 
                        SELECT IF(COUNT(c.id), 
                            JSON_ARRAYAGG(
                                JSON_OBJECT('id', c.id, 'content', c.content,'createTime', c.createAt, 'updateTime', c.updateAt,
                                    'user', JSON_OBJECT('id', cu.id, 'username', cu.name, 'avatar', cu.avatar_url)
                                )
                            ), NULL)
                        FROM comment AS c LEFT JOIN users AS cu ON c.user_id = cu.id WHERE m.id = c.moment_id
                    )	comments,
                    IF (COUNT(l.id),
                        JSON_ARRAYAGG(
                            JSON_OBJECT('id', l.id, 'name', l.name)
                        )
                    , NULL) labels,
                    (SELECT COUNT(*) FROM comment AS c WHERE c.moment_id = m.id) commentCount,
                    (SELECT JSON_ARRAYAGG(CONCAT('/moment/images/', file.filename)) FROM file WHERE m.id = file.moment_id) images
                FROM moment AS m
                LEFT JOIN users AS u on m.user_id = u.id
                LEFT JOIN moment_label AS ml ON ml.moment_id = m.id
                LEFT JOIN label AS l ON ml.label_id = l.id 
                WHERE m.id = ?;
            `
            const [ result ] = await db.execute(sql, [id])

            return result[0]
        } catch(err) {
            console.error(err)
        }
       
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

    async isLabelExistsAlready(momentId, labelId) {
        try {
            const sql = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
            const [result] = await db.execute(sql, [momentId, labelId])
            return result[0] ? true : false 
        } catch (err) {
            console.error(err)
        }
    }

    async addLabel(momentId, labelId) {
        try {
            const sql = `INSERT INTO moment_label(moment_id, label_id) VALUES(?, ?);`
            const [result] = await db.execute(sql, [momentId, labelId])
            return result
        } catch (err) {
            console.error(err)
        }
    }

    
}

module.exports = new MomentService()