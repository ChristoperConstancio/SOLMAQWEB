import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Bienvenido() {
  const [apartments, setApartments] = useState({})
  const [tipoUsuarioName, setTipoUsuarioName] = useState()

  useEffect(() => {

    const interfaz = () => {
      const tipoUsuario = localStorage.getItem('tipo');
      if (tipoUsuario == '1') {
        setApartments(['Usuarios', 'Ventas', 'RFQ', 'Clientes', 'Cobros', 'Reportes']);
        setTipoUsuarioName("Administrador")
      }
    }

    interfaz();
  }, [])

  return (
    <div className='bg-black h-screen text-center'>
      <div className='items-center mx-auto space-y-5'>
        <h1 className='text-white text-7xl'>Bienvenido </h1>
        <h2 className='text-white text-3xl'>{tipoUsuarioName}</h2>
      </div>
      <div className='bg-black grid grid-cols-3 gap-4 mt-5 mx-5'>
        {apartments.length > 0 ?
          apartments.map((apartado, index) => (
            <Link to={`/${apartado}`} key={index}>
              <div className="bg-gray-300 rounded-lg p-4" key={index}>
                {apartado}
              </div>
            </Link>
          ))
          :
          <p>Error</p>
        }
      </div>
    </div>
  )
}

export default Bienvenido