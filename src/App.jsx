import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePlus, FileMinus, Users, Building, BarChart2, Settings } from 'lucide-react';

export default function App() {
  const location = useLocation();
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/nova-receita', label: 'Nova Receita', icon: <FilePlus size={20} /> },
    { path: '/nova-despesa', label: 'Nova Despesa', icon: <FileMinus size={20} /> },
    { path: '/clientes', label: 'Clientes', icon: <Users size={20} /> },
    { path: '/fornecedores', label: 'Fornecedores', icon: <Building size={20} /> },
    { path: '/relatorios', label: 'Relatórios', icon: <BarChart2 size={20} /> },
    { path: '/configuracoes', label: 'Configurações', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <nav className="w-64 bg-white p-4 shadow-lg flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-blue-600">Gestão PRO</h1>
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.path}>
              <Link to={item.path} className={`flex items-center gap-3 py-2.5 px-4 rounded-lg font-semibold transition-colors ${ location.pathname === item.path ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100' }`}>
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}