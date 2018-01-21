const express = require('express')

const app = express()
const http = require('http').Server(app)
const wrap = require('co-express')
const compression = require('compression')

const ProjectMentions = require('../twithub-api')

const port = 1024

app.use(compression({
    threshold: 0,
    level: 9,
    memLevel: 9
}))

app.get('/api/twithub/status', wrap(function * (req, res) {
    res.json({
        type: 'success',
        status: 200,
        results: "OK"
    })
}))

app.get('/api/twithub/search', wrap(function * (req, res) {
    try {
        const projectMentions = new ProjectMentions()
        const tweets = yield projectMentions.get()
        res.json({
            type: 'success',
            status: 200,
            results: tweets
        })
    } catch (err) {
        console.log(err)
        res.json({
            type: 'error',
            status: 500,
            msg: err
        })
    }
}))

http.listen(port, () => {
    console.log(`TwitHub started, please visit: http://localhost:${port}/api/twithub/search`)
})
