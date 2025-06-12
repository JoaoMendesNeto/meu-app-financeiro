import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ArrowUpRight, ArrowDownLeft, DollarSign, Users, Briefcase, Sparkles, X } from 'lucide-react';

// --- DADOS MOCKADOS (Simulando o que viria do Backend) ---
const monthlyCashFlowData = [
  { name: 'Jan', Receitas: 42000, Despesas: 25000, Fluxo: 17000 },
  { name: 'Fev', Receitas: 51000, Despesas: 32000, Fluxo: 19000 },
  { name: 'Mar', Receitas: 65000, Despesas: 40000, Fluxo: 25000 },
  { name: 'Abr', Receitas: 58000, Despesas: 38000, Fluxo: 20000 },
  { name: 'Mai', Receitas: 72000, Despesas: 45000, Fluxo: 27000 },
  { name: 'Jun', Receitas: 35000, Despesas: 28000, Fluxo: 7000 },
];

const revenueStatusData = [
  { name: 'Pago', value: 185000 },
  { name: 'Pendente', value: 85000 },
  { name: 'Em Atraso', value: 23500 },
];
const REVENUE_COLORS = ['#3b82f6', '#f97316', '#ef4444'];

const expenseByCategoryData = [
  { name: 'Software/Licenças', value: 18000 },
  { name: 'Impostos', value: 25000 },
  { name: 'Folha de Pagamento', value: 95000 },
  { name: 'Marketing', value: 12000 },
  { name: 'Infraestrutura', value: 22000 },
];
const EXPENSE_COLORS = ['#3b82f6', '#8b5cf6', '#d946ef', '#14b8a6', '#f59e0b'];

const serviceTypeData = [
    { name: 'Projeto Estrutural', value: 120000 },
    { name: 'Laudos Técnicos', value: 75000 },
    { name: 'Consultoria', value: 55000 },
    { name: 'Segurança c/ Incêndio', value: 95000 },
    { name: 'Projeto Hidrossanitário', value: 68000 },
];
const SERVICE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];


const projectSummaryData = [
    { id: 1, name: 'Edifício Residencial Alfa', client: 'Construtora Exemplo', status: 'Em Andamento', revenue: 95000, expenses: 62000, progress: 75 },
    { id: 2, name: 'Laudo Estrutural Beta', client: 'Cliente Final', status: 'Concluído', revenue: 15000, expenses: 8000, progress: 100 },
    { id: 3, name: 'Projeto Hidrossanitário Gama', client: 'Arquitetura Integrada', status: 'Em Atraso', revenue: 45000, expenses: 35000, progress: 90 },
    { id: 4, name: 'Consultoria de Fundações', client: 'Construtora Exemplo', status: 'A Iniciar', revenue: 25000, expenses: 2000, progress: 10 },
];

// --- COMPONENTES ---

const StatCard = ({ title, value, icon, trend, change, colorClass }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${colorClass.bg}`}>
                {icon}
            </div>
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            {trend && (
                <div className={`flex items-center text-xs mt-1 ${trend === 'up' ? 'text-blue-600' : 'text-red-600'}`}>
                    {trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownLeft size={14} className="mr-1" />}
                    <span>{change} vs. mês passado</span>
                </div>
            )}
        </div>
    </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-700">{label || payload[0].name}</p>
        {payload.map((pld, index) => (
          <p key={index} style={{ color: pld.fill || pld.color }}>
            {`${pld.name}: ${pld.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- NOVO COMPONENTE DE LABEL PARA O GRÁFICO PIZZA ---
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, value }) => {
  const RADIAN = Math.PI / 180;
  // Posição do final da linha
  const radius = outerRadius + 20; 
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  // Posição do texto
  const ex = x + (x > cx ? 1 : -1) * 8;

  return (
    <g>
      <text x={ex} y={y} textAnchor={x > cx ? 'start' : 'end'} fill="#333" className="text-xs" dominantBaseline="central">
        <tspan x={ex} dy="-0.6em">{`${(percent * 100).toFixed(0)}%`}</tspan>
        <tspan x={ex} dy="1.1em" className="font-semibold">{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })}</tspan>
      </text>
    </g>
  );
};

const ProjectStatusBadge = ({ status }) => {
    const statusStyles = {
        'Em Andamento': 'bg-blue-100 text-blue-800',
        'Concluído': 'bg-green-100 text-green-800',
        'Em Atraso': 'bg-red-100 text-red-800',
        'A Iniciar': 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
}

const AnalysisModal = ({ isOpen, onClose, analysisText, isLoading, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                    <X size={20} />
                </button>
                <div className="p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Sparkles className="text-blue-600" />
                        {title}
                    </h2>
                    <div className="mt-4 prose prose-sm max-w-none prose-p:text-gray-600 prose-strong:text-gray-800 h-60 overflow-y-auto">
                       {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <p dangerouslySetInnerHTML={{ __html: analysisText.replace(/\n/g, '<br />') }}></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL (APP) ---
export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisText, setAnalysisText] = useState('');
    const [analysisTitle, setAnalysisTitle] = useState('');

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
          .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const getFinancialAnalysis = async (prompt) => {
      let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
          setAnalysisText(result.candidates[0].content.parts[0].text);
        } else {
          setAnalysisText("Não foi possível obter uma análise. A resposta da API não continha o texto esperado.");
        }
      } catch (error) {
        console.error("Gemini API call error:", error);
        setAnalysisText("Ocorreu um erro ao tentar gerar a análise. Por favor, tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };
    
    const handleProjectAnalysis = (project) => {
        const profitability = project.revenue - project.expenses;
        const prompt = `Aja como um consultor financeiro para uma pequena empresa de engenharia. Analise o seguinte projeto e forneça um breve resumo (em 2-3 parágrafos) sobre sua saúde financeira. Destaque a lucratividade, possíveis riscos e sugestões. Use formatação em negrito para os pontos chave.
        - **Nome do Projeto:** ${project.name}
        - **Cliente:** ${project.client}
        - **Status:** ${project.status}
        - **Receita Total:** ${project.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        - **Despesa Total:** ${project.expenses.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        - **Lucratividade:** ${profitability.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
        
        setAnalysisTitle(`Análise do Projeto: ${project.name}`);
        setAnalysisText('');
        setIsLoading(true);
        setIsModalOpen(true);
        getFinancialAnalysis(prompt);
    };

    const handleOverallAnalysis = () => {
        const prompt = `Aja como um consultor financeiro para uma pequena empresa de engenharia. Com base nos dados a seguir, forneça um resumo executivo (em 2-3 parágrafos) sobre a saúde financeira geral da empresa para o período. Destaque os pontos positivos, os pontos de atenção e ofereça uma recomendação estratégica. Use formatação em negrito para os pontos chave.
        - **Receita Total do Mês:** R$ 72.000
        - **Despesa Total do Mês:** R$ 45.000
        - **Status das Receitas:** ${revenueStatusData.map(d => `${d.name}: ${d.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`).join(', ')}
        - **Despesas por Categoria:** ${expenseByCategoryData.map(d => `${d.name}: ${d.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`).join(', ')}`;

        setAnalysisTitle("Análise Financeira Geral");
        setAnalysisText('');
        setIsLoading(true);
        setIsModalOpen(true);
        getFinancialAnalysis(prompt);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard Financeiro</h1>
                        <p className="text-gray-500 mt-1">Bem-vindo(a) de volta! Aqui está um resumo da sua empresa.</p>
                    </div>
                    <button onClick={handleOverallAnalysis} className="flex items-center gap-2 py-2.5 px-5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                        <Sparkles size={18} /> Gerar Análise Financeira
                    </button>
                </header>

                {/* Seção de Cards de Estatísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Receita Total (Mês)" value="R$ 72.000" icon={<DollarSign size={16} className="text-blue-600" />} trend="up" change="+12.5%" colorClass={{ bg: 'bg-blue-100' }}/>
                    <StatCard title="Despesa Total (Mês)" value="R$ 45.000" icon={<DollarSign size={16} className="text-red-600" />} trend="up" change="+8.2%" colorClass={{ bg: 'bg-red-100' }}/>
                    <StatCard title="Clientes Ativos" value="12" icon={<Users size={16} className="text-blue-600" />} colorClass={{ bg: 'bg-blue-100' }}/>
                    <StatCard title="Projetos em Andamento" value="4" icon={<Briefcase size={16} className="text-purple-600" />} colorClass={{ bg: 'bg-purple-100' }}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Gráfico de Fluxo de Caixa */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Fluxo de Caixa (Últimos 6 meses)</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={monthlyCashFlowData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="name" tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                                    <YAxis tickFormatter={(value) => `R$${value/1000}k`} tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(243, 244, 246, 0.5)'}} />
                                    <Legend iconType="circle" iconSize={10} />
                                    <Bar dataKey="Receitas" fill="#3b82f6" name="Receitas" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Despesas" fill="#ef4444" name="Despesas" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Gráfico de Status das Receitas */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Status das Receitas</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                                    <Pie 
                                      data={revenueStatusData} 
                                      cx="50%" 
                                      cy="50%" 
                                      labelLine={true} // Alterado para mostrar a linha
                                      outerRadius={80} 
                                      fill="#8884d8" 
                                      dataKey="value" 
                                      label={renderCustomizedLabel} // Usando o novo label
                                    >
                                        {revenueStatusData.map((entry, index) => (<Cell key={`cell-${index}`} fill={REVENUE_COLORS[index % REVENUE_COLORS.length]} />))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* --- NOVA LINHA DE GRÁFICOS --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Gráfico de Despesas por Categoria */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Despesas por Categoria</h3>
                         <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={expenseByCategoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value" paddingAngle={5} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                                        {expenseByCategoryData.map((entry, index) => (<Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    {/* Gráfico de Receita por Tipo de Serviço */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Receita por Tipo de Serviço</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={serviceTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value" paddingAngle={5} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                                        {serviceTypeData.map((entry, index) => (<Cell key={`cell-${index}`} fill={SERVICE_COLORS[index % SERVICE_COLORS.length]} />))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                
                {/* Resumo de Projetos */}
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Resumo dos Projetos</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                                <tr>
                                    <th className="px-4 py-3">Projeto</th>
                                    <th className="px-4 py-3">Cliente</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Lucratividade</th>
                                    <th className="px-4 py-3 text-center">Análise IA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectSummaryData.map(p => (
                                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-4 py-4 font-medium text-gray-900">{p.name}</td>
                                    <td className="px-4 py-4">{p.client}</td>
                                    <td className="px-4 py-4"><ProjectStatusBadge status={p.status} /></td>
                                    <td className={`px-4 py-4 text-right font-semibold ${p.revenue - p.expenses > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {(p.revenue - p.expenses).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <button onClick={() => handleProjectAnalysis(p)} className="flex items-center gap-1.5 mx-auto text-xs py-1 px-2 rounded-md font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200">
                                            <Sparkles size={14}/> Analisar
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isLoading={isLoading} analysisText={analysisText} title={analysisTitle} />
        </div>
    );
}