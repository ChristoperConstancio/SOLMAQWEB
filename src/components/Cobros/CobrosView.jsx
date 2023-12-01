import React, { useEffect, useState } from 'react'
import { fetchCobros } from '../../customHooks/Cobros'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Reportes from '../../customHooks/Reportes';
import editClient from '../../customHooks/editClient';
import { getVentasNu } from '../../customHooks/Ventas';
import logo from '../../assets/SOLMAQ.png'
function CobrosView() {
    const [cobros, setCobros] = useState([])
    const [verPDF, setVerPDF] = useState(false)
    const [cliente, setClientes] = useState()
    const generateReport = () => {
        setVerPDF(!verPDF)
    }
    useEffect(() => {
        const getCobros = async () => {
            const data = await fetchCobros();
            const filter = localStorage.getItem('nuVenta');
            const dataFiltered = data.filter(item => item.nuVenta == filter)
            setCobros(dataFiltered);
        }
        const getClientes = async() => {
            const filter = localStorage.getItem('nuVenta');
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
                <div>
                <h1 className='text-white font-bold text-4xl'>Cobros</h1>
                <h1 className='text-white font-bold text-2xl'>Registrados</h1>
                </div>
                <div>
                    {cobros && cliente ? 
                    <PDFDownloadLink document={<Reportes informacion={cobros} cliente={cliente}/>} 
                    fileName='SOLMAQ-REPORTE.pdf'>
                <button  >
                    <div className='bg-purple-400 rounded-xl w-44 flex justify-center h-full items-center'>
                       <h1>Generar Reporte</h1>
                    </div>
                </button>
                </PDFDownloadLink>
                :  <h2>Hola</h2>}
                </div>
            </div>
            <div className=' mx-10'>

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
                                <tr key={item.Id_rfq} className='text-center'>
                                    <td className="bg-white text-black">
                                        <input
                                            type="radio"
                                            // checked={selectedRow === item.Id_rfq}
                                        // onChange={() => toggleCheckbox(item)}
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
            <div>
                {/* { verPDF ?
                    <PDFViewer style={{width: "100%", height:"90vh"}}>
                        <Reportes informacion={cobros} cliente={cliente}/>
                    </PDFViewer>
                    :  <h1>Hola</h1>
                } */}
            </div>
        </div>
    )
}

export default CobrosView