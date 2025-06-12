import React, { useState } from 'react';
import { Briefcase, User, Calendar, DollarSign, ArrowUp, ArrowDown, BarChart, CheckCircle, Clock, Plus, Download } from 'lucide-react';

// --- DADOS MOCKADOS (Simulando dados de um projeto específico) ---
const projectData = {
    id: 101,
    name: 'Edifício Residencial Alfa',
    client: 'Construtora Exemplo S.A.',
    status: 'Em Andamento',
    startDate: '2023-01-15',
    endDate: '2023-12-20',
    budget: 150000,
    totalRevenue: 95000,
    totalExpenses: 62000,
};

const projectRevenues = [
    { id: 1, description: 'Sinal e 1ª Parcela', date: '2023-02-10', amount: 50000, status: 'Pago' },
    { id: 2, description: '2ª Parcela - Medição', date: '2023-04-15', amount: 25000, status: 'Pago' },
    { id: 3, description: '3ª Parcela - Medição', date: '2023-06-18', amount: 20000, status: 'Pago' },
    { id: 4, description: '4ª Parcela - Medição', date: '2023-08-20', amount: 20000, status: 'Pendente' },
];

const projectExpenses = [
    { id: 1, description: 'Taxas de Aprovação Prefeitura', date: '2023-01-25', category: 'Impostos e Taxas', amount: 8500, status: 'Pago' },
    { id: 2, description: 'Licença Software Estrutural (Anual)', date: '2023-02-01', category: 'Software e Licenças', amount: 4500, status: 'Pago' },
    { id: 3, description: 'Honorários - Engenheiro Calculista', date: '2023-03-10', category: 'Honorário', amount: 35000, status: 'Pago' },
    { id: 4, description: 'Serviços de Plotagem', date: '2023-05-22', category: 'Material de Escritório', amount: 1200, status: 'Pago' },
    { id: 5, description: 'Consultoria Geotécnica', date: '2023-06-05', category: 'Honorário', amount: 12800, status: 'Pendente' },
];

const StatusBadge = ({ status }) => {
    const styles = {
        'Pago': 'bg-green-100 text-green-800',
        'Pendente': 'bg-orange-100 text-orange-800',
    };
    return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>
};


// --- COMPONENTE PRINCIPAL ---
export default function App() {
    const [activeTab, setActiveTab] = useState('receitas');
    const profitability = projectData.totalRevenue - projectData.totalExpenses;
    const profitMargin = projectData.totalRevenue > 0 ? (profitability / projectData.totalRevenue) * 100 : 0;
    
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho do Projeto */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <Briefcase className="text-blue-600" size={28} />
                                <h1 className="text-3xl font-bold text-gray-900">{projectData.name}</h1>
                            </div>
                            <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-2"><User size={14} /> {projectData.client}</span>
                                <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(projectData.startDate).toLocaleDateString('pt-BR')} - {new Date(projectData.endDate).toLocaleDateString('pt-BR')}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 sm:mt-0">
                             <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-blue-100 text-blue-800">{projectData.status}</span>
                             <button className="flex items-center gap-2 py-2 px-4 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200">
                                <Download size={16} /> Exportar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Indicadores Financeiros */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-xl"><ArrowUp size={24} className="text-green-600" /></div>
                        <div>
                            <p className="text-sm text-gray-500">Total de Receitas</p>
                            <p className="text-2xl font-bold text-gray-800">{projectData.totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="bg-red-100 p-3 rounded-xl"><ArrowDown size={24} className="text-red-600" /></div>
                        <div>
                            <p className="text-sm text-gray-500">Total de Despesas</p>
                            <p className="text-2xl font-bold text-gray-800">{projectData.totalExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl"><DollarSign size={24} className="text-blue-600" /></div>
                        <div>
                            <p className="text-sm text-gray-500">Lucratividade</p>
                            <p className={`text-2xl font-bold ${profitability >= 0 ? 'text-green-600' : 'text-red-600'}`}>{profitability.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <span className="text-xs text-gray-500">Margem de {profitMargin.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                
                {/* Abas de Receitas e Despesas */}
                <div className="bg-white rounded-2xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="flex border-b border-gray-200">
                                <button onClick={() => setActiveTab('receitas')} className={`px-4 py-2 -mb-px text-sm font-semibold ${activeTab === 'receitas' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                                    Receitas ({projectRevenues.length})
                                </button>
                                <button onClick={() => setActiveTab('despesas')} className={`px-4 py-2 -mb-px text-sm font-semibold ${activeTab === 'despesas' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                                    Despesas ({projectExpenses.length})
                                </button>
                            </div>
                             <button className="flex items-center gap-2 py-2 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700">
                                <Plus size={16} /> Lançar Novo
                            </button>
                        </div>
                    </div>
                    
                    {/* Conteúdo da Tabela */}
                    <div className="overflow-x-auto">
                        {activeTab === 'receitas' && (
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Descrição</th>
                                        <th className="px-6 py-3">Data</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectRevenues.map(r => (
                                        <tr key={r.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{r.description}</td>
                                            <td className="px-6 py-4">{new Date(r.date).toLocaleDateString('pt-BR')}</td>
                                            <td className="px-6 py-4"><StatusBadge status={r.status} /></td>
                                            <td className="px-6 py-4 text-right font-semibold text-green-600">{r.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                         {activeTab === 'despesas' && (
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Descrição</th>
                                        <th className="px-6 py-3">Categoria</th>
                                        <th className="px-6 py-3">Data</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectExpenses.map(d => (
                                        <tr key={d.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{d.description}</td>
                                            <td className="px-6 py-4">{d.category}</td>
                                            <td className="px-6 py-4">{new Date(d.date).toLocaleDateString('pt-BR')}</td>
                                            <td className="px-6 py-4"><StatusBadge status={d.status} /></td>
                                            <td className="px-6 py-4 text-right font-semibold text-red-600">{d.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}