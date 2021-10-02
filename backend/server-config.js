import express from 'express'
import bodyParser from 'body-parser'
import MongoDB from './persistence/MongoDB.js'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

export default {
    app,
    db: MongoDB(),
}
