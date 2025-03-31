"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient'; // Ajuste o caminho se necessário

const NovaEmpresaPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    COD: '',
    razao_social: '',
    CNPJ: '',
    TRIBUTAÇÃO: '',
    RESPONSÁVEL: '',
    DocumentoLançamentoFiscal: '',
    FolhaPatrimônio: '',
    Conciliação: '',
    StatusFolha2: '',
    pro_labore: '',
    GRUPO: '',
    Situação: '',
    perfil_1: '',
    perfil_2: '',
    DocumentosRecebimento: '',
    OBSERVAÇÃO: '',
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
      .select(); // Seleciona os dados inseridos para confirmar

    if (error) {
      setErrorMessage(`Erro ao criar empresa: ${error.message}`);
    } else if (data && data.length > 0) {
      setSuccessMessage('Empresa criada com sucesso!');
      // Redirecionar para o Dashboard após alguns segundos
      setTimeout(() => {
        router.push('/dashboard'); // Ou a página onde você lista as empresas
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
          <input type="text" id="razao_social" name="razao_social" value={formData.razao_social} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="CNPJ" className="block text-gray-700 text-sm font-bold mb-1">CNPJ</label>
          <input type="text" id="CNPJ" name="CNPJ" value={formData.CNPJ} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="TRIBUTAÇÃO" className="block text-gray-700 text-sm font-bold mb-1">Tributação</label>
          <input type="text" id="TRIBUTAÇÃO" name="TRIBUTAÇÃO" value={formData.TRIBUTAÇÃO} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="RESPONSÁVEL" className="block text-gray-700 text-sm font-bold mb-1">Responsável</label>
          <input type="text" id="RESPONSÁVEL" name="RESPONSÁVEL" value={formData.RESPONSÁVEL} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="DocumentoLançamentoFiscal" className="block text-gray-700 text-sm font-bold mb-1">Documento Lançamento Fiscal</label>
          <input type="text" id="DocumentoLançamentoFiscal" name="DocumentoLançamentoFiscal" value={formData.DocumentoLançamentoFiscal} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="FolhaPatrimônio" className="block text-gray-700 text-sm font-bold mb-1">Folha Patrimônio</label>
          <input type="text" id="FolhaPatrimônio" name="FolhaPatrimônio" value={formData.FolhaPatrimônio} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="Conciliação" className="block text-gray-700 text-sm font-bold mb-1">Conciliação</label>
          <input type="text" id="Conciliação" name="Conciliação" value={formData.Conciliação} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="StatusFolha2" className="block text-gray-700 text-sm font-bold mb-1">Status Folha 2</label>
          <input type="text" id="StatusFolha2" name="StatusFolha2" value={formData.StatusFolha2} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="Pro Labore" className="block text-gray-700 text-sm font-bold mb-1">Pró Labore</label>
          <input type="text" id="pro_labore" name="pro_labore" value={formData.pro_labore} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="GRUPO" className="block text-gray-700 text-sm font-bold mb-1">Grupo</label>
          <input type="text" id="GRUPO" name="GRUPO" value={formData.GRUPO} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="Situação" className="block text-gray-700 text-sm font-bold mb-1">Situação</label>
          <input type="text" id="Situação" name="Situação" value={formData.Situação} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="Perfil 1" className="block text-gray-700 text-sm font-bold mb-1">Perfil 1</label>
          <input type="text" id="perfil_1" name="perfil_1" value={formData.perfil_1} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="Perfil 2" className="block text-gray-700 text-sm font-bold mb-1">Perfil 2</label>
          <input type="text" id="perfil_2" name="perfil_2" value={formData.perfil_2} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="DocumentosRecebimento" className="block text-gray-700 text-sm font-bold mb-1">Documentos Recebimento</label>
          <input type="number" id="DocumentosRecebimento" name="DocumentosRecebimento" value={formData.DocumentosRecebimento} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-2">
          <label htmlFor="OBSERVAÇÃO" className="block text-gray-700 text-sm font-bold mb-1">Observação</label>
          <input type="text" id="OBSERVAÇÃO" name="OBSERVAÇÃO" value={formData.OBSERVAÇÃO} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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