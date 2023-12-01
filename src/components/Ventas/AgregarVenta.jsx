import React, { useEffect, useState } from 'react'
import getClientes from '../../customHooks/getClients'
import { fetchRFQ } from '../../customHooks/RFQ'
import { addVentaRFQ, addVentas, sellCode } from '../../customHooks/Ventas'
import { useNavigate } from 'react-router-dom'

function AgregarVenta() {
  const [optionsCustomer, setOptionsCustomer] = useState([])
  const [rfq, setRfq] = useState([])
  const [dataF, setDataF] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [idVenta, setIdVenta] = useState()
  const [total, setTotal] = useState(0)
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nuVenta: '',
    fechaVenta: '',
    fechaEntrega: '',
    subtotal: '',
    iva : '',
    total : '',
    RFC: '',
    username,
    rfqs : '',
    state: 'Activo',
    saldo : ''
  })

  const toggleCheckbox = (e) => {
    setSelectedRow((prevSelectedRows) => {
      // Verifica si el ID ya está en el array
      const isSelected = prevSelectedRows.includes(e.Id_rfq);

      // Usa el evento para determinar si el checkbox se está activando o desactivando
      const isActivating = !isSelected;
      if(isActivating){
        const totalT = total + parseInt(e.Total);
        setTotal(totalT)
        setFormData({...formData, subtotal : totalT , total : totalT + (totalT*.16), iva : totalT*.16, saldo : totalT+ (totalT*.16)})
      }else{
        const totalT = total - parseInt(e.Total);
        setTotal(totalT)
        setFormData({...formData, subtotal : total - totalT, total : totalT+ (totalT*.16) ,iva : totalT*.16, saldo : totalT+ (totalT*.16)})
      }
    
      // Actualiza el array de IDs seleccionados
      return isActivating
        ? [...prevSelectedRows, e.Id_rfq]
        : prevSelectedRows.filter((rowId) => rowId !== e.Id_rfq);
    });
    setFormData({...formData, rfqs : selectedRow})
  }
 
  const cancel = () => {
    e.preventDefault();
    alert("Operacion Cancelada");
    navigate('/Ventas');
  }

  const filter = (e) => {
    // setSelectedRow();
    // setTotal()

    const dataFiltered = rfq.filter(item => item.RFC === e.target.value)
    setDataF(dataFiltered)
    const divRFQ = document.getElementById('RFQS');
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    divRFQ.classList.remove('hidden');
    divRFQ.classList.add('block');
  }



  const addVentaFire = async() => {
    const requiredFields = ['nuVenta', 'fechaVenta', 'fechaEntrega', 'subtotal','total','iva', 'rfqs'];
    
    setFormData(prevData => {
      const updatedData = {
        ...prevData,
        rfqs: selectedRow,
      };
    
      console.log(updatedData); // Imprime los rfqs actualizados
    
      return updatedData; // Devuelve el nuevo estado actualizado
    });
    if (requiredFields.some(field => !formData[field])) {
      alert('Por favor, vuelve a guardar .');
      return;
    }
    const isSuccesful = await addVentas(formData);
    const isSuccesfulRFQS = await addVentaRFQ(selectedRow, formData.nuVenta)
    if(isSuccesful && isSuccesfulRFQS){
      alert('Ventra agregada!');
      navigate('/Ventas')
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }
  useEffect(() => {

    const getCustomers = async () => {
      const customers = await getClientes();
      setOptionsCustomer(customers)
    }
    const getRFQ = async () => {
      const data = await fetchRFQ();
      const filterData = data.filter(item => item.state == "Activo")
      setRfq(filterData);
    }
    const getSellCode = async () => {
      const maxID = await sellCode();
      setIdVenta(maxID)
      setFormData({...formData, nuVenta : maxID})
    }
    getRFQ();
    getCustomers();
    getSellCode();
  }, [])

  return (
    <div>
      <div className='h-screen bg-black overflow-y-auto  text-center mx-auto'>
        <h1 className='text-white text-3xl'>Agregar Venta</h1>

        <div className='mx-20 py-10 grid grid-cols-2 gap-y-8 gap-x-8   ' id='add'>

          <div className='space-x-8 '>
            <label htmlFor="" className='text-white text-3xl'>Codigo de venta :</label>
            <input value={idVenta} className='pl-3 rounded-lg w-72 h-10' type="text"  readOnly/>
          </div>

          <div className='space-x-8'>
            <label htmlFor="" className='text-white text-3xl'>Fecha de Venta :</label>
            <input id='fechaVenta' className='pl-3 rounded-lg w-72 h-10' type="date" onChange={handleInputChange} />
          </div>
          <div className='space-x-8'>
            <label htmlFor="" className='text-white text-3xl'>Fecha de entrega :</label>
            <input id='fechaEntrega' className='pl-3 rounded-lg w-72 h-10' type="date" onChange={handleInputChange} />
          </div>
          <div className='space-x-8'>
            <label htmlFor="" className='text-white text-3xl'>Subtotal :</label>
            <input id='subtotal' value={total} className='pl-3 rounded-lg w-72 h-10' type="text"  readOnly/>
          </div>
          <div className='space-x-8'>
            <label htmlFor="" className='text-white text-3xl'>IVA 16% : </label>
            <input id='iva' value={total*0.16} className='pl-3 rounded-lg w-72 h-10' type="text"  readOnly />
          </div>
          <div className='space-x-8'>
            <label htmlFor="" className='text-white text-3xl'>Total :</label>
            <input id='total' value={(total*0.16) + total} className='pl-3 rounded-lg w-72 h-10'  type="text" readOnly />
          </div>
          <div className='space-x-8'>
          <label htmlFor="" className='text-white text-3xl'>Razon Social :</label>
          <select
            className=" rounded-lg w-72 h-10 "
            onChange={filter}
            id='RFC'
          >
            <option value="default">Selecciona una opción</option>

            {optionsCustomer ? optionsCustomer.map((item, index) => (
              <option key={index} value={item.RFC}>
                {item.Razonsocial}
              </option>
            )) : <h1 className='text-white'> No se encontraron clientes</h1>}
          </select>
        </div>
        </div>
          <h1 className='text-white'>**Escoge RFQS de una sola empresa**</h1>
        <div className='my-5 mx-10 hidden' id='RFQS'>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-yellow-500 h-10 ">
                <th></th>
                <th>N° RFQ</th>
                <th>Pieza</th>
                <th>Servicio</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {dataF ?
                dataF.map((item, index) =>
                  <tr key={item.Id_rfq} className='text-center'>
                    <td className="bg-white text-black">
                      <input
                        type="checkbox"
                        onChange={() => toggleCheckbox(item)}
                        checked={selectedRow.includes(item.Id_rfq)}

                      />
                    </td>

                    <td className="bg-white text-black">{item.Id_rfq}</td>
                    <td className="bg-white text-black">{item.esPz.toString()}</td>
                    <td className="bg-white text-black">{item.esMant.toString()}</td>
                    <td className="bg-white text-black">{item.Total}</td>
                    <td className="bg-white text-black"> {item.fecha && (
                      new Date(item.fecha.seconds * 1000).toLocaleString()
                    )}</td>


                  </tr>
                ) : <h1 className='text-white'>Selecciona una empresa o Empresa no tiene RFQ</h1>}
            </tbody>
          </table>
        </div>
          
        <div className=" flex justify-center mx-44 space-x-16 mt-5">
          <button className="bg-red-500 hover:bg-red-800 rounded-xl text-white font-bold w-44 h-16"
            onClick={cancel}>
            <h1 className="text-3xl" > Cancelar </h1>
          </button>
          <button
            className="bg-amber-500 hover:bg-amber-800  rounded-xl text-white font-bold w-44 h-16"
            onClick={addVentaFire}
          >
            <h1 className="text-3xl" > Guardar </h1>
          </button>
        </div>


      </div>
    </div>
  )
}

export default AgregarVenta