import React, { useEffect, useState } from 'react'
import getClientes from '../../customHooks/getClients'
import fetchRFQ from '../../customHooks/RFQ'

function AgregarRFQ() {
    const [rfq, setRfq] = useState()
    const [filteredData, setFilteredData] = useState()
    const [optionsCustomer, setOptionsCustomer] = useState([]);
    const pieza = document.getElementById("pieza");
    const servicio = document.getElementById("servicio");
    const razon = document.getElementById("rsocial");


    const cancel = (e) => {
        e.preventDefault();
        alert("Operacion Cancelada");
        navigate('/RFQ');
    }
    const filter = (e) => {
        setFilteredData(rfq.filter (item => item.RFC == e.target.value))
    }
    const addRFQ = (e) => {
        const { name , value} = e.target;
        if(servicio.value == "default" || pieza.value != "default" || razon == "default"){
            alert("Hay campos sin llenar");
            return false;
        }
        if( name == "servicio" && value == true ){
            navigate("/RFQServicio")
        }else{
            navigate("/RFQMantenimiento");
        }
    }
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        if(name == "servicio" && value == "true"){
            pieza.value = "false";
        }else{
            servicio.value = "false";
        }
       
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
        <div className='h-screen bg-black mx-auto text-center space-y-8'>
            <h1 className='text-4xl text-white font-bold'>Agregar RFQ</h1>
            <div className='flex justify-center items-center space-x-8 '>
                <label className='text-white text-3xl'>Piezas: </label>
                <select name="pieza" id="pieza" className='w-52 rounded-md'
                        onClick={handleSelectChange}>
                    <option value="default">Selecciona</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className='flex justify-center items-center space-x-8 '>
                <label className='text-white text-3xl'>Servicio: </label>
                <select name="servicio" id="servicio" className='w-52 rounded-md'
                onClick={handleSelectChange}>
                    <option value="default">Selecciona</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
            </div>
             <div className='flex justify-center items-center space-x-8 '>
                <label className='text-white text-3xl'>Razon Social: </label>
                <select               
                            id='rsocial'
                            className=" rounded-lg  h-7 w-52"
                            onChange={filter}
                        >
                            <option value="default">Selecciona una opción</option>

                            { optionsCustomer ? optionsCustomer.map((item, index) => (
                                <option key={index} value={item.RFC}>
                                    {item.Razonsocial}
                                </option>
                            )) : <h1  className='text-white'> No se encontraron clientes</h1>}
                        </select>
            </div>
            <div className="my-10 flex justify-center mx-44 space-x-16">
                    <button className="bg-red-500 rounded-xl text-white font-bold w-44 h-16"
                        onClick={cancel}
                    >
                        <h1 className="text-3xl" > Cancelar </h1>

                    </button>
                    <button
                        className="bg-amber-500 rounded-xl text-white font-bold w-44 h-16"
                        onClick={addRFQ}
                    >
                        <h1 className="text-3xl" > Guardar </h1>
                    </button>
                </div>
        </div>
    )
}

export default AgregarRFQ