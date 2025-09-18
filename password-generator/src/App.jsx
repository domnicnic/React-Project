import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
function App() {
  const [length, setLength] = useState(10);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');

  // useRef to avoid useCallback
  const passwordRef = useRef(null)
  const copyPasswodBoard= useCallback(()=>{
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password);
    passwordRef.current.focus();
  }, [password])

  const passwordGenerator =useCallback(()=>{
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(number) str += '0123456789';
    if(character) str += '!@#$%^&*()_+~`';
    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character])
  
  useEffect(()=>{
    passwordGenerator();
  }, [length, number, character, passwordGenerator])

  return (
    <>
      <h1 className='text-white text-center'>Password Generator</h1>      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" 
            className='text-white outline-none w-full py-2 px-3 border-1 border-gray-300' 
            placeholder='Password'
            value={password} readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-blue px-3 py-0.5 shrink-0' onClick={copyPasswodBoard}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6} 
            max={100} 
            value={length} 
            onChange={(e)=>setLength(e.target.value)} 
            className='cursor-pointer'/>
            <label htmlFor="" className='text-white'>Length {length}</label>
            <input 
            type="checkbox" 
            onChange={(e)=>setNumber(prev=>!prev)}
            defaultChecked={number}            
            />
            <label htmlFor="" className='text-white'>Numbers</label>
            <input 
            type="checkbox" 
            onChange={(e)=>setCharacter(prev=>!prev)}
            defaultChecked={character}            
            />
            <label htmlFor="" className='text-white'>Character</label>

          </div>
        </div>
      </div>
    </>
  )
}
export default App
