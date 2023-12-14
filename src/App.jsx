import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Bienvenido from './components/Bienvenido';
import Usuarios from './components/Usuarios';
import AgregarUsuario from './components/AgregarUsuario';
import EditarUsuario from './components/EditarUsuario';
import Roles from './components/Roles';
import Clientes from './components/Clientes';
import AgregarCliente from './components/AgregarCliente';
import ModificarCliente from './components/ModificarCliente';
import RFQ from './components/RFQs/RFQ';
import AgregarRFQ from './components/RFQs/AgregarRFQ';
import RFQServicio from './components/RFQs/RFQServicio';
import RFQPiezas from './components/RFQs/RFQPiezas';
import RFQPiezasView from './components/RFQs/RFQPiezasView';
import RFQPiezasEditar from './components/RFQs/RFQPiezasEditar';
import RFQServicioView from './components/RFQs/RFQServiciosView';
import RFQServicioEditar from './components/RFQs/RFQServicioEditar';
import Ventas from './components/Ventas/Ventas';
import AgregarVenta from './components/Ventas/AgregarVenta';
import VentasView from './components/Ventas/VentasView';
import VentasEditar from './components/Ventas/VentasEditar';
import Cobros from './components/Cobros/Cobros';
import AgregarCobro from './components/Cobros/AgregarCobro';
import CobrosView from './components/Cobros/CobrosView';
import ReportesS from './components/Reportes/ReportesS';
import EditarCobros from './components/Cobros/EditarCobros';
import Error from './components/Error';
import HeaderB from './components/HeaderB';
function App() {
// Definir las variables de estado para las variables del localStorage
const [userVerificado, setUserVerificado] = useState(null);
const [tipoUsuario, setTipoUsuario] = useState(null);

useEffect(() => {
  // Obtén las variables del localStorage después del login
  const userVerificadoLocalStorage = localStorage.getItem('verificado');
  const tipoUsuarioLocalStorage = localStorage.getItem('tipo');

  // Actualiza el estado con las variables obtenidas
  setUserVerificado(userVerificadoLocalStorage);
  setTipoUsuario(tipoUsuarioLocalStorage);
    // Puedes realizar otras acciones aquí según las variables obtenidas
  }, []);
  
  return (
    <Router>

      <Routes>
        <Route path='/' element={<Login />} />
        
        <Route path="/*" element={userVerificado == 'false' ? (
          <Error />

        ) :
          (
            <>
            <Header/><Bienvenido/>
            </>
          )} />
        <Route path="/bienvenido" element={userVerificado == 'true' ? (
          <><HeaderB /><Bienvenido /></>
        ) :
          (
            <Error  />

          )} />
        <Route path="/Usuarios" element={tipoUsuario === '1' && userVerificado == 'true' ? (
          <><Header /><Usuarios /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/Ventas" element={ userVerificado == 'true' ? (
          <><Header /><Ventas /></>
        ) :
          (
            <Error />

          )} />
        <Route path="/CobrosView" element={ userVerificado == 'true' ? (
          <><Header /><CobrosView /></>
        ) :
          (
            <Error />

          )} />
        <Route path="/Reportes" element={ userVerificado === 'true' ? (
          <><Header /><ReportesS /></>
        ) :
          (
            <Error />

          )} />
        <Route path="/VentasView" element={ userVerificado === 'true' ? (
          <><Header /><VentasView /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/AgregarCobro" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><AgregarCobro /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/Cobros" element={userVerificado === 'true' ? (
          <><Header /><Cobros /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/EditarCobros" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><EditarCobros /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/VentasEditar" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><VentasEditar /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/AgregarVenta" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><AgregarVenta /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/AgregarUsuario" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><AgregarUsuario /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/EditarUsuario" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><EditarUsuario /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/Roles" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><Roles /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/Clientes" element={userVerificado === 'true' ? (
          <><Header /><Clientes /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/AgregarCliente" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><AgregarCliente /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/ModificarCliente" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><ModificarCliente /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/RFQ" element={userVerificado === 'true' ? (
          <><Header /><RFQ /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/AgregarRFQ" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><AgregarRFQ /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/RFQServicio" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><RFQServicio /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/RFQPiezas" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><RFQPiezas /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/RFQPiezasView" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><RFQPiezasView /></>
        ) :
          (
            <Error />
          )} />
        <Route path="/RFQPiezasEditar" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><RFQPiezasEditar /></>
        ) :
          (
            <Error />
          )
        } />
        <Route path="/RFQServicioView" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><RFQServicioView /></>
        ) :
          (
            <Error />
          )
        } />
        <Route path="/RFQServicioEditar" element={(tipoUsuario === '1' || tipoUsuario === '2') && userVerificado === 'true' ? (
          <><Header /><RFQServicioEditar /></>
        ) :
          (
            <Error />
          )
        } />
      </Routes>
    </Router>
  );

}

export default App;
