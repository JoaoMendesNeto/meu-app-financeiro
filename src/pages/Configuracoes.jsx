import React, { useState } from 'react';
import { User, Building, Tag, Bell, Trash2, Edit, Plus, Save, Image, ClipboardList } from 'lucide-react';

// --- DADOS MOCKADOS ---
const initialCategories = {
    receitas: [
        { id: 'rec1', name: 'Honorários de Projeto' },
        { id: 'rec2', name: 'Consultoria' },
        { id: 'rec3', name: 'Laudos e ARTs' },
    ],
    despesas: [
        { id: 'des1', name: 'Honorário' },
        { id: 'des2', name: 'Software e Licenças' },
        { id: 'des3', name: 'Impostos e Taxas' },
    ],
};

const initialServices = [
    { id: 'psc', name: 'Projeto de Segurança Contra Incêndio', code: 'PSC-001', value: 15000, unit: 'Projeto' },
    { id: 'gas', name: 'Projeto para Revenda de Gás', code: 'PRG-002', value: 8500, unit: 'Projeto' },
    { id: 'ae', name: 'Atestado Elétrico', code: 'LAE-003', value: 120, unit: 'H/H' },
    { id: 'laudo', name: 'Laudo Estrutural', code: 'LES-004', value: 2500, unit: 'Unidade' },
];

const SettingsSection = ({ title, subtitle, icon, children }) => (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
        <div className="flex items-start gap-4 mb-6">
            <div className="bg-gray-100 p-3 rounded-lg text-blue-600">
                {icon}
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
            </div>
        </div>
        <div>{children}</div>
    </div>
);


// --- COMPONENTE PRINCIPAL ---
export default function App() {
    const [activeTab, setActiveTab] = useState('perfil');
    const [categories, setCategories] = useState(initialCategories);
    const [services, setServices] = useState(initialServices);

    const menuItems = [
        { id: 'perfil', label: 'Meu Perfil', icon: <User size={20}/> },
        { id: 'empresa', label: 'Dados da Empresa', icon: <Building size={20}/> },
        { id: 'servicos', label: 'Serviços', icon: <ClipboardList size={20}/> },
        { id: 'categorias', label: 'Categorias', icon: <Tag size={20}/> },
        { id: 'notificacoes', label: 'Notificações', icon: <Bell size={20}/> },
    ];
    
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
                    <p className="text-gray-500 mt-1">Gerencie seu perfil, suas preferências e as configurações da empresa.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Menu Lateral */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white p-4 rounded-2xl shadow-sm">
                            <nav className="space-y-1">
                                {menuItems.map(item => (
                                     <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                                            activeTab === item.id 
                                            ? 'bg-blue-50 text-blue-700' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Conteúdo da Seção */}
                    <main className="lg:col-span-3">
                       {activeTab === 'perfil' && (
                           <SettingsSection title="Meu Perfil" subtitle="Atualize seus dados pessoais e de acesso." icon={<User size={24}/>}>
                                <form className="space-y-4">
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium">Nome</label><input type="text" defaultValue="Usuário Exemplo" className="w-full mt-1 p-2 border rounded-lg"/></div>
                                        <div><label className="block text-sm font-medium">Email</label><input type="email" defaultValue="usuario@exemplo.com" className="w-full mt-1 p-2 border rounded-lg"/></div>
                                    </div>
                                    <div><label className="block text-sm font-medium">Nova Senha</label><input type="password" placeholder="Deixe em branco para não alterar" className="w-full mt-1 p-2 border rounded-lg"/></div>
                                    <div className="pt-4 flex justify-end"><button type="submit" className="py-2 px-5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Salvar Alterações</button></div>
                                </form>
                           </SettingsSection>
                       )}
                       {activeTab === 'empresa' && (
                           <SettingsSection title="Dados da Empresa" subtitle="Informações que podem ser usadas em relatórios e NFs." icon={<Building size={24}/>}>
                               <form className="space-y-4">
                                    <div className="flex items-center gap-6 mb-4">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed">
                                            <Image size={40} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <label htmlFor="logo-upload" className="cursor-pointer font-semibold text-sm text-blue-600 hover:text-blue-700 bg-white py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                                                Trocar Logomarca
                                            </label>
                                            <input id="logo-upload" type="file" className="sr-only" />
                                            <p className="text-xs text-gray-500 mt-2">PNG ou JPG (max. 2MB)</p>
                                        </div>
                                    </div>
                                    <div><label className="block text-sm font-medium">Nome da Empresa</label><input type="text" defaultValue="Engenharia & Soluções Ltda." className="w-full mt-1 p-2 border rounded-lg"/></div>
                                    <div><label className="block text-sm font-medium">CNPJ</label><input type="text" defaultValue="00.000.000/0001-00" className="w-full mt-1 p-2 border rounded-lg"/></div>
                                    <div><label className="block text-sm font-medium">Endereço</label><input type="text" defaultValue="Rua das Acácias, 123, Centro" className="w-full mt-1 p-2 border rounded-lg"/></div>
                                    <div className="pt-4 flex justify-end"><button type="submit" className="py-2 px-5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Salvar Alterações</button></div>
                                </form>
                           </SettingsSection>
                       )}
                       {activeTab === 'servicos' && (
                           <SettingsSection title="Catálogo de Serviços" subtitle="Adicione ou remova os serviços que sua empresa oferece." icon={<ClipboardList size={24}/>}>
                                <div className="space-y-3">
                                   {services.map(service => (
                                        <div key={service.id} className="flex flex-wrap items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-800">{service.name}</span>
                                                <span className="text-xs text-gray-500">Código: {service.code} | Valor: {service.value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})} / {service.unit}</span>
                                            </div>
                                            <div className="flex gap-2 mt-2 sm:mt-0">
                                                <button className="p-2 text-gray-500 hover:text-blue-600 rounded-md bg-white border"><Edit size={16}/></button>
                                                <button className="p-2 text-gray-500 hover:text-red-600 rounded-md bg-white border"><Trash2 size={16}/></button>
                                            </div>
                                        </div>
                                   ))}
                                   <div className="pt-4 border-t mt-4">
                                        <h4 className="font-semibold text-md mb-3">Adicionar Novo Serviço</h4>
                                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Nome do Serviço" className="w-full p-2 border rounded-lg"/>
                                            <input type="text" placeholder="Código (ex: PSC-005)" className="w-full p-2 border rounded-lg"/>
                                            <input type="number" placeholder="Valor Padrão (R$)" className="w-full p-2 border rounded-lg"/>
                                            <input type="text" placeholder="Unidade (Projeto, H/H, m²)" className="w-full p-2 border rounded-lg"/>
                                            <div className="md:col-span-2 flex justify-end">
                                               <button type="submit" className="py-2 px-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"><Plus size={18}/>Adicionar Serviço</button>
                                            </div>
                                        </form>
                                   </div>
                                </div>
                           </SettingsSection>
                       )}
                        {activeTab === 'categorias' && (
                           <SettingsSection title="Categorias Financeiras" subtitle="Personalize as categorias para classificar suas transações." icon={<Tag size={24}/>}>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                   {/* Categorias de Receitas */}
                                   <div>
                                       <h3 className="font-semibold text-gray-800 mb-3">Receitas</h3>
                                       <div className="space-y-2">
                                           {categories.receitas.map(cat => (
                                               <div key={cat.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                                   <span className="text-sm">{cat.name}</span>
                                                   <div className="flex gap-1">
                                                       <button className="p-1.5 text-gray-500 hover:text-blue-600"><Edit size={16}/></button>
                                                       <button className="p-1.5 text-gray-500 hover:text-red-600"><Trash2 size={16}/></button>
                                                   </div>
                                               </div>
                                           ))}
                                            <div className="flex items-center gap-2 pt-2">
                                                <input type="text" placeholder="Nova categoria de receita" className="w-full p-2 border rounded-lg text-sm"/>
                                                <button className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"><Plus size={20}/></button>
                                            </div>
                                       </div>
                                   </div>
                                   {/* Categorias de Despesas */}
                                   <div>
                                       <h3 className="font-semibold text-gray-800 mb-3">Despesas</h3>
                                       <div className="space-y-2">
                                           {categories.despesas.map(cat => (
                                                <div key={cat.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                                   <span className="text-sm">{cat.name}</span>
                                                   <div className="flex gap-1">
                                                       <button className="p-1.5 text-gray-500 hover:text-blue-600"><Edit size={16}/></button>
                                                       <button className="p-1.5 text-gray-500 hover:text-red-600"><Trash2 size={16}/></button>
                                                   </div>
                                               </div>
                                           ))}
                                            <div className="flex items-center gap-2 pt-2">
                                                <input type="text" placeholder="Nova categoria de despesa" className="w-full p-2 border rounded-lg text-sm"/>
                                                <button className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"><Plus size={20}/></button>
                                            </div>
                                       </div>
                                   </div>
                               </div>
                           </SettingsSection>
                       )}
                       {activeTab === 'notificacoes' && (
                           <SettingsSection title="Notificações" subtitle="Escolha como e quando você quer ser alertado." icon={<Bell size={24}/>}>
                               <div className="space-y-4">
                                   <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                       <p className="font-medium">Alertas de contas a pagar</p>
                                       <input type="checkbox" className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                                   </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                       <p className="font-medium">Alertas de contas a receber</p>
                                       <input type="checkbox" className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                                   </div>
                                   <div>
                                       <label className="block text-sm font-medium">Avisar com antecedência de:</label>
                                       <select className="w-full mt-1 p-2 border rounded-lg">
                                           <option>3 dias</option>
                                           <option>5 dias</option>
                                           <option>7 dias</option>
                                       </select>
                                   </div>
                                    <div className="pt-4 flex justify-end"><button type="submit" className="py-2 px-5 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">Salvar Alterações</button></div>
                               </div>
                           </SettingsSection>
                       )}
                    </main>
                </div>
            </div>
        </div>
    );
}