import { useMutation, useQuery } from "@apollo/client"
import { ObjectId } from "mongodb"
import { useEffect, useState } from "react"
import { DELETE_TODO, FETCH_TODO } from "../graphql/Queries"
import HandleTodo from "./HandleTodo"
interface Task {
  task: string,
  deadline: string,
  _id: string | ObjectId
}
interface Data {
  getTasks?: Task[],
}

const ShowTodos = () => {
  const [ renderUpdate, setRenderUpdate ] = useState(false);
  const { data } = useQuery<Data>(FETCH_TODO);
  const [ deleteTask, { data: deletedTask }] = useMutation<Task>(DELETE_TODO);
  if(deletedTask) location.reload();
  const [ tasks, setTasks ] = useState<Task[]>([]);
  useEffect(() => {
    if(data?.getTasks) setTasks(data.getTasks);
  }, [data])
  
  // Debug log 
  useEffect(() => {
    // console.log(tasks);
  }, [tasks])

  const updateT = async() => {
    setRenderUpdate(!renderUpdate);
  }
  const deleteT = async(_id:String | ObjectId) => {
    await deleteTask({variables: {id:_id}});
  }

  return (
    <div>{
      tasks.map((task) => {
        return (
          <div key = {task._id+""} className="flex-col border-2 rounded-md m-5 p-5">
            <div className = "flex gap-2">
            <h3 className="text-black">Task: </h3>
            <span className="text-cyan-600">{task.task}</span>
            </div>
            <div className="flex gap-2">
            <h3 className="text-black">Dealine:</h3>
            <span className="text-cyan-600">{task.deadline}</span>
            </div>
            {
              renderUpdate && <HandleTodo task_={task.task} deadLine_ = {task.deadline} _id = {task._id} update = {true}></HandleTodo>
            }
            <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded" onClick={(e) => { deleteT(task._id) }}>Delete</button>
            <button className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={ updateT }>Update</button>
          </div>
        )
      })  
    }
    </div>
  )
}

export default ShowTodos