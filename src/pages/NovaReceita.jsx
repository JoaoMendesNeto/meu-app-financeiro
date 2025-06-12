import React, { useState, useEffect } from 'react';
import { Plus, Upload, DollarSign, Calendar, User, Briefcase, FileText, Hash, Check, CreditCard, BarChartBig, Landmark, ClipboardList } from 'lucide-react';

// --- DADOS MOCKADOS (Simulando o que viria do Backend) ---
const mockClients = [
    { id: 1, name: 'Construtora Exemplo S.A.' },
    { id: 2, name: 'Arquitetura Integrada Ltda.' },
    { id: 3, name: 'Cliente Final PF' },
];

const mockServices = [
    { id: 'psc', name: 'Projeto de Segurança Contra Incêndio', code: 'PSC-001', value: 15000, unit: 'Projeto' },
    { id: 'gas', name: 'Projeto para Revenda de Gás', code: 'PRG-002', value: 8500, unit: 'Projeto' },
    { id: 'ae', name: 'Atestado Elétrico', code: 'LAE-003', value: 120, unit: 'H/H' },
    { id: 'laudo', name: 'Laudo Estrutural', code: 'LES-004', value: 2500, unit: 'Unidade' },
];

const paymentMethods = [
    { id: 'dinheiro', name: 'Dinheiro', icon: <DollarSign size={16} /> },
    { id: 'pix', name: 'PIX', icon: <Hash size={16} /> },
    { id: 'boleto', name: 'Boleto Bancário', icon: <BarChartBig size={16} /> },
    { id: 'transferencia', name: 'Transferência (TED/DOC)', icon: <Landmark size={16} /> },
    { id: 'cartao', name: 'Cartão de Crédito', icon: <CreditCard size={16} /> },
];


// --- COMPONENTE PRINCIPAL ---
export default function App() {
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [valor, setValor] = useState('');
    const [isParcelado, setIsParcelado] = useState(false);
    const [numParcelas, setNumParcelas] = useState(2);
    const [fileName, setFileName] = useState('');

    const selectedService = mockServices.find(s => s.id === selectedServiceId);

    useEffect(() => {
        if (selectedService) {
            setValor(selectedService.value.toString());
        } else {
            setValor('');
        }
    }, [selectedService]);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Serviço/Receita cadastrado com sucesso! (Simulação)');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Lançar Novo Serviço/Receita</h1>
                        <p className="text-gray-500 mb-8">Preencha os dados para registrar uma nova entrada no seu fluxo de caixa.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Linha 1: Cliente */}
                            <div>
                                <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <select id="client" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
                                        <option value="">Selecione um cliente</option>
                                        {mockClients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            {/* Linha 2: Tipo de Serviço */}
                             <div>
                                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Serviço *</label>
                                <div className="relative">
                                    <ClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <select id="serviceType" onChange={(e) => setSelectedServiceId(e.target.value)} value={selectedServiceId} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
                                        <option value="">Selecione um tipo de serviço</option>
                                        {mockServices.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                                {selectedService && (
                                     <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-md flex justify-between">
                                        <span>Código: <span className="font-semibold">{selectedService.code}</span></span>
                                        <span>Valor Padrão: <span className="font-semibold">{selectedService.value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} / {selectedService.unit}</span></span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Linha 3: Descrição */}
                             <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição do Lançamento *</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input type="text" id="description" placeholder="Ex: 1ª parcela do serviço ou detalhes adicionais" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>


                            {/* Linha 4: Valor e Data */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Valor Total (R$) *</label>
                                     <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="number" id="amount" placeholder="2500,00" value={valor} onChange={e => setValor(e.target.value)} step="0.01" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Data da Operação *</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="date" id="date" defaultValue={new Date().toISOString().substring(0, 10)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Linha 5: Parcelamento */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="parcelado" className="font-medium text-gray-800">Receita Parcelada?</label>
                                    <button type="button" onClick={() => setIsParcelado(!isParcelado)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isParcelado ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isParcelado ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                                {isParcelado && (
                                     <div className="mt-4">
                                        <label htmlFor="numParcelas" className="block text-sm font-medium text-gray-700 mb-1">Número de Parcelas</label>
                                        <input 
                                            type="number" 
                                            id="numParcelas" 
                                            value={numParcelas}
                                            onChange={(e) => setNumParcelas(e.target.value)}
                                            min="2"
                                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                        <p className="text-xs text-gray-500 mt-2">O sistema irá gerar {numParcelas} contas a receber com o valor de R$ [Valor Total / {numParcelas}] cada.</p>
                                    </div>
                                )}
                            </div>

                            {/* Ações */}
                            <div className="pt-6 flex justify-end space-x-4">
                                <button type="button" className="py-2.5 px-6 rounded-lg font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" className="py-2.5 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2">
                                    <Plus size={18} /> Salvar Lançamento
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}