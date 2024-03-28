import './App.css'
import ShowTodos from './components/ShowTodos'
import HandleTodo from './components/HandleTodo'
function App() {
  return <div>
    <HandleTodo task_='' deadLine_='' update = {false}/>
    <ShowTodos/>
  </div>
}

export default App
