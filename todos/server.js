const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')

app.use(express.json())

const todos = [
  {
    name: 'The name',
    description: 'The description of the todo',
    imageUrl: 'http://www.myimage....',
    completed: false,
    _id: uuidv4(),
  },
]

app.get('/todos', (req, res) => {
  res.send(todos)
})

app.post('/todos', (req, res) => {
  const newTodo = req.body
  newTodo._id = uuidv4()
  todos.push(newTodo)
  res.send(`Successfully added ${newTodo.name} to the database`)
})

app.put('/todos/:todoId', (req, res) => {
  const todoId = req.params.todoId
  const updateObject = req.body
  const todoIndex = todos.findIndex((todo) => todo._id === todoId)
  const updatedTodo = Object.assign(todos[todoIndex], updateObject)
  res.send(`successfully updated ${updatedTodo.name}`)
})

app.delete('/todos/:todoId', (req, res) => {
  const todoId = req.params.todoId
  const todoIndex = todos.indexOf((todo) => todo._id === todoId)
  todos.splice(todoIndex, 1)
  res.send('successfully deleted todo')
})

app.get('/todos/:todoId', (req, res) => {
  const todoId = req.params.todoId
  const filteredTodo = todos.filter((todo) => todo._id === todoId)
  res.send(filteredTodo)
})

app.listen(9000, () => {
  console.log('app is running on port 9000')
})
