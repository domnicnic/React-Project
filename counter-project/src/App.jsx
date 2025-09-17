import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [random, setRandom] = useState(0);
  const [list, setList] = useState(['item1', 'item2', 'item3']);
  const AddValue =()=>{
    setRandom(Math.floor(Math.random() * 9999));
    if(count >= 0 && count <20)setCount(prev =>prev + 1)

  }
  const minusValue = ()=>{
    if(count >= 1) setCount(prev => prev - 1)
  }
  return (
    <>
      <div>
        <h2>Counter Value: {count} </h2>
        <h2>Random Value: {random} </h2>
        <button onClick={AddValue}>Add Value</button> &nbsp;
        <button onClick={minusValue}>Decrease Value</button>
        <hr />
        <h2>List of Items</h2>
        <ul>
          {list.map((item, index)=>(
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default App
