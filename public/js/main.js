;(function () {
  'use strict'

  const ws = io.connect()

  ws.on('connect', () => {
    console.log('browser socket connected')
  })

  ws.on('receiveChat', msg => {
    console.log(msg)
    displayChat(msg.name, msg.text)
  })

  const form = document.querySelector('form')
  const name = document.querySelector('input[name="name"]')
  const text = document.querySelector('input[name="text"]')
  const ul = document.querySelector('ul')

// listen for submit, run displayChat, reset text value, prevent page reload
  form.addEventListener('submit', () => {
    const [n, t] = [name.value, text.value]
    ws.emit('sendChat', { name: n, text: t}) // before because displayChat resets text.value
    displayChat(n, t)
    text.value = ''
    event.preventDefault()
  })

// display chat on page
  function displayChat (name, text) {
    const li = generateLI(name, text)
    // text.value = ''
    ul.appendChild(li)
  }

// generate list item
  function generateLI (name, text) {
    const li = document.createElement('li')
    const textNode = document.createTextNode(`${name}: ${text}`)
    li.appendChild(textNode)
    return li
  }

})();
