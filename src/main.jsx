import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NovaReceita from './pages/NovaReceita.jsx';
import NovaDespesa from './pages/NovaDespesa.jsx';
import GerenciamentoClientes from './pages/GerenciamentoClientes.jsx';
import GerenciamentoFornecedores from './pages/GerenciamentoFornecedores.jsx';
import Relatorios from './pages/Relatorios.jsx';
import Configuracoes from './pages/Configuracoes.jsx';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "nova-receita", element: <NovaReceita /> },
      { path: "nova-despesa", element: <NovaDespesa /> },
      { path: "clientes", element: <GerenciamentoClientes /> },
      { path: "fornecedores", element: <GerenciamentoFornecedores /> },
      { path: "relatorios", element: <Relatorios /> },
      { path: "configuracoes", element: <Configuracoes /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);