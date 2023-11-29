import React, { useEffect, useState } from 'react'
import { fetchRFQPiezas, inactivateRFQP } from '../../customHooks/RFQ'
import editClient from '../../customHooks/editClient'
import { useNavigate } from 'react-router-dom'
import edit from '../../assets/editing.png'
import remove from '../../assets/remove.png'

function RFQPiezasView() {
    const [rfqs, setRfqs] = useState([])
    const idRfq = localStorage.getItem('rfq')
    const razon = localStorage.getItem('razon')
    const total = localStorage.getItem('total')
    const [selectRfq, setSelectRfq] = useState()
    const navigate = useNavigate();

    const modifyRfqPieza = () => {
        if (selectRfq == null) {
            alert('Selecciona un rfq')
        } else {
           localStorage.setItem('name', selectRfq)
           navigate('/RFQPiezasEditar')
        }
    }
    const toggleCheckbox = (name) => {
        setSelectRfq(name);
    }
    const deleteRfq = async () => {
        if(selectRfq == null || selectRfq == ''){
            alert("selecciona un rfq");
            return false;
        }
        const ques = prompt("Deseas borrar " + selectRfq + "escribe OK para confirmar")
        if(ques != 'OK'){
            return false;
        }
        const isDeleted = await inactivateRFQP(selectRfq)
        if(isDeleted) alert("Borrado!")
        const cleanDeleted = rfqs.filter( item => item.name != selectRfq);
        setRfqs(cleanDeleted)
    }
    useEffect(() => {
        const fetchRfqPz = async () => {
            const rfqInput = document.getElementById('Rfq_input');
            const razonInput = document.getElementById('razon_input');
            const totalInput = document.getElementById('total_input');
            const data = await fetchRFQPiezas(idRfq)
            const filterData = data.filter( item => item.state == "Activo")
            setRfqs(filterData);
            rfqInput.value = idRfq;
            const razonValor = await editClient(razon);
            razonInput.value = razonValor.Razonsocial;
            totalInput.value = total;
        }
        fetchRfqPz()
    }, [])

    return (
        <div className='h-screen bg-black space-y-5 px-5'>
            <div className='flex justify-center space-x-5 '>
                <label className='text-white ' htmlFor="">ID RFQ : </label>
                <input className='pl-2 rounded-lg w-32 bg-slate-400 text-black' type="text" readOnly id='Rfq_input' />
                <label className='text-white ' htmlFor=""> Razon Social: </label>
                <input className='pl-2 rounded-lg w-52 bg-slate-400 text-black' type="text" readOnly id='razon_input' />
                <label className='text-white ' htmlFor="">Total : </label>
                <input className='pl-2 rounded-lg w-32 bg-slate-400 text-black' type="text" readOnly id='total_input' />

            </div>
            <div className='flex justify-center items-center space-x-5 '>
                
                <button onClick={modifyRfqPieza}>
                    <div className='bg-amber-400 rounded-xl w-10 flex justify-center h-10 items-center'>
                        <img src={edit} alt="" className='h-4 w-4' />
                    </div>
                </button>
                <button onClick={deleteRfq}>
                    <div className='bg-red-500 rounded-xl w-10 flex justify-center h-10 items-center'>
                        <img src={remove} alt="" className='w-4 h-4' />
                    </div>
                </button> 

            </div>
            <table className="table-auto w-full ">
                <thead>
                    <tr className="bg-yellow-500 h-10 ">
                        <th></th>
                        <th>Manufacture</th>
                        <th>Name</th>
                        <th>Specification</th>
                        <th>Rev</th>
                        <th>Costo</th>
                        <th>Material</th>
                        <th>Opp Qty</th>
                        <th>Special Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {rfqs ?
                        rfqs.map((item, index) =>
                            <tr key={index} className='text-center'>
                                <td className="bg-white text-black">
                                    <input
                                        type="radio"
                                        onChange={() => toggleCheckbox(item.name)}
                                    />
                                </td>
                                <td className="bg-white text-black">{item.manufacture}</td>
                                <td className="bg-white text-black">{item.name}</td>
                                <td className="bg-white text-black">{item.specification}</td>
                                <td className="bg-white text-black">{item.rev}</td>
                                <td className="bg-white text-black">{item.costo}</td>
                                <td className="bg-white text-black">{item.material}</td>
                                <td className="bg-white text-black">{item.opp}</td>
                                <td className="bg-white text-black">{item.special}</td>




                            </tr>
                        ) : <h1 className='text-white'>Selecciona una empresa o Empresa no tiene RFQ</h1>}
                </tbody>
            </table>
        </div>
    )
}

export default RFQPiezasView