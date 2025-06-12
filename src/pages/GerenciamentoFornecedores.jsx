import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Edit, Trash2, X, Phone, Mail, UserPlus, Tag } from 'lucide-react';

// --- DADOS MOCKADOS ---
const initialSuppliers = [
    { id: 1, name: 'Fornecedor de Software ABC', email: 'suporte@softwareabc.com', phone: '(11) 5555-1234', category: 'Software e Licenças' },
    { id: 2, name: 'Escritório de Contabilidade XYZ', email: 'contato@contaxyz.com.br', phone: '(21) 4444-5678', category: 'Serviços Contábeis' },
    { id: 3, name: 'Empresa de Plotagem Rápida', email: 'plotagem@rapida.com', phone: '(31) 3333-9999', category: 'Impressão e Plotagem' },
    { id: 4, name: 'Ana Costa - Consultoria Estrutural', email: 'ana.costa.eng@email.com', phone: '(41) 98765-4321', category: 'Honorário' },
    { id: 5, name: 'Engenheiro (a) parceiro', email: 'parceiro.eng@email.com', phone: '(51) 91234-5678', category: 'Honorário' },
];

// --- COMPONENTE PRINCIPAL ---
export default function App() {
    const [suppliers, setSuppliers] = useState(initialSuppliers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // This effect injects the animation styles into the document's head.
        // This is a standard way to handle dynamic or component-scoped global styles
        // without relying on non-standard JSX attributes that can cause warnings.
        const style = document.createElement('style');
        style.innerHTML = `
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
          }
        `;
        document.head.appendChild(style);

        // Cleanup function to remove the style when the component unmounts
        return () => {
            document.head.removeChild(style);
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNewSupplier = (e) => {
        e.preventDefault();
        const newSupplier = {
            id: Date.now(),
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            category: e.target.category.value
        };
        setSuppliers([...suppliers, newSupplier]);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Fornecedores</h1>
                        <p className="text-gray-500 mt-1">Adicione, edite e visualize seus fornecedores.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 py-2.5 px-5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                        <UserPlus size={18} /> Adicionar Novo Fornecedor
                    </button>
                </div>

                {/* Barra de Ações e Busca */}
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar fornecedor pelo nome..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Lista de Fornecedores */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4">Nome do Fornecedor</th>
                                    <th className="px-6 py-4">Contato</th>
                                    <th className="px-6 py-4">Categoria</th>
                                    <th className="px-6 py-4 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSuppliers.map(supplier => (
                                    <tr key={supplier.id} className="bg-white border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{supplier.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {supplier.email}</span>
                                                <span className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {supplier.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">{supplier.category}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center gap-3">
                                                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-md"><Edit size={18} /></button>
                                                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-md"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal para Adicionar Fornecedor */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative animate-fade-in-up">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                            <X size={20} />
                        </button>
                        <div className="p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Adicionar Novo Fornecedor</h2>
                            <p className="text-gray-500 mb-6">Preencha as informações do fornecedor.</p>
                            <form onSubmit={handleAddNewSupplier} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome / Razão Social *</label>
                                    <input type="text" id="name" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                                        <input type="email" id="email" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
                                        <input type="text" id="phone" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoria Principal *</label>
                                    <input type="text" id="category" placeholder="Ex: Software, Contabilidade, Honorário" required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>
                                 <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                                    <textarea id="notes" rows="3" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                                 </div>
                                <div className="pt-4 flex justify-end">
                                    <button type="submit" className="flex items-center gap-2 py-2.5 px-5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700">
                                        Salvar Fornecedor
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}