import { useEffect, useState } from "react";
import { TodoContextProvider } from "./contexts";
import { TodoForm,TodoList } from "./components";

function App() {
  const [todos,setTodos] = useState([])
  const addTodo = (todo)=>{
    setTodos((prevTodos)=>[{id:Date.now(),... todo},...prevTodos])
  }
  const updateTodo = (id,newTodo)=>{
    setTodos((prevTodos)=>prevTodos.map((todo)=>{
      if (todo.id===id){
        console.log("OldTodo",todo)
        todo.todo = newTodo.todo
        todo.completed = newTodo.completed
        console.log("NewTodo",todo)
        return todo   
      }
      return todo;
    })
    )
  }
  const deleteTodo= (id) =>{
    // TAKE ID
    // iterate over the todos, find that id and delete
    setTodos((prevTodos)=>{
      let newTodos= prevTodos.filter((todo)=>{
        if (todo.id != id) return todo
      })
      return newTodos
    })
  }
  const toggleComplete = (id)=>{
    setTodos((prevTodos)=>prevTodos.map((todo)=> todo.id == id ? {...todo,completed: !todo.completed} : todo ))
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length>0){ setTodos(todos)}

  },[]);

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))  

  },[todos]);
  return (
    <TodoContextProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {
                          todos.map((todo)=>{
                            return <div key={todo.id} className="w-full">
                              <TodoList todo={todo} />
                            </div>
                          })
                        }
                    </div>
                </div>
            </div>
    </TodoContextProvider>
  );
}

export default App;
