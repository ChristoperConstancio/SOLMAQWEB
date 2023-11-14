import React, { useEffect, useState } from 'react'
import add from '../../assets/add.png'
import edit from '../../assets/editing.png'
import remove from '../../assets/remove.png'
import { Link } from 'react-router-dom'
import fetchRFQ from '../../customHooks/RFQ'
import view from '../../assets/view.png'
import getClientes from '../../customHooks/getClients'
import { useNavigate } from 'react-router-dom'
function RFQ() {
    const navigate = useNavigate();
    const [rfq, setRfq] = useState()
    const [filteredData, setFilteredData] = useState()
    const [selectedRow, setSelectedRow] = useState()
    const [optionsCustomer, setOptionsCustomer] = useState([])
    const [customerSelected, setCustomerSelected] = useState()
    const toggleCheckbox = (id) => {
        if (selectedRow === id) {
            setSelectedRow(null); // Desmarca la fila si ya está seleccionada
        } else {
            setSelectedRow(id); // Marca la nueva fila
        }
    };
    const filter = (e) => {
        setFilteredData(rfq.filter (item => item.RFC == e.target.value))
    }
    
    useEffect(() => {
        const getRFQ = async () => {
            const data = await fetchRFQ();
            setRfq(data);
            
        }
        const getCustomers  = async () => {
            const customers = await getClientes();
            setOptionsCustomer(customers)
        }
        getRFQ();
        getCustomers();
    }, [])

    return (
        <>
            <div className='h-screen bg-black'>
                <div className='flex justify-between mx-12 h-20'>
                    <div>
                        <h1 className='text-4xl text-white font-bold'> RFQ</h1>
                        <h1 className='text-white'>RFQs Registrados</h1>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <label htmlFor="" className='text-white'>Filtrar por Cliente: </label>
                    <select               
                            className="bg-slate-300 rounded-lg w-60 h-7 "
                            onChange={filter}
                        >
                            <option value="">Selecciona una opción</option>

                            { optionsCustomer ? optionsCustomer.map((item, index) => (
                                <option key={index} value={item.RFC}>
                                    {item.Razonsocial}
                                </option>
                            )) : <h1  className='text-white'> No se encontraron clientes</h1>}
                        </select>

                    </div>
                </div>
                <div className='flex justify-end mx-10 space-x-3 h-10 '>
                    <Link to={'/AgregarRFQ'}>
                        <div className='bg-green-400 rounded-xl w-10 flex justify-center h-full items-center'>
                            <img src={add} alt="" className='h-4 w-4' />
                        </div>
                    </Link>
                    <button >
                        <div className='bg-amber-400 rounded-xl w-10 flex justify-center h-full items-center'>
                            <img src={edit} alt="" className='h-4 w-4' />
                        </div>
                    </button>
                    <button >
                        <div className='bg-red-400 rounded-xl w-10 flex justify-center h-full items-center'>
                            <img src={remove} alt="" className='w-4 h-4' />
                        </div>
                    </button>
                    <button >
                        <div className='bg-indigo-700 rounded-xl w-10 flex justify-center h-full items-center'>
                            <img src={view} alt="" className='w-7 h-7'/>
                        </div>
                    </button>

                </div>
                <div className='my-5 mx-10'>
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-yellow-500 h-10 ">
                                <th></th>
                                <th>Pieza</th>
                                <th>Servicio</th>
                                <th>Total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredData ?
                                filteredData.map((item, index) =>
                                    <tr key={item.RFC} className='text-center'>
                                        <td className="bg-white text-black">
                                            <input
                                                type="radio"
                                                checked={selectedRow === item.RFC}
                                                onChange={() => toggleCheckbox(item.RFC)}
                                            />
                                        </td>
                                        <td className="bg-white text-black">{item.esPz.toString()}</td>
                                        <td className="bg-white text-black">{item.esMant.toString()}</td>
                                        <td className="bg-white text-black">{item.Total}</td>

                                    </tr>
                                ) : <h1 className='text-white'>Selecciona una empresa o Empresa no tiene RFQ</h1>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default RFQ