
import React, { useEffect, useState } from 'react'
import getClientes from '../../customHooks/getClients';
import add from '../../assets/add.png'
import remove from '../../assets/remove.png'
import view from '../../assets/view.png'
import { Link, useNavigate } from 'react-router-dom';
import { getVentasAll } from '../../customHooks/Ventas';
function Cobros() {

    const [optionsCustomer, setOptionsCustomer] = useState([])
    const [filteredData, setFilteredData] = useState()
    const [vtas, setVtas] = useState([])
    const [selectedRow, setSelectedRow] = useState()
    const navigate = useNavigate();
    const filter = (e) => {
        setFilteredData(vtas.filter(item => {
            return item.RFC == e.target.value;
        }))

    }
    const inactivateVentas = async () => {
        if (selectedRow == null || selectedRow == '') {
            alert("Selecciona una venta");
            return;
        } else {
            const checked = prompt("Seguro que quieres eliminar la venta " + selectedRow + " escribe SI");
            if (checked != "SI") return false
            const isSuccesful = await inactivateVentas(selectedRow);
            if (isSuccesful) {
                const deleteUpdate = filteredData.filter(item => selectedRow != item.nuVenta)
                setFilteredData(deleteUpdate)
                alert("Borrado exitoso")
            }
        }
    }

    const viewVentas = () => {
        if (selectedRow == null || selectedRow == '') {
            alert("Selecciona una venta");
            return;
        } else {
            navigate('/CobrosView');
        }
    }
    const addCobro = () => {
        if (selectedRow == null || selectedRow == '') {
            alert("Selecciona una venta");
            return;
        } else {
            localStorage.setItem('nuVenta', selectedRow)
            navigate('/AgregarCobro');
        }
    }
    const toggleCheckbox = (item) => {
        setSelectedRow(item.nuVenta)
        localStorage.setItem('nuVenta', item.nuVenta)
    }
    useEffect(() => {
        const getCustomers = async () => {
            const customers = await getClientes();
            setOptionsCustomer(customers)
        }
        const getVentas = async () => {
            const ventas = await getVentasAll();
            setVtas(ventas)
        }
        getCustomers();
        getVentas();
    }, [])
    return (
        <div className='h-screen bg-black space-y-5'>
            <div className='flex justify-between px-10 '>

                <div>
                    <h1 className='text-white text-4xl font-bold'>Ventas</h1>
                    <h2 className='text-white text-2xl font-bold'>Registradas</h2>
                </div>
                <div>
                    <h1 className='text-white text-4xl font-bold'>Cobros</h1>

                </div>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="" className='text-white'>Filtrar por Cliente: </label>
                    <select
                        className="bg-slate-300 rounded-lg w-60 h-7 "
                        onChange={filter}
                    >
                        <option value="">Selecciona una opción</option>

                        {optionsCustomer ? optionsCustomer.map((item, index) => (
                            <option key={index} value={item.RFC}>
                                {item.Razonsocial}
                            </option>
                        )) : <h1 className='text-white'> No se encontraron clientes</h1>}
                    </select>

                </div>
            </div>
            <div className='flex justify-end mx-10 space-x-3 h-10 '>
                
                <button
                    onClick={addCobro}>
                    <div className='bg-green-400 rounded-xl w-10 flex justify-center h-full items-center'>
                        <img src={add} alt="" className='h-4 w-4' />
                    </div>
                </button>
                <button onClick={inactivateVentas} >
                    <div className='bg-red-400 rounded-xl w-10 flex justify-center h-full items-center'>
                        <img src={remove} alt="" className='w-4 h-4' />
                    </div>
                </button>
                <button
                    onClick={viewVentas}>
                    <div className='bg-indigo-700 rounded-xl w-10 flex justify-center h-full items-center'>
                        <img src={view} alt="" className='w-7 h-7' />
                    </div>
                </button>
            </div>
            <div className='my-5 mx-10'>
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-yellow-500 h-10 ">
                            <th></th>
                            <th>N° Venta</th>
                            <th>Fecha de Venta</th>
                            <th>Fecha de entrega</th>
                            <th>Saldo</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData ?
                            filteredData.map((item, index) =>
                                <tr key={item.nuVenta} className='text-center'>
                                    <td className="bg-white text-black">
                                        <input
                                            type="radio"
                                            checked={selectedRow === item.nuVenta}
                                            onChange={() => toggleCheckbox(item)}
                                        />
                                    </td>
                                    <td className="bg-white text-black">{item.nuVenta}</td>
                                    <td className="bg-white text-black">{item.fechaVenta}</td>
                                    <td className="bg-white text-black">{item.fechaEntrega}</td>
                                    <td className="bg-white text-black">{item.saldo}</td>
                                    <td className="bg-white text-black">{item.total}</td>

                                </tr>
                            ) : <h1 className='text-white'>Selecciona una empresa o Empresa no tiene RFQ</h1>}
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default Cobros