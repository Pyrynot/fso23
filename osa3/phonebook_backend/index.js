const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())
morgan.token("req-body", (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req-body'))

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


app.get("/api/persons", (req, res) => {
  res.json(numbers);
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


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const existsAlready = numbers.find(({ name }) => name === body.name)
  if (existsAlready) {

    return response.status(400).json({
      error: 'name already exists'
    })
  }

  const number = {
    name: body.name,
    number: body.number,
    id: generateId(1, 2000)
  }


  numbers = numbers.concat(number)

  response.json(number)
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
