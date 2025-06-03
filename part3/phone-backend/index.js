const express = require('express')
const app = express()

//app.use(express.json()) // to use for post requests

// hardcoded data
let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// API ROUTES

// GET all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// GET a single person
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// GET info about the phonebook
app.get('/info', (request, response) => {
    const numEntries = persons.length
    response.send(
        `<p>Phonebook has info for ${numEntries} people</p> 
                <p>${new Date()}</p>`
    )
})

// DELETE a person
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    console.log("Deleted person with id: " + id)
    response.status(204).end()
})

// Finally we need to start our server
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})