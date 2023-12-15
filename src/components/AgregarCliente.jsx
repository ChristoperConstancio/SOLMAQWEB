import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
export default function AgregarCliente() {
    const razonsocial = document.getElementById('razonsocial');
    const rfc = document.getElementById('rfc');
    const direccion = document.getElementById('direccion');
    const contacto = document.getElementById('contacto');
    const correo = document.getElementById('correo');
    const telefono = document.getElementById('telefono');
    const navigate = useNavigate();
    const cancel = (e) => {
        e.preventDefault();
        alert("Operacion Cancelada");
        navigate('/Clientes');
    }
    const addClient = async (e) => {
        e.preventDefault();
        const db = getFirestore();
        const usersRef = collection(db, "Clientes");

        try {
            if (!razonsocial.value || !rfc.value || !direccion.value || !contacto.value || !correo.value || !telefono.value) {
                alert('Llena todos los campos');
            } else {
                await addDoc(usersRef, {
                    Razonsocial: razonsocial.value,
                    RFC: rfc.value,
                    Direccion: direccion.value,
                    Contacto: contacto.value,
                    Correo: correo.value,
                    Telefono : telefono.value,
                    Status: 'Activo'
                });
                alert('Cliente Creado')
                razonsocial.value = '';
                rfc.value = '';
                direccion.value = '';
                contacto.value = '';
                correo.value = '';
                telefono.value ='';
                navigate('/Clientes')

            }

        } catch (error) {
            alert('Error al crear cliente')
        }


    }

    return (
        <div className='h-screen bg-black space-y-8 px-20'>
            <h1 className='font-bold text-white text-3xl text-center'>Agregar Cliente</h1>
            <form>
                <div className='grid grid-rows-3 grid-cols-2 items-center mx-5 space-y-10 ' >

                    <div className='space-x-5 flex '>
                        <h1 className="text-white text-3xl">Razon Social: </h1>
                        <input type="text"
                            id='razonsocial'
                            className='bg-slate-300 w-80 rounded-lg h-10 pl-3'
                        />
                    </div>
                    <div className='space-x-5 flex '>
                        <h1 className="text-white text-3xl">RFC : </h1>

                        <input type="text"
                            id='rfc'
                            className='bg-slate-300 w-80 rounded-lg h-10 pl-3'
                        />
                    </div>
                    <div className='space-x-4 flex'>
                        <h1 className="text-white text-3xl">Direccion: </h1>
                        <input type="text"
                            id='direccion'
                            className='bg-slate-300 w-80 rounded-lg h-10 pl-3'
                        />
                    </div>
                    <div className='space-x-4 flex'>
                        <h1 className="text-white text-3xl">Contacto: </h1>

                        <input type="text"
                            id='contacto'
                            className='bg-slate-300 w-80 rounded-lg h-10 pl-3'
                        />
                    </div>

                    <div className='space-x-5 flex  items-center'>
                        <h1 className="text-white text-3xl">Correo : </h1>
                        <input type="text"
                            id='correo'
                            className='bg-slate-300 w-80 rounded-lg h-10 pl-3'
                        />
                    </div>
                    <div className='space-x-5 flex  items-center'>
                        <h1 className="text-white text-3xl">Telefono : </h1>
                        <input type="number"
                            id='telefono'
                            className='bg-slate-300 w-80 rounded-lg h-10 pl-3'
                        />
                    </div>
                </div>
                <div className="my-10 flex justify-center mx-44 space-x-16">
                    <button className="bg-red-500 rounded-xl text-white font-bold w-44 h-16"
                            onClick={cancel}
                            >
                        <h1 className="text-3xl" > Cancelar </h1>
                            
                    </button>
                    <button
                        className="bg-amber-500 rounded-xl text-white font-bold w-44 h-16"
                        onClick={addClient}
                    >
                        <h1 className="text-3xl" > Guardar </h1>
                    </button>
                </div>

            </form>
        </div>
    )
}
