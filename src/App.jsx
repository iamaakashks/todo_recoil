import React, { useState } from "react";
import { atom, RecoilRoot, useRecoilSnapshot, useRecoilState } from "recoil";

const todoAtom = atom({
  key:"todoState",
  default: {
    todo: [],
    completed: []
  }
})
function App() {
  return (
    <RecoilRoot>
      <div className="w-full min-h-screen bg-zinc-900 text-white flex justify-center items-start p-6">
        <TodoApp />
      </div>
    </RecoilRoot>
  )
}

function TodoApp() {
  const [text, setText] = useState("");
  const [todoTask, setTodoTask] = useRecoilState(todoAtom);
  const {todo, completed} = todoTask;

  function addTodo() {
    if(text.trim()) {
      setTodoTask({
        ...todoTask,
        todo: [...todo, text.trim()]})
      setText("")
    }
  }
  function deleteTodo(index) {
    const newTodos = todo.filter((_, i)=>i!== index);
    setTodoTask({
      ...todoTask,
      todo: newTodos
    })
  }
  function taskDone(index) {
    const newTodo = todo[index];
    const newTodos = todo.filter((_, i) => i !== index);
    setTodoTask({
      todo: newTodos,
      completed: [...completed, newTodo]
    });
  }
  function clearAll(){
    setTodoTask({
      ...todoTask,
      todo: []
    })
  }
  return (
    <div className="bg-zinc-800 w-full sm:w-[90%] md:w-[70%] lg:w-[40%] p-6 rounded-2xl shadow-2xl">
      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        type="text"
        placeholder="Enter todo"
        className="outline-none flex-grow bg-transparent border-[1px] border-zinc-600 px-2 py-1 rounded-md" />
        <button
        onClick={addTodo}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">Add</button>
        <button
        onClick={clearAll}
        className=" bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">Clear</button>
      </div>
      {/* conditional rendering */}
      {
        todo.map((items, index)=>{
          return (
            <div key={index} className="p-1 flex flex-col gap-2 sm:flex-row">
              <div className="rounded-md flex-grow bg-zinc-700 p-2 flex items-center ">
                {items}
              </div>
              <div className="flex gap-2">
                <button onClick={()=>taskDone(index)} className="w-[50%] cursor-pointer bg-green-700 px-4 py-2 rounded-md">Done</button>
                <button onClick={()=>deleteTodo(index)} className="w-[50%] cursor-pointer bg-red-700 px-4 py-2 rounded-md">Delete</button>
              </div>
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