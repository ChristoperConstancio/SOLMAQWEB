import React, { useEffect, useState } from 'react'

import add from '../../assets/add.png'
import edit from '../../assets/editing.png'
import remove from '../../assets/remove.png'
import { addCobro, cobroCode } from '../../customHooks/Cobros'
import { getVentasNu } from '../../customHooks/Ventas'
function AgregarCobro() {

    const [cobro, setCobro] = useState([])
    const [venta, setVenta] = useState('')
    const [disponible, setDisponible] = useState(false)
    const salvar = async () => {
        const x = document.getElementById('monto').value;
        const confirmar = document.getElementById('confirmar').value;
        if(x !== confirmar || x == ''){
            alert("Montos no coinciden o vacios")
            return;
        }
        const date =  document.getElementById('fecha').value;
        const nuCobro =  document.getElementById('nuCobro').value;
        const nuVenta =  document.getElementById('nuVenta').value;

        setCobro({...cobro, fecha : date, nuVenta, nuCobro})
        setDisponible(true);
        alert("Ahora puedes hacer el cobro por $" + x)
    }
    const addCobros = async () => {
        const x = document.getElementById('monto').value;
        const confirmar = document.getElementById('confirmar').value;
        if(x !== confirmar || x == ''){
            alert("Montos no coinciden o vacios")
            return;
        }
        if(!disponible){
            alert("debes salvarlo primero");
            return;
        }
        const isSucc = await addCobro(cobro);
        if(!isSucc){
            alert("ocurrio un problema con el servidor");
            return false;
        }
        alert("agregado exitoso")
    }
    const cancel = () => {
        e.preventDefault();
        alert("Operacion Cancelada");
        navigate('/Ventas');
    }
    const handleInputChange = () =>{
        const x = document.getElementById('monto').value;
        const confirmar = document.getElementById('confirmar').value;
        if(x == confirmar){
            const cantidad = parseInt(venta.saldo) - parseInt(x);
            setCobro({...cobro, monto : x, saldo : cantidad})
        }
    }
    useEffect(() => {
        const getNumero = async () => {
            const idVenta = localStorage.getItem('nuVenta')
            const idCobro = await cobroCode();
            document.getElementById('nuVenta').value = idVenta
            document.getElementById('nuCobro').value = idCobro
            const ventaInfo = await getVentasNu(idVenta);
            // Verificar si ventaInfo tiene el atributo nuCobro
            if (ventaInfo && ventaInfo.nuCobro !== undefined) {
                // El atributo nuCobro está presente en ventaInfo
                document.getElementById('tipo').value = "Liquidacion"
                setCobro({...cobro, tipoPago : 'Liquidacion'});
            } else {
                // El atributo nuCobro no está presente en ventaInfo
                document.getElementById('tipo').value = "Anticipo"
                setCobro({...cobro, tipoPago : 'Anticipo'})

            }
            setVenta(ventaInfo);

        }
        const setFecha = () => {
            // Obtén la fecha actual
            const fechaActual = new Date();

            // Obtiene el año, mes y día
            const año = fechaActual.getFullYear();
            const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 al mes, ya que los meses van de 0 a 11
            const dia = fechaActual.getDate().toString().padStart(2, '0');

            // Formatea la fecha en el formato deseado
            const fechaFormateada = `${año}-${mes}-${dia}`;
            document.getElementById('fecha').value = fechaFormateada;
        }
        getNumero();
        setFecha();
    }, [])

    return (
        <div className='h-screen bg-black '>
            <div className='mx-20 py-10 grid grid-cols-2 gap-y-8 gap-x-8   ' id='add'>

                <div className='space-x-8 '>
                    <label htmlFor="" className='text-white text-3xl'>ID Pago :</label>
                    <input id='nuCobro' className='bg-slate-300 pl-3 rounded-lg w-72 h-10' type="text" readOnly />
                </div>
                <div className='space-x-8 '>
                    <label htmlFor="" className='text-white text-3xl'>Saldo :</label>
                    <input id='saldo' className='pl-3 rounded-lg w-72 h-10' value={venta.saldo} type="number" />
                </div>
                <div className='space-x-8 '>
                    <label htmlFor="" className='text-white text-3xl'>N° Venta :</label>
                    <input id='nuVenta' className='bg-slate-300  pl-3 rounded-lg w-72 h-10' type="text" readOnly />
                </div>

                <div className='space-x-8 '>
                    <label htmlFor="" className='text-white text-3xl'>Tipo de Pago :</label>
                    <input id='tipo' className='bg-slate-300  pl-3 rounded-lg w-72 h-10' type="text" readOnly />
                    
                </div>
                <div className='space-x-8 '>
                    <label htmlFor="" className='text-white text-3xl'>Fecha de Pago :</label>
                    <input id='fecha' className=' bg-slate-300 pl-3 rounded-lg w-72 h-10' type="text" readOnly />
                </div>
                <div className='space-x-8 '>
                    <label htmlFor="" className='text-white text-3xl'>Comprobante :</label>
                    <input className='pl-3 rounded-lg w-72 h-10' type="file" />
                </div>
                <div className='space-x-8 '>
                    <label htmlFor="" className='text-white text-3xl'>Monto :</label>
                    <input id='monto' className='pl-3 rounded-lg w-72 h-10' type="number" onChange={handleInputChange} />
                </div>
                <div className='space-x-8 '>
                    <label htmlFor="" className='text-white text-3xl'>Confirmar monto :</label>
                    <input id='confirmar' className='pl-3 rounded-lg w-72 h-10' type="number" onChange={handleInputChange}/>
                </div>
                <button
                onClick={salvar}
                    className="bg-green-500 hover:bg-green-800  rounded-xl text-white font-bold w-44 h-16"

                >
                    <h1 className="text-3xl" > Salvar </h1>
                </button>
            </div>
            <div className=" flex justify-center mx-44 space-x-16 mt-5">
                <button className="bg-red-500 hover:bg-red-800 rounded-xl text-white font-bold w-44 h-16"
                    onClick={cancel}>
                    <h1 className="text-3xl" > Cancelar </h1>
                </button>
                <button
                onClick={addCobros}
                    className="bg-amber-500 hover:bg-amber-800  rounded-xl text-white font-bold w-44 h-16"

                >
                    <h1 className="text-3xl" > Guardar </h1>
                </button>
            </div>
        </div>
    )
}

export default AgregarCobro