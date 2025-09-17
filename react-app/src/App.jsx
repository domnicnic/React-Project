import { useState, useEffect, useRef, Fragment } from 'react'
import './App.css'
function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('Red');
  const [value, setValue] = useState(0)
  const [number, setNumber] = useState(0)
  const [counter, setCounter] = useState(0)
  const names = ["Alice", "Bob"];

  function cube(num) {
    return Math.pow(num, 3);
  }
  const result  = cube(number);
  const onChange = (e) => {
    setNumber(e.target.value);
  }

  const valueCountRef = useRef(0) 
  useEffect(() => {
    valueCountRef.current = valueCountRef.current +1
  })

  useEffect(()=>{
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1)
    }, 2000)
  }, [color])
  const changeColor = () => {
    setColor((prevCount) => 'Blue' === prevCount ? 'Red' : 'Blue')
  }
  return (
    <Fragment>
      <h1>My Favourite color is {color} </h1>
      <h2>I have rendered {count} times</h2>
      <button onClick={changeColor}>Button</button><br/>
      <button onClick={()=>{setValue(prev=>prev+1)}}>+1</button>
      <h2>Value is {value}</h2>      
      <button onClick={()=>{setValue(prev=>prev-1)}}>-1</button>
      <h1>Render Count {valueCountRef.current}</h1>

      <h2>Check console for updates</h2>
      <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
      <h5>Cube of the number {result }</h5>
      <ul>
        {names.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </Fragment>
  )
}
export default App
