import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import view from '../../assets/view.png'
import { addRFQPieza, inactivateRFQ } from '../../customHooks/RFQ';
import edit from '../../assets/editing.png'
import remove from '../../assets/remove.png'

function RFQPiezas() {
  const navigate = useNavigate();
  const [rfqP, setRfqP] = useState([])
  const [rfqs, setRfqs] = useState([])
  const [selectRfq, setSelectRfq] = useState()
  const idRFQ = localStorage.getItem('idRFQ')

  const cancel = () => {
    const isSuc = inactivateRFQ(idRFQ);
    if(!isSuc) return false;
    alert("Operacion cancelada");

    navigate("/RFQ")
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRfqP({
      ...rfqP,
      [id]: value
    })
  }
  const addRFQPiezaS = async () => {
    let totalFinal = 0;
    if (rfqs.length > 0) {
      rfqs.map(item => {
        totalFinal += Number(item.costo)
      })
      const isSuc = await addRFQPieza(rfqs, totalFinal)
      if(!isSuc) return false;
      alert("RFQ agregado");
      navigate('/RFQ')
    } else {
      alert("No hay piezas agregadas, comprueba")
    }
  }

  const clearInputs = () => {
    document.getElementById('manufacture').value = '';
    document.getElementById('rev').value = '';
    document.getElementById('name').value = '';
    document.getElementById('material').value = '';
    document.getElementById('specification').value = '';
    document.getElementById('opp').value = '';
    document.getElementById('special').value = '';
    document.getElementById('costo').value = '';
  }
  const modifyRfqPieza = () => {
    if (selectRfq == null) {
      alert('Selecciona un rfq')
    } else {
      const rfqEdit = rfqs.filter(item => selectRfq === item.name)
      document.getElementById('manufacture').value = rfqEdit[0].manufacture;
      document.getElementById('rev').value = rfqEdit[0].rev;
      document.getElementById('name').value = rfqEdit[0].name;
      document.getElementById('material').value = rfqEdit[0].material;
      document.getElementById('specification').value = rfqEdit[0].specification;
      document.getElementById('opp').value = rfqEdit[0].opp;
      document.getElementById('special').value = rfqEdit[0].special;
      document.getElementById('costo').value = rfqEdit[0].costo;
      alert('Ahora puedes editarlo')
      const cleanRfq = rfqs.filter(item => item.name !== selectRfq);
      setRfqs(cleanRfq);
    }
  }
  const toggleCheckbox = (name) => {
    setSelectRfq(name);
  }
  const addRFQP = () => {
    let manufacture = document.getElementById('manufacture').value;
    let rev = document.getElementById('rev').value;
    let name = document.getElementById('name').value;
    let material = document.getElementById('material').value;
    let specification = document.getElementById('specification').value;
    let opp = document.getElementById('opp').value;
    let special = document.getElementById('special').value;
    let costo = document.getElementById('costo').value;

    if (manufacture == '' ||
      rev == '' ||
      name == '' ||
      material == '' ||
      specification == '' ||
      opp == '' ||
      special == '' ||
      costo == '') {
      alert("LLena todos los campos")
    } else {
      const numeroAleatorio = Math.floor(Math.random() * 1000);
      name = name + numeroAleatorio;
      setRfqs(prevData => [...prevData, {
        idRFQ,
        manufacture,
        rev,
        name,
        material,
        specification,
        opp,
        special,
        costo,
        state: 'Activo'
      }])
      alert("Agregado")
      clearInputs();
    }
  }
  const deleteRfq = () => {
    const cleanRfq = rfqs.filter(item => item.name !== selectRfq);
    setRfqs(cleanRfq);
  }
  return (
    <div className='h-screen bg-black overflow-y-auto  text-center mx-auto'>
      <h1 className='text-white text-3xl'>Agregar Pieza a RFQ  {idRFQ}</h1>

      <div className='mx-20 py-10 grid grid-cols-2 gap-y-8 gap-x-8   ' id='add'>

        <div className='space-x-8 '>
          <label htmlFor="" className='text-white text-3xl'>Manufacture Part No :</label>
          <input id='manufacture' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange} />
        </div>
        <div className='space-x-8'>
          <label htmlFor="" className='text-white text-3xl'>Rev :</label>
          <input id='rev' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange} />
        </div>
        <div className='space-x-8'>
          <label htmlFor="" className='text-white text-3xl'>Name :</label>
          <input id='name' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange} />
        </div>
        <div className='space-x-8'>
          <label htmlFor="" className='text-white text-3xl'>Material :</label>
          <input id='material' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange} />
        </div>
        <div className='space-x-8'>
          <label htmlFor="" className='text-white text-3xl'>Specification :</label>
          <input id='specification' className='pl-3 rounded-lg w-72 h-32' type="text" onChange={handleInputChange} />
        </div>
        <div className='space-x-8'>
          <label htmlFor="" className='text-white text-3xl'>Opp Qty : </label>
          <input id='opp' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange} />
        </div>
        <div className='space-x-8'>
          <label htmlFor="" className='text-white text-3xl'>Special Comments : </label>
          <input id='special' className='pl-3 rounded-lg w-72 h-10' type="text" onChange={handleInputChange} />
        </div>
        <div className='space-x-8'>
          <label htmlFor="" className='text-white text-3xl'>Costo : </label>
          <input id='costo' className='pl-3 rounded-lg w-72 h-10' type="number" onChange={handleInputChange} />
        </div>
      </div>

      <div className='flex justify-center items-center space-x-5 '>
        <button className='bg-green-500 hover:bg-green-800 rounded-xl flex justify-center items-center w-10 h-10'
          onClick={addRFQP}>
          <h1 className='text-4xl'>+</h1>
        </button>
        <button onClick={modifyRfqPieza}>
          <div className='bg-amber-400 rounded-xl w-10 flex justify-center h-10 items-center'>
            <img src={edit} alt="" className='h-4 w-4' />
          </div>
        </button>
        <button onClick={deleteRfq}>
          <div className='bg-red-500 rounded-xl w-10 flex justify-center h-10 items-center'>
            <img src={remove} alt="" className='w-4 h-4' />
          </div>
        </button>

      </div>
      <div className='my-5 mx-auto px-10' id='view'>
        <table className="table-auto w-full ">
          <thead>
            <tr className="bg-yellow-500 h-10 ">
              <th></th>
              <th>Manufacture</th>
              <th>Name</th>
              <th>Specification</th>
              <th>Rev</th>
              <th>Costo</th>
              <th>Material</th>
            </tr>
          </thead>
          <tbody>
            {rfqs ?
              rfqs.map((item, index) =>
                <tr key={index} className='text-center'>
                  <td className="bg-white text-black">
                    <input
                      type="radio"
                      checked={selectRfq === item.name}
                      onChange={() => toggleCheckbox(item.name)}
                    />
                  </td>
                  <td className="bg-white text-black">{item.manufacture}</td>
                  <td className="bg-white text-black">{item.name}</td>
                  <td className="bg-white text-black">{item.specification}</td>
                  <td className="bg-white text-black">{item.rev}</td>
                  <td className="bg-white text-black">{item.costo}</td>
                  <td className="bg-white text-black">{item.material}</td>



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
          onClick={addRFQPiezaS}
        >
          <h1 className="text-3xl" > Guardar </h1>
        </button>
      </div>


    </div>
  )
}

export default RFQPiezas