import React, { useEffect, useState } from 'react'
import add from '../../assets/add.png'
import edit from '../../assets/editing.png'
import remove from '../../assets/remove.png'
import { Link } from 'react-router-dom'
import {fetchRFQ, inactivateRFQ} from '../../customHooks/RFQ'
import view from '../../assets/view.png'
import getClientes from '../../customHooks/getClients'
import { useNavigate } from 'react-router-dom'
function RFQ() {
    const navigate = useNavigate();
    const [rfq, setRfq] = useState()
    const [filteredData, setFilteredData] = useState()
    const [selectedRow, setSelectedRow] = useState()
    const [optionsCustomer, setOptionsCustomer] = useState([])
    const [rfqSelected, setRfqSelected] = useState()
    const toggleCheckbox = (id) => {
        const { Id_rfq, esMant, RFC, Total} = id
        localStorage.setItem('razon',RFC)
        localStorage.setItem('total',Total)
        if(esMant.toString() === 'true'){
            setRfqSelected('esMant')
        }else{
            setRfqSelected('esPz');
        }
        if (selectedRow === Id_rfq) {
            setSelectedRow(null); // Desmarca la fila si ya está seleccionada
        } else {
            setSelectedRow(Id_rfq); // Marca la nueva fila
        }
    };
    const filter = (e) => {
        setFilteredData(rfq.filter (item =>{
            return item.RFC == e.target.value;
        } ))
    }

    const viewRfqs = () => {
        localStorage.setItem('rfq', selectedRow)
        if(rfqSelected == null){
            alert("Selecciona un RFQ")
            return false;
        }
        if(rfqSelected == "esMant"){
            navigate('/RFQServicioView')
        }else{
            navigate('/RFQPiezasView')
        }
    }
    const inactivateRFQs = async () => {
        if(selectedRow == null || selectedRow == ''){
            alert("selecciona un rfq");
            return false;
        }
        const okChecked = prompt(`Seguro que quieres eliminar ${selectedRow}, escribe OK`);
        if(okChecked != 'OK') return false;
        const isInactivate = await inactivateRFQ(selectedRow);
        if(isInactivate){
            const deleteUpdate = filteredData.filter ( item => selectedRow != item.Id_rfq)
            setFilteredData(deleteUpdate)
            alert("Borrado completado");
        }
    }
    useEffect(() => {
        const getRFQ = async () => {
            const data = await fetchRFQ();
            const filterData = data.filter( item => item.state == "Activo")
            setRfq(filterData);
            
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
                    <button onClick={inactivateRFQs} >
                        <div className='bg-red-400 rounded-xl w-10 flex justify-center h-full items-center'>
                            <img src={remove} alt="" className='w-4 h-4' />
                        </div>
                    </button>
                    <button 
                    onClick={viewRfqs}>
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
                                <th>N° RFQ</th>
                                <th>Pieza</th>
                                <th>Servicio</th>
                                <th>Total</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredData ?   
                                filteredData.map((item, index) =>
                                    <tr key={item.Id_rfq} className='text-center'>
                                        <td className="bg-white text-black">
                                            <input
                                                type="radio"
                                                checked={selectedRow === item.Id_rfq}
                                                onChange={() => toggleCheckbox(item)}
                                            />
                                        </td>
                                        <td className="bg-white text-black">{item.Id_rfq}</td>
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