import React, { useEffect, useState } from 'react'
import back from '../assets/left-arrow.png'
import { Link } from 'react-router-dom';
import loupe from '../assets/loupe.png'
import { useNavigate } from 'react-router-dom';
import reset from '../assets/undo.png'
import add from '../assets/add.png'
import edit from '../assets/editing.png'
import remove from '../assets/remove.png'
import getClientes from '../customHooks/getClients';
import inactivateClient from '../customHooks/inactivateClient';
export default function Clientes() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([]);
    const target = document.getElementById('targetSearch');
    const [buttons, setButtonsState] = useState(false)
    const navigate = useNavigate();
    const modifyCustomer = () => {
        if (selectedRow == null) {

            alert('Elige un Cliente')
        } else {
            localStorage.setItem('id', selectedRow)
            navigate('/ModificarCliente')
        }
    }
    const inactivateclient = async() => {

        if (selectedRow == null) {
            alert('Elige un Cliente')
        } else {
            const validar = prompt("Escribe SI para eliminar y NO para cancelar");

            if (validar == "NO") return false;
            if (validar == "SI") {
                const isSuccesful = await inactivateClient(selectedRow)
                setFilteredData((prevData) => prevData.filter(item => item.id !== selectedRow));
                setData((prevData) => prevData.filter(item => item.id !== selectedRow));

                if (isSuccesful) alert("Borrado exitoso");
            }
        }
    }

    const toggleCheckbox = (id) => {
        if (selectedRow === id) {
            setSelectedRow(null); // Desmarca la fila si ya está seleccionada
        } else {
            setSelectedRow(id); // Marca la nueva fila
        }
    };

    const [filteredData, setFilteredData] = useState([]); // Mantener una copia de los datos originales

    const filter = () => {
        // Aplicar el filtro a la copia de los datos originales
        const filtered = data.filter((item) => {

            return item.Razonsocial === target.value;
        });

        // Actualizar el estado con los resultados del filtro
        setFilteredData(filtered);
    }
    const resetData = () => {
        setFilteredData();
        setFilteredData(data);
    }

    useEffect(() => {

        const searchT = async () => {
            let clientes = [];

            const listClients = await getClientes();

            if (Array.isArray(listClients)) {
                listClients.filter(item => {
                    if(item.Status === 'Activo'){
                        clientes.push(item)
                    }
                })

                setData(clientes)
                setFilteredData(clientes)

            } else {
                // Aquí puedes manejar el caso en el que no se encuentra el usuario
                console.log('no hay clientes');
                // Puedes mostrar un mensaje al usuario, por ejemplo.
            }

        }
        const setButtons = () => {
            const tipoUsuario = localStorage.getItem('tipo');
            if (tipoUsuario == '1' || tipoUsuario == '2') {
                setButtonsState(true);
            }
        }
        searchT();
        setButtons();

    }, [])

    return (
        <>
            <div className='space-x-8 px-7  bg-black  flex text-left'>
                <div className=' w-full' >
                    <h1 className='text-white font-bold text-4xl'>Clientes</h1>
                    <h2 className='text-white font-bold '>Clientes Registrados</h2>
                </div>
                <div className='w-full text-right space-y-3'>
                    <div className='flex justify-end space-x-3'>
                        <button onClick={resetData}>
                            <img src={reset} alt="" className='h-6 w-6' />
                        </button>
                        <input type="text"
                            placeholder='Buscar por razon social'
                            className='rounded-xl bg-slate-300 text-black placeholder-gray-600 text-left pl-4 h-7'
                            id='targetSearch'
                        />
                        <button onClick={filter} >
                            <img src={loupe} alt="" className=' h-7 w-7 rounded-lg' />
                        </button>
                    </div>
                    {buttons ?
                        <div className='flex h-6 space-x-3 ml-16'>
                            <Link to={'/AgregarCliente'}>
                                <div className='bg-green-400 rounded-xl w-10 flex justify-center h-full items-center'>
                                    <img src={add} alt="" className='h-4 w-4' />
                                </div>
                            </Link>
                            <button onClick={modifyCustomer}>
                                <div className='bg-amber-400 rounded-xl w-10 flex justify-center h-full items-center'>
                                    <img src={edit} alt="" className='h-4 w-4' />
                                </div>
                            </button>
                            <button onClick={inactivateclient}>
                                <div className='bg-red-400 rounded-xl w-10 flex justify-center h-full items-center'>
                                    <img src={remove} alt="" className='w-4 h-4' />
                                </div>
                            </button>
                        </div>
                        : <h1></h1>
                    }
                </div>
            </div>
            <div className="bg-black text-black p-4 h-screen">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-yellow-500 h-10 ">
                            <th></th>
                            <th>Razon Social</th>
                            <th>RFC</th>
                            <th>Direccion</th>
                            <th>Contacto</th>
                            <th>Status</th>
                            <th>Correo</th>
                            <th>Telefono</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredData
                            .filter(item => item.Status === 'Activo')
                            .map((item, index) =>
                                <tr key={item.RFC} className='text-center'>
                                    <td className="bg-white text-black">
                                        <input
                                            type="radio"
                                            checked={selectedRow === item.RFC}
                                            onChange={() => toggleCheckbox(item.RFC)}
                                        />
                                    </td>
                                    <td className="bg-white text-black">{item.Razonsocial}</td>
                                    <td className="bg-white text-black">{item.RFC}</td>
                                    <td className="bg-white text-black">{item.Direccion}</td>
                                    <td className="bg-white text-black">{item.Contacto}</td>
                                    <td className="bg-white text-black">{item.Status}</td>
                                    <td className="bg-white text-black">{item.Correo}</td>
                                    <td className="bg-white text-black">{item.Telefono}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </>

    )
}
