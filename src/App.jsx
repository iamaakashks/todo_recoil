import React, { useState } from "react";



function App() {
  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white flex justify-center items-start p-6">
      <TodoApp />
    </div>
  )
}

function TodoApp() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [clear, setClear] = useState([]);
  function addTodo() {
    if(text.trim()) {
      setTodo([...todo, text.trim()])
      setText("")
    }
  }
  function deleteTodo(index) {
    const newTodos = todo.filter((_, i)=>i!== index);
    setTodo(newTodos)
  }
  function taskDone(index) {
    deleteTodo(index);
    const newTodo = todo[index];
    setCompleted([...completed, newTodo])
  }
  function clearAll(){
    setTodo([])
  }
  return (
    <div className="bg-zinc-800 max-w-md p-6 rounded-2xl shadow-2xl w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>
      <div className="flex gap-2 mb-4">
        <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        type="text"
        placeholder="Enter todo"
        className="flex-grow bg-transparent border-[1px] border-zinc-600 px-2 py-1 rounded-md" />
        <button
        onClick={addTodo}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">Add</button>
        <button
        onClick={clearAll}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">Clear</button>
      </div>
      {/* conditional rendering */}
      {
        todo.map((items, index)=>{
          return (
            <div key={index} className="p-1 flex gap-2 ">
              <div className="rounded-md flex-grow bg-zinc-700 p-2 flex items-center ">
                {items}
              </div>
              <button onClick={()=>taskDone(index)} className="cursor-pointer bg-green-700 px-4 py-2 rounded-md">Done</button>
              <button onClick={()=>deleteTodo(index)} className="cursor-pointer bg-red-700 px-4 py-2 rounded-md">Delete</button>
            </div>
          )
        })
      }
      {
        completed.length > 0 && (
          <>
            <h1 className="text-center pt-4">Task Completed</h1>
            {
              completed.map((item, index)=>{
                return (
                <div key={index} className="p-1 flex gap-2 ">
                    <div className="rounded-md flex-grow bg-green-500 p-2 flex items-center opacity-20">
                      {item}
                    </div>
                </div>
              )
              })
            }
          </>
        )
      }
    </div>
  )
}
export default App;