import React from 'react'
import logo from '../assets/SOLMAQHeader.png'
import shut from '../assets/shutdown.png'
import back from '../assets/left-arrow.png'
import { useNavigate, Link } from 'react-router-dom'
function Header() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const logOut = () => {
    localStorage.setItem('verificado', false);
    localStorage.setItem('username', '')
    navigate('/');

  }
  const username = localStorage.getItem('username');
  return (
    <div className=' h-20  bg-black  flex items-center pl-6 justify-between  '>
      <div className='space-x-3 flex justify-center items-center'>
        <button onClick={goBack}>
          <img src={back} alt="" className='text-red-500 h-4 w-4 ' />
        </button>
        <Link to={'/bienvenido'}>
          <img src={logo} alt="" className='h-12 w-24 ' />

        </Link>

      </div>

      <div className='flex pr-5 space-x-3'>
        <p className='text-white '><p className='font-bold'> Hola,</p> {username}</p>
        <button
          onClick={logOut}
        >
          <img src={shut} alt="" className='h-8 w-8' />
        </button>
      </div>

    </div>
  )
}

export default Header