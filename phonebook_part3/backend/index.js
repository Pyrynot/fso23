require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require('cors')
const Person = require('./models/person')


app.use(express.json())
morgan.token("req-body", (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req-body'))
app.use(cors())
app.use(express.static('dist'))

let numbers = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]


app.get('/api/persons', (req, res) => {
  Person.find({}).then(numbers => {
    res.json(numbers)
  })
})



app.get("/info", (req, res) => {
    
    const x = numbers.length
    const time = new Date()

    const info = `Phonebook has info for ${x} people<br><br>${time}`

    console.log(info)
    res.send(info) 
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const x = numbers.find(x => x.id === id)
  
  if (x) {
    response.json(x)
  } else {
    response.status(404).end()
  }
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  numbers = numbers.filter(x => x.id !== id)

  response.status(204).end()
})

function generateId(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
