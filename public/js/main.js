;(function () {
  'use strict'

  const ws = io.connect()

  ws.on('connect', () => {
    console.log('browser socket connected')
  })

  ws.on('receiveChat', msgs => {
    msgs.forEach(displayChat)
  })

  const form = document.querySelector('form')
  const name = document.querySelector('input[name="name"]')
  const text = document.querySelector('input[name="text"]')
  const ul = document.querySelector('ul')

// listen for submit, run displayChat, reset text value, prevent page reload
  form.addEventListener('submit', () => {
    const chat = {name: name.value, text: text.value}
    ws.emit('sendChat', chat) // before because displayChat resets text.value
    // displayChat(chat)
    text.value = ''
    event.preventDefault()
  })

// display chat on page, but not if it already exists on client side
// should probably use local storage instead of dom
  function displayChat (chat) {
    if (!document.querySelector(`[data-id="${chat._id}"`)) {
      const li = generateLI(chat)
      ul.appendChild(li)
    }
  }

// generate list item
  function generateLI (chat) {
    const li = document.createElement('li')
    const textNode = document.createTextNode(`${chat.name}: ${chat.text}`)
    const dataId = document.createAttribute('data-id')
    dataId.value = chat._id
    li.setAttributeNode(dataId)
    li.appendChild(textNode)
    return li
  }

// get JSON from POSTGRES
  function getJSON (url, cb) {
    const request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = () => {
      cb(JSON.parse(request.responseText))
    }
    request.send()
  }

})();
