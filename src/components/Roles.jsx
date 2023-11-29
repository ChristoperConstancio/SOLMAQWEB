import React, { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs, addDoc,query, where, doc, updateDoc } from "firebase/firestore";
import fetchData from '../customHooks/getRoles';
function Roles() {

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [filteredData, setFilteredData] = useState([])
    const rolnew = document.getElementById('rolnew');
    const roledit = document.getElementById('roledit');

    const addRol = async () => {
        const db = getFirestore();
        const rolesRef = collection(db, "Roles");
        const q = query(rolesRef, where("cargo", "==", rolnew.value));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.size > 0 ) {
            alert('El rol ya existe!!');
            return false;
        }
        if (rolnew.value == '') {
            alert('Introduce un rol antes de guardar')
        } else {
            try {
                await addDoc(rolesRef, {
                    cargo: rolnew.value
                });
                alert('Rol Creado')
                rolnew.value = '';
            } catch (error) {

            }
        }
    }
    const editRol = async () => {
        const db = getFirestore();
        const rolesRef = collection(db, "Roles");
        console.log(selectedOption)
        if (roledit.value == '' || selectedOption == null) {
            alert('ups... Hay un campo vacio')
        } else {
            const q = query(rolesRef, where("cargo", "==", selectedOption));

            try {

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async (queryDocumentSnapshot) => {
                    const docRef = doc(rolesRef, queryDocumentSnapshot.id);

                    // Realiza la actualización del atributo del documento
                    const updateData = {
                        cargo: roledit.value
                    };

                    await updateDoc(docRef, updateData);
                })
                alert('Actualizacion Exitosa!')
                roledit.value = '';

            } catch (error) {
                alert("ups... Ha ocurrido un error")
            }   
        }
    }

    const obtenerDatos = async () => {
        try {
            const datos = await fetchData();
            setOptions(datos); // Asigna el resultado al estado "data"
            setFilteredData(datos)
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    const changeInter = () => {
        const divAdd = document.getElementById('addRol')
        const divEdit = document.getElementById('divEdit')
        divEdit.classList.add('hidden')
        divAdd.classList.remove('hidden')
        divAdd.classList.add('flex')
    }
    const changeInter2 = () => {
        const divAdd = document.getElementById('addRol')
        const divEdit = document.getElementById('divEdit')
        divAdd.classList.add('hidden')
        divEdit.classList.remove('hidden')
        divEdit.classList.add('flex')
        obtenerDatos();
    }

    return (
        <div className='h-screen bg-black'>
            <div>
            <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-yellow-500 h-10 ">
                            <th></th>
                            <th>Cargo</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData
                                .map((item, index) =>
                                    <tr key={item.nombreUsuario} className='text-center'>
                                        

                                        <td className="bg-white text-black">{index}</td>
                                        <td className="bg-white text-black">{item.cargo}</td>


                                    </tr>


                                )}
                    </tbody>
                </table>
            </div>
            <div className='text-center'>
                <h1 className='text-white font-bold text-4xl'>Gestionar Roles</h1>
            </div>
            <div className='text-center mt-10 space-x-7'>
                <button
                    className='bg-green-500 w-32 rounded-lg h-16 text-white font-bold hover:bg-green-800'
                    onClick={changeInter}
                >Agregar</button>
                <button
                    className='bg-amber-500 hover:bg-amber-800 w-32 rounded-lg h-16 text-white font-bold'
                    onClick={changeInter2}
                >Editar</button>
            </div>

            <div id='addRol' className='hidden mx-5 justify-center  mt-10 space-x-10'>
                <label htmlFor="" className='text-white text-3xl'> Nuevo Rol : </label>
                <input type="text"
                    className=' bg-slate-300 w-80 rounded-lg h-10 ml-5 placeholder-slate-950 pl-2'
                    placeholder='Introduce el nuevo rol'
                    id='rolnew'
                />
                <button
                    className='bg-green-800 hover:bg-green-500 w-32 rounded-lg text-green-100 font-bold h-10'
                    onClick={addRol}
                >Agregar</button>

            </div>
            <div id='divEdit' className='hidden mx-5 justify-center  mt-10 space-x-10'>
                <label htmlFor="" className='text-white text-3xl'> De :  </label>
                <select
                    className="bg-slate-300 rounded-lg w-60 h-10 "
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="">Selecciona una opción</option>
                    {options.map((item, index) => (
                        <option key={index} value={item.cargo}>
                            {item.cargo}
                        </option>
                    ))}
                </select>
                <label htmlFor="" className='text-white text-3xl'> a : </label>
                <input type="text"
                    className=' bg-slate-300 w-80 rounded-lg h-10 ml-5 placeholder-slate-950 pl-2'
                    placeholder='Introduce el nuevo rol'
                    id='roledit'
                />
                <button
                    className='bg-amber-800 hover:bg-amber-500 w-32 rounded-lg text-green-100 font-bold h-10'
                    onClick={editRol}
                >Editar</button>
            </div>
        </div>
    )
}

export default Roles