import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import BasicCRUD from './BasicCRUD.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BasicCRUD/>
    </>
  )
}

export default App
