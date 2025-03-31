"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabaseClient'; // Ajuste o caminho conforme necessário

interface Company {
  COD: number;
  razao_social: string;
  CNPJ: string;
  TRIBUTAÇÃO: string;
  RESPONSÁVEL: string;
  DocumentoLançamentoFiscal: string | null | undefined;
  FolhaPatrimônio: string | null | undefined;
  Conciliação: string | null | undefined;
  StatusFolha2: string | null | undefined;
  pro_labore: string | null | undefined;
  GRUPO: string | null | undefined;
  Situação: string | null | undefined;
  perfil_1: string | null | undefined;
  perfil_2: string | null | undefined;
  DocumentosRecebimento: number | null | undefined;
  OBSERVAÇÃO: string | null | undefined;
}

const EditarEmpresaPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Company>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cadastro_empresas')
          .select('*')
          .eq('COD', id)
          .single();

        if (error) {
          setError(error.message);
        } else if (data) {
          setFormData(data);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompany();
    }
  }, [id]);

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
      .update(formData)
      .eq('COD', id)
      .select();

    if (error) {
      setErrorMessage(`Erro ao atualizar empresa: ${error.message}`);
    } else if (data && data.length > 0) {
      setSuccessMessage('Empresa atualizada com sucesso!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
  };

  if (loading) {
    return <div>Carregando dados da empresa para edição...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados da empresa: {error}</div>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-xl font-semibold mb-4">Editar Empresa</h1>
      {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
      {formData && Object.keys(formData).length > 0 ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2">
            <label htmlFor="COD" className="block text-gray-700 text-sm font-bold mb-1">COD</label>
            <input type="number" id="COD" name="COD" value={formData.COD || ''} readOnly className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="razao_social" className="block text-gray-700 text-sm font-bold mb-1">Razão Social</label>
            <input type="text" id="razao_social" name="razao_social" value={formData.razao_social || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="CNPJ" className="block text-gray-700 text-sm font-bold mb-1">CNPJ</label>
            <input type="text" id="CNPJ" name="CNPJ" value={formData.CNPJ || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="TRIBUTAÇÃO" className="block text-gray-700 text-sm font-bold mb-1">TRIBUTAÇÃO</label>
            <input type="text" id="TRIBUTAÇÃO" name="TRIBUTAÇÃO" value={formData.TRIBUTAÇÃO || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="RESPONSÁVEL" className="block text-gray-700 text-sm font-bold mb-1">RESPONSÁVEL</label>
            <input type="text" id="RESPONSÁVEL" name="RESPONSÁVEL" value={formData.RESPONSÁVEL || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="DocumentoLançamentoFiscal" className="block text-gray-700 text-sm font-bold mb-1">DocumentoLançamentoFiscal</label>
            <input type="text" id="DocumentoLançamentoFiscal" name="DocumentoLançamentoFiscal" value={formData.DocumentoLançamentoFiscal || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="FolhaPatrimônio" className="block text-gray-700 text-sm font-bold mb-1">FolhaPatrimônio</label>
            <input type="text" id="FolhaPatrimônio" name="FolhaPatrimônio" value={formData.FolhaPatrimônio || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="Conciliação" className="block text-gray-700 text-sm font-bold mb-1">Conciliação</label>
            <input type="text" id="Conciliação" name="Conciliação" value={formData.Conciliação || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="StatusFolha2" className="block text-gray-700 text-sm font-bold mb-1">StatusFolha2</label>
            <input type="text" id="StatusFolha2" name="StatusFolha2" value={formData.StatusFolha2 || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="pro_labore" className="block text-gray-700 text-sm font-bold mb-1">pro_labore</label>
            <input type="text" id="pro_labore" name="pro_labore" value={formData.pro_labore || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="GRUPO" className="block text-gray-700 text-sm font-bold mb-1">GRUPO</label>
            <input type="text" id="GRUPO" name="GRUPO" value={formData.GRUPO || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="Situação" className="block text-gray-700 text-sm font-bold mb-1">Situação</label>
            <input type="text" id="Situação" name="Situação" value={formData.Situação || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="perfil_1" className="block text-gray-700 text-sm font-bold mb-1">perfil_1</label>
            <input type="text" id="perfil_1" name="perfil_1" value={formData.perfil_1 || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="perfil_2" className="block text-gray-700 text-sm font-bold mb-1">perfil_2</label>
            <input type="text" id="perfil_2" name="perfil_2" value={formData.perfil_2 || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="DocumentosRecebimento" className="block text-gray-700 text-sm font-bold mb-1">DocumentosRecebimento</label>
            <input type="number" id="DocumentosRecebimento" name="DocumentosRecebimento" value={formData.DocumentosRecebimento || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="OBSERVAÇÃO" className="block text-gray-700 text-sm font-bold mb-1">OBSERVAÇÃO</label>
            <input type="text" id="OBSERVAÇÃO" name="OBSERVAÇÃO" value={formData.OBSERVAÇÃO || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="col-span-full">
            <button type="submit" className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Salvar Alterações
            </button>
          </div>
        </form>
      ) : (
        <p>Nenhum dado da empresa encontrado.</p>
      )}
    </div>
  );
};

export default EditarEmpresaPage;