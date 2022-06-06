const express = require('express')
const app = express()
app.use(express.json())

let addresses = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(addresses)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const address = addresses.find(address => address.id === id)
    if (address) {
        response.json(address)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    addresses = addresses.filter(address => address.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const maxId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const address = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }
    addresses = addresses.concat(address)
    response.json(address)
})



app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${addresses.length} people</p>\n ${date}`)
})



const PORT = 3001
app.listen(PORT)
console.log(`server running on port: ${PORT}`)


