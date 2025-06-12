import React, { useState } from 'react';
import { Plus, Upload, DollarSign, Calendar, ShoppingCart, Briefcase, FileText, Check, Tag, Repeat } from 'lucide-react';

// --- DADOS MOCKADOS (Simulando o que viria do Backend) ---
const mockSuppliers = [
    { id: 1, name: 'Fornecedor de Software ABC' },
    { id: 2, name: 'Escritório de Contabilidade XYZ' },
    { id: 3, name: 'Empresa de Plotagem' },
    { id: 4, name: 'Autônomo - Consultor' },
    { id: 5, name: 'Engenheiro (a)' },
];

const mockProjects = [
    { id: 101, name: 'Edifício Residencial Alfa' },
    { id: 102, name: 'Consultoria de Fundações' },
    { id: 201, name: 'Projeto Hidrossanitário Gama' },
];

const expenseCategories = [
    { id: 'honorario', name: 'Honorário' },
    { id: 'software', name: 'Software e Licenças' },
    { id: 'impostos', name: 'Impostos e Taxas' },
    { id: 'folha', name: 'Folha de Pagamento' },
    { id: 'marketing', name: 'Marketing e Vendas' },
    { id: 'infra', name: 'Infraestrutura (Aluguel, etc)' },
    { id: 'material', name: 'Material de Escritório' },
];

// --- COMPONENTE PRINCIPAL ---
export default function App() {
    const [isRecorrente, setIsRecorrente] = useState(false);
    const [fileName, setFileName] = useState('');
    const [status, setStatus] = useState('aberto'); // 'aberto' ou 'pago'

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar os dados para o backend
        alert('Despesa cadastrada com sucesso! (Simulação)');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lançar Nova Despesa</h1>
                        <p className="text-gray-500 mb-8">Registre uma nova conta a pagar para manter seu financeiro em dia.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Linha 1: Descrição */}
                             <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input type="text" id="description" placeholder="Ex: Assinatura mensal do software CAD" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>
                        
                            {/* Linha 2: Fornecedor e Projeto */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">Fornecedor</label>
                                    <div className="relative">
                                        <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select id="supplier" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
                                            <option value="">Selecione um fornecedor (opcional)</option>
                                            {mockSuppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">Vincular a um Projeto</label>
                                     <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select id="project" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
                                            <option value="">Selecione um projeto (opcional)</option>
                                            {mockProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Linha 3: Categoria, Valor e Vencimento */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select id="category" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
                                            <option value="">Selecione...</option>
                                            {expenseCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Valor (R$) *</label>
                                     <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="number" id="amount" placeholder="350,00" step="0.01" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Data de Vencimento *</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="date" id="dueDate" defaultValue={new Date().toISOString().substring(0, 10)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Linha 4: Recorrência e Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <label className="font-medium text-gray-800 flex items-center gap-2"><Repeat size={16}/> Despesa Recorrente?</label>
                                        <button type="button" onClick={() => setIsRecorrente(!isRecorrente)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isRecorrente ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isRecorrente ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </div>
                                    {isRecorrente && (
                                        <div className="mt-4">
                                            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">Frequência</label>
                                            <select id="frequency" className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                                <option>Mensal</option>
                                                <option>Anual</option>
                                                <option>Trimestral</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status do Pagamento</label>
                                    <div className="flex space-x-2 h-full items-center">
                                        <button 
                                            type="button" 
                                            onClick={() => setStatus('aberto')}
                                            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-all ${status === 'aberto' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}
                                        >
                                            Em Aberto
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setStatus('pago')}
                                            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-all ${status === 'pago' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-600'}`}
                                        >
                                            <Check size={16} /> Pago
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Linha 5: Anexo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Anexar Boleto/NF</label>
                                <label htmlFor="file-upload" className="w-full flex justify-center items-center px-6 py-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                                    <div className="text-center">
                                        <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">
                                            <span className="font-semibold text-blue-600">Clique para enviar</span> ou arraste e solte
                                        </p>
                                        <p className="text-xs text-gray-500">PDF, PNG, JPG (max. 5MB)</p>
                                        {fileName && <p className="text-xs text-green-600 font-semibold mt-2">Arquivo selecionado: {fileName}</p>}
                                    </div>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                </label>
                            </div>

                            {/* Ações */}
                            <div className="pt-6 flex justify-end space-x-4">
                                <button type="button" className="py-2.5 px-6 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" className="py-2.5 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2">
                                    <Plus size={18} /> Salvar Despesa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}