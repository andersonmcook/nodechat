'use strict'

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('hey')
})

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})






