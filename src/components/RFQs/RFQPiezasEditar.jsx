import React, { useEffect, useState } from 'react'
import { editingRFQPieza, fetchRFQPiezasEditar } from '../../customHooks/RFQ';
import edit from '../../assets/editing.png'
import remove from '../../assets/remove.png'
import { useNavigate } from 'react-router-dom';
function RFQPiezasEditar() {
    const [rfqs, setRfqs] = useState([])
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRfqs({
            ...rfqs,
            [name]: value,
        });
    }
    const cancelAction = (e) => {
        e.preventDefault();
        alert("Operacion Cancelada");
        navigate('/RFQPiezasView');
    }
    const updateRFQPieza = async () => {
        const isUpdated = await editingRFQPieza(rfqs);
        if (!isUpdated) {
            alert("Intentalo de nuevo")
            return false;
        } else {
            alert("Cambio Correcto")
            navigate('/RFQPiezasView')
        }
    }
    useEffect(() => {
        const fetchRFQPiezas = async () => {
            const name = localStorage.getItem('name');
            const data = await fetchRFQPiezasEditar(name);
            if (!data) alert("Error en el servidor")
            setRfqs(data[0])
        }

        fetchRFQPiezas();
    }, [])

    return (
        <div className='h-screen bg-black  '>
            <h1 className='font-bold text-white text-3xl text-center'>Editar RFQ</h1>
            <h1 className='text-white text-center'>RFQ : {rfqs.idRFQ}</h1>
            <div className='mx-20 py-10 grid grid-cols-2 gap-y-8 gap-x-8   ' name='add'>
                <div className='space-x-8 '>
                    <label htmlFor="" className='text-white text-3xl'>Manufacture Part No :</label>
                    <input name='manufacture'
                        className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange}
                        value={rfqs.manufacture} />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Rev :</label>
                    <input name='rev' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange}
                        value={rfqs.rev} />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Name :</label>
                    <input name='name' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange}
                        value={rfqs.name} readOnly />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Material :</label>
                    <input name='material' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange}
                        value={rfqs.material} />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Specification :</label>
                    <input name='specification' className='pl-3 rounded-lg w-72 h-32' type="text" onChange={handleInputChange}
                        value={rfqs.specification} />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Opp Qty : </label>
                    <input name='opp' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange}
                        value={rfqs.opp} />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Special Comments : </label>
                    <input name='special' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange}
                        value={rfqs.special} />
                </div>
                <div className='space-x-8'>
                    <label htmlFor="" className='text-white text-3xl'>Costo : </label>
                    <input name='costo' className='pl-3 rounded-lg w-72 h-10' type="number" onChange={handleInputChange}
                        value={rfqs.costo} />
                </div>

            </div>
            <div className=" flex justify-center px-44 space-x-16 pt-5 bg-black pb-5">
                <button className="bg-red-500 hover:bg-red-800 rounded-xl text-white font-bold w-44 h-16"
                onClick={cancelAction}
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

export default RFQPiezasEditar