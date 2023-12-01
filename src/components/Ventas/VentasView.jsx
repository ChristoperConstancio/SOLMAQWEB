import React, { useEffect, useState } from 'react'
import { fetchRFQV } from '../../customHooks/RFQ';
import { getVentasNu } from '../../customHooks/Ventas';
import add from '../../assets/add.png'
import edit from '../../assets/editing.png'
import remove from '../../assets/remove.png'
function VentasView() {
    const [rfq, setRfq] = useState([])
    const [selectedRow, setSelectedRow] = useState()
    useEffect(() => {
        const getRFQ = async () => {
            const venta = localStorage.getItem('nuVenta');
            const data = await fetchRFQV(venta);
            console.log(data)
            const filterData = data.filter(item => item.state == "vendido")
            setRfq(filterData);

        }
        
        const getVentas = async () => {
            const data = localStorage.getItem('nuVenta');
            const datos = await getVentasNu(data);
            document.getElementById('nuVentaInput').value = datos.nuVenta;
            document.getElementById('razonInput').value = datos.RFC;
            document.getElementById('subtotalInput').value = datos.subtotal;
            document.getElementById('ivaInput').value = datos.iva;
            document.getElementById('totalInput').value = datos.total;
            document.getElementById('fechaVentaInput').value = datos.fechaVenta;
            document.getElementById('fechaEntregaInput').value = datos.fechaEntrega;
        }
        getRFQ();
        getVentas();
    }, [])

    return (
        <div className='h-screen bg-black '>
            <div className='grid grid-cols-4 justify-center space-x-5 space-y-5 mx-5'>
                <label className='text-white pt-5 pl-5' htmlFor="">N° Venta : </label>
                <input className='pl-2 rounded-lg w-32 bg-slate-400 text-black' type="text" readOnly id='nuVentaInput' />
                <label className='text-white ' htmlFor=""> Razon Social: </label>
                <input className='pl-2 rounded-lg w-52 bg-slate-400 text-black' type="text" readOnly id='razonInput' />
                <label className='text-white ' htmlFor="">Subtotal : </label>
                <input className='pl-2 rounded-lg w-32 bg-slate-400 text-black' type="text" readOnly id='subtotalInput' />
                <label className='text-white ' htmlFor="">IVA : </label>
                <input className='pl-2 rounded-lg w-32 bg-slate-400 text-black' type="text" readOnly id='ivaInput' />
                <label className='text-white ' htmlFor="">Total : </label>
                <input className='pl-2 rounded-lg w-32 bg-slate-400 text-black' type="text" readOnly id='totalInput' />
                <label className='text-white ' htmlFor="">Fecha de Venta : </label>
                <input className='pl-2 rounded-lg w-32 bg-slate-400 text-black' type="text" readOnly id='fechaVentaInput' />
                <label className='text-white ' htmlFor="">Fecha de Entrega : </label>
                <input className='pl-2 rounded-lg w-32 bg-slate-400 text-black' type="text" readOnly id='fechaEntregaInput' />

            </div>
            <div className='flex justify-center items-center space-x-5 '>

                <button >
                    <div className='bg-red-500 rounded-xl w-10 flex justify-center h-10 items-center'>
                        <img src={remove} alt="" className='w-4 h-4' />
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
                        {rfq ?
                            rfq.map((item, index) =>
                                <tr key={item.Id_rfq} className='text-center'>
                                    <td className="bg-white text-black">
                                        <input
                                            type="radio"
                                            checked={selectedRow === item.Id_rfq}
                                            // onChange={() => toggleCheckbox(item)}
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
    )
}

export default VentasView