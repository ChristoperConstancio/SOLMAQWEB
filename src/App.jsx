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
            <Routes>
              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>

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
            <Routes>
              <Route
                path="*"
                element={<Navigate to="/" />}
              />
            </Routes>
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
      </Routes>
    </Router>
  );

}

export default App;
