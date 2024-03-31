import { useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { GeneralData } from "./App"
import { profile, logout } from "./rest"
import { Navigate, useNavigate } from "react-router-dom"

export const Profile = () => {

  const [profileInfo, setProfileInfo] = useState('user not found')
  const navigate = useNavigate()
  const {isAuth, setIsAuth} = useContext(GeneralData)
  const valorDeLaCookie = Cookies.get() 
  
  useEffect(() => {
    profile()
      .then((response) => {
        setProfileInfo(response.data)
      })
      .catch((error) => {
        console.log(error)
        throw(error)
      })
  }, [valorDeLaCookie])


  if (!isAuth) {
    return <Navigate to='/login'></Navigate>}

  function handleClick () {
    logout()
      .then(() => {
        navigate('/')
        setIsAuth(false)
      })
  }

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
      <h1 className="text-center">{profileInfo}</h1>
    </div>
  )
}
