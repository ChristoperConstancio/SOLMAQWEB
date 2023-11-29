import React from 'react'
import { addRFQServicio } from '../../customHooks/RFQ';
import { useNavigate } from 'react-router-dom';

function RFQServicio() {
  const idRFQ = localStorage.getItem('idRFQ')
  const navigate = useNavigate();
  const addRFQS = () => {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const fecha = document.getElementById('fecha').value;
    const horaentrada = document.getElementById('horaentrada').value;
    const horasalida = document.getElementById('horasalida').value;
    const total = document.getElementById('total').value;
    const descripcion = document.getElementById('descripcion').value;

    if(nombre == '' || telefono  == '' || fecha == '' || horaentrada == '' || horasalida == '' || total == '' || descripcion == ''){
      alert("Hay algun campo vacio");
      return false;
    }
    const data = {
      nombre,
      telefono,
      fecha,
      horaentrada,
      horasalida,
      total,
      descripcion,
      idRFQ,
      state : 'Activo'
    }
    const isSuccesful = addRFQServicio(data)
    if (!isSuccesful) {
      alert("Ocurrio un problema");
      return false;
    }
    alert("RFQ CREADO EXITOSO")
    navigate('/RFQ')


  }
  const cancel = () => {
    alert("Operacion cancelada");
    navigate("/RFQ")
  }
  return (
    <div className=' h-screen bg-black'>
      <h1 className='text-white font-bold text-center text-2xl'>Agregar RFQ {idRFQ}</h1>
      <div className='space-y-5 mx-auto text-center my-5 grid grid-cols-2'>
        <div >
          <label htmlFor="" className='text-white'>Nombre : </label>
          <input className='pl-2 rounded-lg ml-5 text-black' type="text" id='nombre'/>
        </div>
        <div>
          <label htmlFor="" className='text-white'>Telefono : </label>
          <input className='pl-2 rounded-lg ml-5 text-black' type="number" id='telefono'/>
        </div>

        <div>
          <label htmlFor="" className='text-white'>Fecha</label>
          <input className='pl-2 rounded-lg ml-5 text-black' type="date" id='fecha'/>
        </div>
        <div>
          <label htmlFor="" className='text-white'>Hora Entrada : </label>
          <input className='pl-2 rounded-lg ml-5 text-black' type="time" id='horaentrada'/>
        </div>
        <div>
          <label htmlFor="" className='text-white'>Hora Salida</label>
          <input className='pl-2 rounded-lg ml-5 text-black' type="time"id='horasalida' />
        </div>
        <div>
          <label htmlFor="" className='text-white'>Total :</label>
          <input className='pl-2 rounded-lg ml-5 text-black' type="number" id='total'/>
        </div>
        <div>
          <label htmlFor="" className='text-white'>Descripcion</label>
          <input className='pl-2 rounded-lg ml-5 text-black h-32' type="text" id='descripcion' />
        </div>
      </div>
      <div className='justify-center flex  space-x-5'>
      <button className="bg-red-500 hover:bg-red-800 rounded-xl text-white font-bold w-44 h-16"
          onClick={cancel}>
          <h1 className="text-3xl" > Cancelar </h1>
        </button>
        <button
          className="bg-amber-500 hover:bg-amber-800  rounded-xl text-white font-bold w-44 h-16"
          onClick={addRFQS}
        >
          <h1 className="text-3xl" > Guardar </h1>
        </button>
      </div>
    </div>
  )
}

export default RFQServicio