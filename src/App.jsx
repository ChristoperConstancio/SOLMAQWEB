import React, { useState } from 'react';
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
function App() {

  const userVerificado = localStorage.getItem('verificado');
  const tipoUsuario = localStorage.getItem('tipo');
  return (
    <Router>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/bienvenido" element={userVerificado === 'true' ? (
          <><Header /><Bienvenido /></>
        ) :
          (
            <Bienvenido />

          )} />
        <Route path="/Usuarios" element={tipoUsuario === '1' ? (
          <><Header /><Usuarios /></>
        ) :
          (
            <Bienvenido />
          )} />
        <Route path="/AgregarUsuario" element={tipoUsuario === '1' ? (
          <><Header /><AgregarUsuario /></>
        ) :
          (
            <Bienvenido />
          )} />
        <Route path="/EditarUsuario" element={tipoUsuario === '1' ? (
          <><Header /><EditarUsuario /></>
        ) :
          (
            <Bienvenido />
          )} />
        <Route path="/Roles" element={tipoUsuario === '1' ? (
          <><Header /><Roles /></>
        ) :
          (
            <Bienvenido />
          )} />
        <Route path="/Clientes" element={tipoUsuario === '1' ? (
          <><Header /><Clientes /></>
        ) :
          (
            <Bienvenido />
          )} />
        <Route path="/AgregarCliente" element={tipoUsuario === '1' ? (
          <><Header /><AgregarCliente /></>
        ) :
          (
            <Bienvenido />
          )} />
        <Route path="/ModificarCliente" element={tipoUsuario === '1' ? (
          <><Header /><ModificarCliente /></>
        ) :
          (
            <Bienvenido />
          )} />
          <Route path="/RFQ" element={tipoUsuario === '1' ? (
          <><Header /><RFQ /></>
        ) :
          (
            <Bienvenido />
          )} />
          <Route path="/AgregarRFQ" element={tipoUsuario === '1' ? (
          <><Header /><AgregarRFQ /></>
        ) :
          (
            <Bienvenido />
          )} />
           <Route path="/RFQServicio" element={tipoUsuario === '1' ? (
          <><Header /><RFQServicio /></>
        ) :
          (
            <Bienvenido />
          )} />
          <Route path="/RFQPiezas" element={tipoUsuario === '1' ? (
          <><Header /><RFQPiezas /></>
        ) :
          (
            <Bienvenido />
          )} />
           <Route path="/RFQPiezasView" element={tipoUsuario === '1' ? (
          <><Header /><RFQPiezasView /></>
        ) :
          (
            <Bienvenido />
          )} />
          <Route path="/RFQPiezasEditar" element={tipoUsuario === '1' ? (
          <><Header /><RFQPiezasEditar /></>
        ) :
          (
            <Bienvenido />
          )
          } />
          <Route path="/RFQServicioView" element={tipoUsuario === '1' ? (
          <><Header /><RFQServicioView /></>
        ) :
          (
            <Bienvenido />
          )
          } />
          <Route path="/RFQServicioEditar" element={tipoUsuario === '1' ? (
          <><Header /><RFQServicioEditar /></>
        ) :
          (
            <Bienvenido />
          )
          } />
      </Routes>
    </Router>
  );

}

export default App;
