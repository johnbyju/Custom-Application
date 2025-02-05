import React, { useState } from 'react'

import IFrame from './components/IFrame'
import Login from './components/Login'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true)
  }
  return (
    <>
 <div className="app">{isLoggedIn ? <IFrame /> : <Login onLogin={handleLogin} />}</div>    
    </>
  )
}

export default App