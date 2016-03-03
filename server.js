'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const ws = require('socket.io')(server)
const pg = require('pg').native

const PORT = process.env.PORT || 3000
const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://localhost:5432/nodechat'

const db = new pg.Client(POSTGRES_URL)

app.set('view engine', 'jade')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/chats', (req, res) => {
  // gets db from pg.connect
   db.query(`SELECT * FROM chats`, (err, result) => {
    if (err) throw err
    res.send(result.rows)
  })
})

db.connect((err) => {
  if (err) throw err
  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
  })
})

ws.on('connection', socket => {
  console.log('server socket connected', socket.id)

  db.query(`SELECT * FROM chats`, (err, result) => {
    if (err) throw err
    socket.emit('receiveChat', result.rows)
  })


  socket.on('sendChat', msg => {
    socket.broadcast.emit('receiveChat', [msg])
  })
})
