import React, { useEffect, useState } from 'react'
import { editarVentas, getVentasNu } from '../../customHooks/Ventas';
import getClientes from '../../customHooks/getClients';
import { useNavigate } from 'react-router-dom';
import { fetchRFQ, fetchRFQV, fetchRFQVenta } from '../../customHooks/RFQ';

function VentasEditar() {
    const [rfq, setRfq] = useState([])
    const navigate = useNavigate();
    const editVenta = async () => {
        const fecha = document.getElementById('fechaEntrega').value;
        const data = localStorage.getItem('nuVenta');
        const isSucces = await editarVentas(data, fecha)
        if(!isSucces) return false;
        alert("Cambio exitoso")
        navigate('/Ventas')
    }
    
    const cancel = () => {
        e.preventDefault();
        alert("Operacion Cancelada");
        navigate('/Ventas');
    }



    useEffect(() => {
        const getVentas = async () => {
            const data = localStorage.getItem('nuVenta');
            const datos = await getVentasNu(data);
            document.getElementById('nuVentaInput').value = datos.nuVenta;
            document.getElementById('razon').value = datos.RFC.substring(0, 4);
            document.getElementById('subtotal').value = datos.subtotal;
            document.getElementById('iva').value = datos.iva;
            document.getElementById('total').value = datos.total;
            document.getElementById('fechaVenta').value = datos.fechaVenta;
            document.getElementById('fechaEntrega').value = datos.fechaEntrega;
            const info = await fetchRFQVenta(datos.RFC);
            const filterData = info.filter(item => item.state == "Activo")
            setRfq(filterData);
        }


        const getRFQ = async () => {
            const venta = localStorage.getItem('nuVenta');
            const data = await fetchRFQV(venta);
            const filterData = data.filter(item => item.state == "vendido")
            setRfq(filterData);

        }
        
        getRFQ();
        getVentas();


    }, [])



    return (
        <div>
            <div className='h-screen bg-black overflow-y-auto  text-center mx-auto'>
                <h1 className='text-white text-3xl'>Editar Venta</h1>

                <div className='mx-20 py-10 grid grid-cols-2 gap-y-8 gap-x-8   ' id='add'>

                    <div className='space-x-8 '>
                        <label htmlFor="" className='text-white text-3xl'>Codigo de venta :</label>
                        <input id='nuVentaInput' className='bg-slate-200 pl-3 rounded-lg w-72 h-10' type="text" readOnly />
                    </div>

                    <div className='space-x-8'>
                        <label htmlFor="" className='text-white text-3xl'>Fecha de Venta :</label>
                        <input id='fechaVenta' className='pl-3 rounded-lg w-72 h-10' type="date" readOnly />
                    </div>
                    <div className='space-x-8'>
                        <label htmlFor="" className='text-white text-3xl'>Fecha de entrega :</label>
                        <input id='fechaEntrega' className=' pl-3 rounded-lg w-72 h-10' type="date"  />
                    </div>
                    <div className='space-x-8'>
                        <label htmlFor="" className='text-white text-3xl'>Subtotal :</label>
                        <input id='subtotal' className='pl-3 rounded-lg w-72 h-10' type="text" readOnly />
                    </div>
                    <div className='space-x-8'>
                        <label htmlFor="" className='text-white text-3xl'>IVA 16% : </label>
                        <input id='iva' className='pl-3 rounded-lg w-72 h-10' type="text" readOnly />
                    </div>
                    <div className='space-x-8'>
                        <label htmlFor="" className='text-white text-3xl'>Total :</label>
                        <input id='total' className='pl-3 rounded-lg w-72 h-10' type="text" readOnly />
                    </div>
                    <div className='space-x-8'>
                        <label htmlFor="" className='text-white text-3xl'>Razon Social :</label>
                        <input id='razon' className='pl-3 rounded-lg w-72 h-10' type="text" readOnly />

                    </div>
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
        {rfq ?
            rfq.map((item, index) =>
                <tr key={item.Id_rfq} className='text-center'>
                    <td></td>
                    <td className="bg-white text-black">{item.Id_rfq}</td>
                    <td className="bg-white text-black">{item.esPz.toString()}</td>
                    <td className="bg-white text-black">{item.esMant.toString()}</td>
                    <td className="bg-white text-black">{item.Total}</td>
                </tr>
            ) : <h1 className='text-white'>Selecciona una empresa o Empresa no tiene RFQ</h1>}
    </tbody>
</table>
</div>
                <div className=" flex justify-center mx-44 space-x-16 mt-5">
                    <button className="bg-red-500 hover:bg-red-800 rounded-xl text-white font-bold w-44 h-16"
                    onClick={cancel}
                    >
                        <h1 className="text-3xl" > Cancelar </h1>
                    </button>
                    <button
                        className="bg-amber-500 hover:bg-amber-800  rounded-xl text-white font-bold w-44 h-16"
                    onClick={editVenta}
                    >
                        <h1 className="text-3xl" > Guardar </h1>
                    </button>
                </div>

            </div>
            
        </div>
    )
}

export default VentasEditar