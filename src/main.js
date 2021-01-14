const app = require('./app')
const config = require('./app/config')

app.listen(config.APP_PORT, () => {
    console.log(`api server starts successfully on ${config.APP_PORT}`)
})