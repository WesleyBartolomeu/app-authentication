"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient'; // Ajuste o caminho se necessário

import { validateCnpj } from '../../utils/validations'; // Ajuste o caminho se necessário

const NovaEmpresaPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    COD: '',
    RAZAO_SOCIAL: '',
    CNPJ: '',
    TRIBUTACAO: '',
    RESPONSAVEL: '',
    DOCUMENTO_FOLHA: '',
    PATRIMONIO: '',
    CONCILIACAO: '',
    STATUS_FOLHA: '',
    PRO_LABORE: '',
    GRUPO: '',
    SITUACAO: '',
    PERFIL_1: '',
    PERFIL_2: '',
    LANCAMENTO: '',
    OBSERVACAO: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const { data, error } = await supabase
      .from('cadastro_empresas')
      .insert([formData])
      .select(); 

    if (error) {
      setErrorMessage(`Erro ao criar empresa: ${error.message}`);
    } else if (data && data.length > 0) {
      setSuccessMessage('Empresa criada com sucesso!');

      setTimeout(() => {
        router.push('/dashboard'); 
      }, 1500);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-xl font-semibold mb-4">Adicionar Nova Empresa</h1>
      {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-2">
          <label htmlFor="COD" className="block text-gray-700 text-sm font-bold mb-1">COD</label>
          <input type="number" id="COD" name="COD" value={formData.COD} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="RAZÃO SOCIAL" className="block text-gray-700 text-sm font-bold mb-1">Razão Social</label>
          <input type="text" id="RAZAO_SOCIAL" name="RAZAO_SOCIAL" value={formData.RAZAO_SOCIAL} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="CNPJ" className="block text-gray-700 text-sm font-bold mb-1">CNPJ</label>
          <input type="text" id="CNPJ" name="CNPJ" value={formData.CNPJ} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="TRIBUTACAO" className="block text-gray-700 text-sm font-bold mb-1">Tributação</label>
          <select
            id="TRIBUTACAO"
            name="TRIBUTACAO"
            value={formData.TRIBUTACAO}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecione...</option>
            <option value="Simples Nacional">Simples Nacional</option>
            <option value="Lucro Presumido">Lucro Presumido</option>
        </select>
        </div>
        <div className="mb-2">
          <label htmlFor="RESPONSAVEL" className="block text-gray-700 text-sm font-bold mb-1">Responsável</label>
          <input type="text" id="RESPONSAVEL" name="RESPONSAVEL" value={formData.RESPONSAVEL} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="DOCUMENTO_FOLHA" className="block text-gray-700 text-sm font-bold mb-1">Documento Lançamento Fiscal</label>
          <input type="text" id="DOCUMENTO_FOLHA" name="DOCUMENTO_FOLHA" value={formData.DOCUMENTO_FOLHA} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="PATRIMONIO" className="block text-gray-700 text-sm font-bold mb-1">Folha Patrimônio</label>
          <input type="text" id="PATRIMONIO" name="PATRIMONIO" value={formData.PATRIMONIO} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="CONCILIACAO" className="block text-gray-700 text-sm font-bold mb-1">CONCILIACAO</label>
          <input type="text" id="CONCILIACAO" name="CONCILIACAO" value={formData.CONCILIACAO} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="STATUS_FOLHA" className="block text-gray-700 text-sm font-bold mb-1">Status Folha 2</label>
          <select
            id="STATUS_FOLHA"
            name="TSTATUS_FOLHA"
            value={formData.STATUS_FOLHA}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecione...</option>
            <option value="Simples Nacional">Ok</option>
            <option value="Lucro Presumido">S/Mov</option>
        </select>
        </div>
        <div className="mb-2">
          <label htmlFor="Pro Labore" className="block text-gray-700 text-sm font-bold mb-1">Pró Labore</label>
          <select
            id="PRO_LABORE"
            name="PRO_LABORE"
            value={formData.PRO_LABORE}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Selecione...</option>
            <option value="Simples Nacional">Sim</option>
            <option value="Lucro Presumido">Nao</option>
        </select>        
        </div>
        <div className="mb-2">
          <label htmlFor="GRUPO" className="block text-gray-700 text-sm font-bold mb-1">Grupo</label>
          <input type="text" id="GRUPO" name="GRUPO" value={formData.GRUPO} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="SITUACAO" className="block text-gray-700 text-sm font-bold mb-1">SITUACAO</label>
          <input type="text" id="SITUACAO" name="SITUACAO" value={formData.SITUACAO} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="Perfil 1" className="block text-gray-700 text-sm font-bold mb-1">Perfil 1</label>
          <input type="text" id="PERFIL_1" name="PERFIL_1" value={formData.PERFIL_1} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="Perfil 2" className="block text-gray-700 text-sm font-bold mb-1">Perfil 2</label>
          <input type="text" id="PERFIL_2" name="PERFIL_2" value={formData.PERFIL_2} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="LANCAMENTO" className="block text-gray-700 text-sm font-bold mb-1">Documentos Recebimento</label>
          <input type="number" id="LANCAMENTO" name="LANCAMENTO" value={formData.LANCAMENTO} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="OBSERVACAO" className="block text-gray-700 text-sm font-bold mb-1">Observação</label>
          <input type="text" id="OBSERVACAO" name="OBSERVACAO" value={formData.OBSERVACAO} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="col-span-full">
          <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Adicionar Empresa
          </button>
        </div>
      </form>
    </div>
  );
};

export default NovaEmpresaPage;