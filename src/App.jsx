import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*-_+()'

    for (let i=1; i< length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])  //as long as dependency dont change too frequently

  const copyPasswordToClipbord = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed,charAllowed])

  return (
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-8 bg-gray-800 text-orange-500'>
      <h1 className='text-3xl font-bold mb-2
      text-center'>Password Generator App</h1>
      <div className='flex shadow rounded-lg overflow-hidden
      mb-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly 
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipbord}
        className='outline-none bg-blue-700 text-white px-3
         py-0.5 shrink-0'>Copy</button>
      </div>
      <div
      className='flex text-sm gap-x-1'>
        <input 
        type="range"
        min={6}
        max={26}
        value={length}
        className='cursor-pointer'
        onChange={(e) => setLength(e.target.value)}
        name=''
        id='' />
        <label htmlFor="length">Length:{length}</label>
        <div
        className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={numberAllowed}
        className='cursor-pointer'
        onChange={() => {
          setNumberAllowed((prev) => !prev)
        }}
        name=''
        id='' />
        <label htmlFor="number">Numbers</label>
        <div
      className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked={charAllowed}
        className='cursor-pointer'
        onChange={() => {
          setCharAllowed((prev) => !prev)
        }}
        name=''
        id='' />
        <label htmlFor="charInput">Character</label>
      </div>
      </div>
      </div>
    
    </div>
  )
}

export default App
