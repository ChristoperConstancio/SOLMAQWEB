import React, { useEffect, useState } from 'react'
import { editingRFQPieza, editingRFQServicio, fetchRFQServiEditar } from '../../customHooks/RFQ';
import { useNavigate } from 'react-router-dom';

function RFQServicioEditar() {
    const [rfqs, setRfqs] = useState([])
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRfqs({
            ...rfqs,
            [name]: value,
        });
    }
    const updateRFQPieza = async () => {
        const isUpdated = await editingRFQServicio(rfqs);
        if(!isUpdated){
            alert("Intentalo de nuevo")
            return false;
        }else{
            alert("Cambio Correcto")
            navigate('/RFQServicioview')
        }
    }
    useEffect(() => {
        const fetchRFQPiezas = async () => {
            const idRfq = localStorage.getItem('rfq')
            const data = await fetchRFQServiEditar(idRfq);
            if (!data) alert("Error en el servidor")
            setRfqs(data[0])
        }

        fetchRFQPiezas();
    }, [])

    return (
        <div className='h-screen bg-black'>
            <h1 className='font-bold text-white text-3xl text-center'>Editar RFQ</h1>
            <h1 className='text-white text-center'>RFQ : {rfqs.idRFQ}</h1>
            <div className='mx-20 py-10 grid grid-cols-2 gap-y-8 gap-x-8   ' name='add'>
                <div className='space-x-8 '>
                    <label htmlFor="" className='text-white text-3xl'>Nombre :</label>
                    <input name='nombre'
                        className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange}
                        value={rfqs.nombre} />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Descripcion :</label>
                    <input name='descripcion' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange}
                        value={rfqs.descripcion} />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Fecha :</label>
                    <input name='fecha' className='pl-3 rounded-lg w-72 h-10' type="date" onChange={handleInputChange}
                        value={rfqs.fecha}  />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Hora Entrada :</label>
                    <input name='horaentrada' className='pl-3 rounded-lg w-72 h-10' type="time" onChange={handleInputChange}
                        value={rfqs.horaentrada} />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Hora Salida :</label>
                    <input name='horasalida' className='pl-3 rounded-lg w-72 h-10' type="time" onChange={handleInputChange}
                        value={rfqs.horasalida} />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Telefono : </label>
                    <input name='telefono' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange}
                        value={rfqs.telefono} />
                </div>
             

            </div>
            <div className=" flex justify-center mx-44 space-x-16 mt-5">
                <button className="bg-red-500 hover:bg-red-800 rounded-xl text-white font-bold w-44 h-16"
                >
                    <h1 className="text-3xl" > Cancelar </h1>
                </button>
                <button
                    className="bg-amber-500 hover:bg-amber-800  rounded-xl text-white font-bold w-44 h-16"
                    onClick={updateRFQPieza}
                >
                    <h1 className="text-3xl" > Guardar </h1>
                </button>
            </div>

        </div>
    )
}

export default RFQServicioEditar