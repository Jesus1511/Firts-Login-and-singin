import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import {login} from './rest.js'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { GeneralData } from './App.jsx';

export const Login = () => {
  const { register, handleSubmit} = useForm();
  const { setIsAuth, setUser } = useContext(GeneralData)
  const navigate = useNavigate()

  const onSubmit = data => {
    login(data)
      .then((response) => {
        setIsAuth(true)
        setUser(response.data)
        navigate('/profile', {replace: true})
      })
      .catch((err) => {
        console.log(err)
        throw(err)
      })
  };

  return (
    <div className='bg-[#313131] px-[25px] py-[30px] w-[420px] ml-[50%] mt-[100px] translate-x-[-50%] rounded-md flex flex-col'>

    <h1 className='text-[25px] mb-[5px] font-bold'>Login</h1>

    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <input
            className='my-[7px] rounded-md p-2'
            placeholder='email'
            type="email"
            name="email"
            {...register('email', {
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            })}
        />

        <input
            className='my-[7px] rounded-md p-2'
            placeholder='password'
            type="password"
            name="password"
            {...register('password', { required: true })}
        />


        <button className='bg-[#606060] w-[90px] rounded-md py-[3px] my-[10px]' type="submit">Submit</button>
      </form>

      <div className='flex justify-between pr-[5px]'>
        <p className='text-center mb-[5px]'>you don't have an account?</p>
        <div className='text-center hover:text-blue-200 mb-[10px]'><Link to='/singin'>singin</Link></div>   
      </div>
    </div>
  );
};