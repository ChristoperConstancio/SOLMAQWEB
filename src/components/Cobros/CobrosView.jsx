import React, { useEffect, useState } from 'react'
import { fetchCobros } from '../../customHooks/Cobros'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Reportes from '../../customHooks/Reportes';
import editClient from '../../customHooks/editClient';
import { getVentasNu } from '../../customHooks/Ventas';
import edit from '../../assets/editing.png'
import { useNavigate } from 'react-router-dom';
function CobrosView() {
    const [cobros, setCobros] = useState([])
    const [verPDF, setVerPDF] = useState(false)
    const [cliente, setClientes] = useState("")
    const [venta, setVenta] = useState()
    const [selectedRow, setSelectedRow] = useState()
    const navigate = useNavigate();
    const modify = () => {
        if (selectedRow != undefined) {
            localStorage.setItem('nuCobro', selectedRow)

            navigate("/EditarCobros");
        } else {
            alert("selecciona un cobro")
            return;
        }
    }
    const toggleCheckbox = (item) => {
        setSelectedRow(item)
    }
    useEffect(() => {
        const getCobros = async () => {
            const data = await fetchCobros();
            const filter = localStorage.getItem('nuVenta');
            const dataFiltered = data.filter(item => item.nuVenta == filter)
            setCobros(dataFiltered);
        }
        const getClientes = async () => {
            const filter = localStorage.getItem('nuVenta');
            setVenta(filter)
            const venta = await getVentasNu(filter)
            const data = await editClient(venta.RFC)
            setClientes(data);
        }
        getClientes();
        getCobros();
    }, [])

    return (

        <div className='h-screen bg-black space-y-10'>
            <div className='flex justify-between mx-10'>
                <div >
                    <h1 className='text-white font-bold text-4xl'>Cobros</h1>
                    <h1 className='text-white font-bold text-2xl'>Registrados</h1>
                </div>
                <div>

                    <div>
                        <h1 className='text-white text-xl ' >Numero de venta : {venta} </h1>
                        <h1 className='text-white text-xl ' >Empresa : {cliente.Razonsocial} </h1>

                    </div>
                </div>
            </div>
            <div className=' rounded-xl w-full flex justify-center h-10  '>

                <button onClick={modify} className='bg-amber-400 w-10 rounded-xl pl-3'>
                    <img src={edit} alt="" className='h-5 w-5 ' />
                </button>
            </div>
            <div className=' mx-10 '>


                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-yellow-500 h-10 ">
                            <th></th>
                            <th>N° Cobro</th>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Monto</th>
                            <th>Saldo</th>

                        </tr>
                    </thead>
                    <tbody>
                        {cobros ?
                            cobros.map((item, index) =>
                                <tr key={item.nuCobro} className='text-center'>
                                    <td className="bg-white text-black">
                                        <input
                                            type="radio"
                                            checked={selectedRow === item.nuCobro}
                                            onChange={() => toggleCheckbox(item.nuCobro)}
                                        />
                                    </td>
                                    <td className="bg-white text-black">{item.nuCobro}</td>
                                    <td className="bg-white text-black">{item.fecha}</td>
                                    <td className="bg-white text-black">{item.tipoPago}</td>
                                    <td className="bg-white text-black">{item.monto}</td>
                                    <td className="bg-white text-black">{item.saldo}</td>
                                </tr>
                            ) : <h1 className='text-white'>Selecciona una empresa o Empresa no tiene RFQ</h1>}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center'>
                {cobros && cliente ?
                    <PDFDownloadLink document={<Reportes informacion={cobros} cliente={cliente} />}
                        fileName='SOLMAQ-REPORTE.pdf'>
                        <button  >
                            <div className='bg-purple-400 rounded-xl w-44 flex justify-center h-full items-center'>
                                <h1>Generar Reporte</h1>
                            </div>
                        </button>
                    </PDFDownloadLink>
                    : <h2>Hola</h2>}
            </div>
        </div>
    )
}

export default CobrosView