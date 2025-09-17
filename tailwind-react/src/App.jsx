import { useState } from 'react'
import './App.css'
import  Card  from './components/Card'; 

function App() {
  const [count, setCount] = useState(0)
  const myCustomeArr = [
    {
      key:"1", name:"Tailwind CSS"
    }, 
    {
      key:"2", name:"React JS"
    }
  ];
  return (
    <>
      <div>
        <h2 className='bg-blue-400 text-white p-4 rounded-xl cursor-pointer mb-4'>Tailwind CSS</h2>
        <Card channel="Next JS" content="Next Level" />
        <Card  channel="React JS" content="React Level"/>
      </div>
    </>
  )
}

export default App
