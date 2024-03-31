import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState, createContext, useEffect } from 'react'
import Cookies from 'js-cookie'

import { Home } from './Home.jsx'
import { Login } from './Login.jsx'
import { Singin } from './Singin.jsx'
import { Profile } from './Profile.jsx'

export const GeneralData = createContext()

export const App = () => {

  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const cookieValue = Cookies.get();
    if(Object.keys(cookieValue).length > 0) {
      console.log('seteando isAuth como true')
      setIsAuth(true)
    }
    else if(Object.keys(cookieValue).length == 0) {
      console.log('seteando isAuth como false')
      setIsAuth(false)
    }
    },[])

  return (
    <>
    <GeneralData.Provider value={{isAuth, setIsAuth, user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/singin' element={<Singin />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </GeneralData.Provider>

    </>
  )
}
