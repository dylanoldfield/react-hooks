// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStoreState = (
  key,
  obj = '',
  {serialse = JSON.stringify, deserialise = JSON.parse} = {},
) => {
  const prevKey = React.useRef(key)
  
  const [state, setState] = React.useState(() => {
    if (prevKey.current !== key) {
      window.localStorage.removeItem(prevKey.current)
    }
    prevKey.current = key
    const item = window.localStorage.getItem(key)
    if (item) {
      return deserialise(item)
    }
    return typeof obj === 'function' ? obj() : obj
  })

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` i localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => {
    window.localStorage.setItem(key, serialse(state))
  }, [state, key, serialse])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName

  const [name, setName] = useLocalStoreState('name', initialName, {})

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
