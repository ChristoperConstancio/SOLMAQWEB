import React, { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import editUser from '../customHooks/editDoc';
import editingUser from '../customHooks/editingUser';
import fetchData from '../customHooks/getRoles';
import { useNavigate } from 'react-router-dom';
import { getUserRol } from '../customHooks/getRol';
export default function EditarUsuario() {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        status: '',
        rol: '',
        idUser: ''
    })
    const cancelAction = (e) => {
        e.preventDefault();
        alert("Operacion Cancelada");
        navigate('/Usuarios');
    }

    const upUser = (e) => {
        e.preventDefault();
        const updateUser = editingUser(data.id, data);
        if (updateUser) alert("Actualizacion Exitosa!")
        if (!updateUser) alert("Hubo un problema ")
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setData({
                ...data,
                [name]: value,
            });
    };
    const handleChange = (e) => {
        const value = e.target.value;

        // Invoca la función setSelectedOption para actualizar el estado
        setSelectedOption(value);

        setData({
            ...data,
            rol: value // Actualiza el valor correspondiente en el objeto de estado
        });
    };
    useEffect(() => {

        const obtenerDatos = async () => {
            try {
                const datos = await fetchData(); // Llama a la función fetchData
                setOptions(datos); // Asigna el resultado al estado "data"
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        const updateUser = async () => {
            const iden = localStorage.getItem('id');
            const { apellidoPaterno, apellidoMaterno, nombreUsuario, rol, nombre, status, idUser } = await editUser(iden);
            const { cargo } = await getUserRol(rol);

            setData({
                nombre,
                apellidoMaterno,
                apellidoPaterno,
                status,
                rol:cargo,
                nombreUsuario,
                idUser
            })
        }
        obtenerDatos();
        updateUser();
    }, []);
    return (
        <div className='h-screen bg-black space-y-8 '>
            <h1 className='font-bold text-white text-3xl text-center'>Editar Usuario</h1>
            <form action="click">
                <div className='grid grid-rows-3 grid-cols-2 items-center justify-center  mx-20 gap-y-4 ' >

                    <div className='space-x-10 flex '>
                        <h1 className="text-white text-3xl">Usuario: </h1>
                        <input type="text"
                            id='username'
                            name='nombreUsuario'
                            className='bg-slate-300 w-80 rounded-lg h-10 pl-3 placeholder-black'
                            placeholder={data.nombreUsuario}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className='space-x-5 flex  items-center'>
                        <h1 className="text-white text-3xl">Apellido <br /> Paterno : </h1>

                        <input type="text"
                            id='paterno'
                            name='apellidoPaterno'
                            className='bg-slate-300 w-80 rounded-lg h-10 pl-3 placeholder-black'
                            placeholder={data.apellidoPaterno}
                            onChange={handleInputChange}


                        />
                    </div>
                    <div className='space-x-4 flex'>
                        <h1 className="text-white text-3xl">Status: </h1>
                        <select
                            id='status'
                            name='status'
                            className="bg-slate-300 rounded-lg w-60 h-10 placeholder-black"
                            onChange={handleInputChange}

                        >
                            <option >{data.status}</option>
                            <option value="inactivo"> Inactivo</option>
                        </select>
                    </div>
                    <div className='space-x-4 flex'>
                        <h1 className="text-white text-3xl">Nombre: </h1>

                        <input type="text"
                            id='nombre'
                            name='nombre'
                            className='bg-slate-300 w-80 rounded-lg h-10 pl-3 placeholder-black'
                            placeholder={data.nombre}
                            onChange={handleInputChange}


                        />
                    </div>
                    <div className='space-x-5 flex  items-center'>
                        <h1 className="text-white text-3xl">Apellido <br /> Materno : </h1>
                        <input type="text"
                            id='materno'
                            name='materno'
                            className='bg-slate-300 w-80 rounded-lg h-10 pl-3 placeholder-black'
                            placeholder={data.apellidoMaterno}
                            onChange={handleInputChange}


                        />
                    </div>
                    <div className='space-x-12 flex'>
                        <h1 className="text-white text-3xl">Rol: </h1>

                        <select
                            name='rol'
                            value={selectedOption}
                            className="bg-slate-300 rounded-lg w-60 h-10 placeholder-black"
                            onChange={handleChange}

                        >
                            <option value={data.rol}> {data.rol}</option>
                            {options
                            .filter(item => item.cargo != data.rol)
                            .map((item, index) => (
                                <option key={index} value={item.cargo}>
                                    {item.cargo}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                <div className="my-10 flex justify-center mx-44 space-x-16" >
                    <button className="bg-red-500 rounded-xl text-white font-bold w-44"
                        onClick={cancelAction}>
                        Cancelar
                    </button>
                    <button
                        className="bg-amber-500 rounded-xl text-white font-bold w-44 h-16"
                        onClick={upUser}
                    >
                        Guardar
                    </button>
                </div>
            </form>

        </div>
    )
}
