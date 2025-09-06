import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Row from './Row.jsx'

const url = "http://localhost:3001"

function App() {
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get(url)
        .then(response => {
            setTasks(response.data)
        })
        .catch(error => {
            alert(error.response.data ? error.response.data.message : error)
        })
    }, [])

    const addTask = () => {
        const newTask = { description: task }

        axios.post(url + "/create", { task: newTask })
        .then(response => {
            setTasks([...tasks, response.data])
            setTask("")
        })
        .catch(error => {
            alert(error.response ? error.response.data.error.message : error)
        })
    }

    const deleteTask = (deleted) => {
        axios.delete(url + "/delete/" + deleted)
        .then(response => {
            setTasks(tasks.filter(item => item.id !== deleted))
        })
        .catch(error => {
            alert(error.response ? error.response.data.error.message : error)
        })
    }

    return (
  <div className="App">
    <h2>Todos</h2>

    <input
      type="text"
      placeholder="Add new task"
      value={task}
      onChange={(e) => setTask(e.target.value)}
    />
    <button onClick={addTask}>Add</button>

    <ul>
  
      {
      tasks.map(item => (
      <Row item={item}key={item.id} deleteTask={deleteTask}/>
      ))
  }
    </ul>
  </div>
)
}
export default App
