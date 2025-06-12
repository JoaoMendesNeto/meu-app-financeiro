import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Calendar, User, Briefcase, FileDown, TrendingUp, TrendingDown, DollarSign, AlertCircle, Award } from 'lucide-react';

// --- DADOS MOCKADOS ---
// Dados para o gráfico de pizza de Despesas
const expenseData = [
    { name: 'Honorários', value: 47800 },
    { name: 'Impostos e Taxas', value: 12500 },
    { name: 'Software e Licenças', value: 4500 },
    { name: 'Infraestrutura', value: 8800 },
    { name: 'Marketing', value: 3200 },
];
const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

// Dados para Receitas em Atraso
const overdueReceivables = [
    { id: 1, client: 'Construtora Exemplo S.A.', project: 'Edifício Residencial Alfa', dueDate: '2025-05-15', daysOverdue: 22, amount: 20000 },
    { id: 2, client: 'Comércio de Materiais Primos', project: 'Laudo de Inspeção', dueDate: '2025-04-30', daysOverdue: 37, amount: 5500 },
    { id: 3, client: 'Arquitetura Integrada Ltda.', project: 'Projeto Hidrossanitário Gama', dueDate: '2025-06-01', daysOverdue: 5, amount: 15000 },
];

// Dados para o gráfico de linhas Receita vs. Despesa
const revenueVsExpenseData = [
    { month: 'Jan', Receitas: 42000, Despesas: 25000 },
    { month: 'Fev', Receitas: 51000, Despesas: 32000 },
    { month: 'Mar', Receitas: 65000, Despesas: 40000 },
    { month: 'Abr', Receitas: 58000, Despesas: 38000 },
    { month: 'Mai', Receitas: 72000, Despesas: 45000 },
    { month: 'Jun', Receitas: 85000, Despesas: 52000 },
];

// Dados para o gráfico de barras Top Clientes
const topClientsData = [
    { name: 'Construtora Exemplo', revenue: 115000 },
    { name: 'Arq. Integrada', revenue: 88000 },
    { name: 'Renata Souza', revenue: 62000 },
    { name: 'Cliente Final PF', revenue: 45000 },
    { name: 'Comércio Primos', revenue: 21000 },
];


const totalRevenue = 373000;
const totalExpenses = 232000;
const netProfit = totalRevenue - totalExpenses;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-700">{label}</p>
        {payload.map((pld, index) => (
          <p key={index} style={{ color: pld.color }}>
            {`${pld.name}: ${pld.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Relatórios Financeiros</h1>
                        <p className="text-gray-500 mt-1">Analise a saúde financeira da sua empresa.</p>
                    </div>
                     <button className="flex items-center gap-2 py-2.5 px-5 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm">
                        <FileDown size={18} /> Exportar Relatório (PDF)
                    </button>
                </div>

                {/* Filtros */}
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                         <div>
                             <label className="text-sm font-medium text-gray-700">Período Rápido</label>
                             <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                 <option>Personalizado</option>
                                 <option>Hoje</option>
                                 <option>Este Mês</option>
                                 <option>Este Ano</option>
                                 <option>Últimos 30 dias</option>
                             </select>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="startDate" className="text-sm font-medium text-gray-700">Data Início</label>
                                <input type="date" id="startDate" className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div>
                                <label htmlFor="endDate" className="text-sm font-medium text-gray-700">Data Fim</label>
                                <input type="date" id="endDate" defaultValue={new Date().toISOString().substring(0, 10)} className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
                            </div>
                        </div>
                         <div>
                             <label className="text-sm font-medium text-gray-700">Cliente</label>
                             <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                 <option>Todos</option>
                             </select>
                        </div>
                         <div>
                             <label className="text-sm font-medium text-gray-700">Projeto</label>
                             <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option>Todos</option>
                             </select>
                        </div>
                        <div className="flex items-end">
                            <button className="w-full py-2.5 px-5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Resumo de Resultados */}
                 <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-2xl shadow-sm"><div className="flex items-start gap-4"><div className="bg-green-100 p-3 rounded-xl"><TrendingUp size={24} className="text-green-600" /></div><div><p className="text-sm text-gray-500">Receita Total</p><p className="text-2xl font-bold text-gray-800">{totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></div></div></div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm"><div className="flex items-start gap-4"><div className="bg-red-100 p-3 rounded-xl"><TrendingDown size={24} className="text-red-600" /></div><div><p className="text-sm text-gray-500">Despesa Total</p><p className="text-2xl font-bold text-gray-800">{totalExpenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></div></div></div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm"><div className="flex items-start gap-4"><div className="bg-blue-100 p-3 rounded-xl"><DollarSign size={24} className="text-blue-600" /></div><div><p className="text-sm text-gray-500">Resultado Líquido</p><p className={`text-2xl font-bold ${netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>{netProfit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></div></div></div>
                </div>

                {/* Grid de Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Gráfico de Linhas: Receita vs. Despesa */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Evolução: Receitas vs. Despesas</h2>
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer>
                                <LineChart data={revenueVsExpenseData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
                                    <YAxis tickFormatter={(value) => `R$${value/1000}k`} tick={{ fill: '#6b7280' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="Receitas" stroke="#22c55e" strokeWidth={2} />
                                    <Line type="monotone" dataKey="Despesas" stroke="#ef4444" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Gráfico de Pizza: Despesas por Categoria */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Despesas por Categoria</h2>
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={expenseData} cx="50%" cy="50%" outerRadius={100} innerRadius={60} fill="#8884d8" dataKey="value" paddingAngle={5}>
                                        {expenseData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip formatter={(value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Gráfico de Barras: Top Clientes */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Award size={22}/>Top 5 Clientes por Faturamento</h2>
                         <div style={{ height: 300 }}>
                             <ResponsiveContainer>
                                 <BarChart data={topClientsData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                     <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                     <XAxis type="number" tickFormatter={(value) => `R$${value/1000}k`} />
                                     <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#374151' }} />
                                     <Tooltip content={<CustomTooltip />}/>
                                     <Bar dataKey="revenue" name="Faturamento" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                 </BarChart>
                             </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Tabela de Inadimplência */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="text-red-500" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">Contas a Receber em Atraso</h2>
                        </div>
                        <div className="overflow-x-auto" style={{ maxHeight: 300 }}>
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-3">Cliente / Projeto</th>
                                        <th className="px-4 py-3 text-center">Dias em Atraso</th>
                                        <th className="px-4 py-3 text-right">Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {overdueReceivables.map(item => (
                                        <tr key={item.id} className="bg-white border-b last:border-b-0 hover:bg-gray-50">
                                            <td className="px-4 py-4"><div className="font-medium text-gray-900">{item.client}</div><div className="text-xs text-gray-500">{item.project}</div></td>
                                            <td className="px-4 py-4 text-center"><span className="px-3 py-1 font-semibold rounded-full bg-red-100 text-red-800">{item.daysOverdue}</span></td>
                                            <td className="px-4 py-4 text-right font-medium text-red-600">{item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}