import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import SampleB from './Sample-B.jsx'
import { Routes, Route, Navigate } from 'react-router-dom';


function App() {

  return (
    <>
      <Routes>
         <Route path='/' element={
          <div>
            Hello
          </div>
        } ></Route>
        <Route path='/sample' element={
          <SampleB/>
        } ></Route>
      </Routes>
    </>
  )
}

export default App
