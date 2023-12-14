import React from 'react'
import { Link } from 'react-router-dom'
function Error() {
    return (
        <div className='bg-black h-screen mx-auto text-center items-center pt-10 '>
            <h1 className='text-white text-3xl'> Seguridad De Acceso /Recarga si iniciaste sesion/</h1>
            <button onClick={() => window.location.reload()}>
                <h1 className=' text-sky-500 text-xl mt-5'> Recarga la pagina aqui </h1>
            </button>
            <h1 className=' text-yellow-500 text-xl mt-5'> **En caso de seguir aqui; No tienes acceso a la pagina.**  </h1>
            <Link to={'/'}>
                <h1 className=' text-red-500 text-xl mt-5'> Regresa al login aqui   </h1>

            </Link>


        </div>
    )
}

export default Error