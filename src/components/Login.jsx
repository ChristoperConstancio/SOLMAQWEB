import React from 'react'
import userImg from '../assets/user.png'
import padLock from '../assets/padlock.png'
import showOff from '../assets/show.png'
import hide from '../assets/hide.png'
import logo from '../assets/SOLMAQ.png'
import { useState } from 'react';
import { loginUser } from '../customHooks/getDocs'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate();
  const usuario = document.getElementById('username');
  const pass = document.getElementById('pass');

  const logear = async (e) => {
    e.preventDefault();
    const { success, nombre, rol } = await loginUser(usuario, pass);
    if (success) {
      setIsLogged(true);
      localStorage.setItem('username', nombre)
      localStorage.setItem('verificado', true)
      localStorage.setItem('tipo', rol)
      navigate('/bienvenido');

    } else {
      alert(nombre)
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (

    <div className='flex justify-center items-center bg-black min-h-screen'>
      <div className='bg-white rounded-xl h-96 w-96 '>
        <div className='items-center justify-center flex'>
          <img src={logo} alt="SOLMAQWEB" className='h-32 w-40 pt-6' />
        </div>
        <div className='pt-16 flex justify-center items-center  '>
          <form action="" >

            <div className='flex gap-x-2 items-center'>
              <img src={userImg} alt="" className='h-6 w-6' />
              <input type="text"
                id="username"
                className="bg-white text-black placeholder-gray-500 pl-2"
                placeholder="Usuario"
              />
            </div>
            <div className='flex gap-x-2 items-center pt-3'>
              <img src={padLock} alt="" className='h-6 w-6' />
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white text-black placeholder-gray-500 pl-2"
                placeholder="Contraseña"
                id='pass'
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-500 hover:text-black"
              >
                {passwordVisible ? <img src={hide} className='h-5 w-5' /> : <img src={showOff} className='h-5 w-5' />}
              </button>
              <hr />
            </div>
            <div className='flex items-center justify-center'>
              <button
                type='submit'
                className='mt-10 bg-amber-400 rounded-xl text-white h-10 w-40 text-lg'
                onClick={logear}
              >
                Iniciar Sesion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>


  )
}

export default Login