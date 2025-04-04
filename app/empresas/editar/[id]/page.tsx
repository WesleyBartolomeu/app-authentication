"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabaseClient'; // Ajuste o caminho conforme necessário

interface Company {
  COD: number;
  RAZAO_SOCIAL: string;
  CNPJ: string;
  TRIBUTACAO: string;
  RESPONSAVEL: string;
  DOCUMENTO_FOLHA: string | null | undefined;
  PATRIMONIO: string | null | undefined;
  CONCILIACAO: string | null | undefined;
  STATUS_FOLHA: string | null | undefined;
  PRO_LABORE: string | null | undefined;
  GRUPO: string | null | undefined;
  SITUACAO: string | null | undefined;
  PERFIL_1: string | null | undefined;
  PERFIL_2: string | null | undefined;
  LANCAMENTO: number | null | undefined;
  OBSERVACAO: string | null | undefined;
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
            <label htmlFor="RAZAO_SOCIAL" className="block text-gray-700 text-sm font-bold mb-1">Razão Social</label>
            <input type="text" id="RAZAO_SOCIAL" name="RAZAO_SOCIAL" value={formData.RAZAO_SOCIAL || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="CNPJ" className="block text-gray-700 text-sm font-bold mb-1">CNPJ</label>
            <input type="text" id="CNPJ" name="CNPJ" value={formData.CNPJ || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="TRIBUTACAO" className="block text-gray-700 text-sm font-bold mb-1">TRIBUTACAO</label>
            <input type="text" id="TRIBUTACAO" name="TRIBUTACAO" value={formData.TRIBUTACAO || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="RESPONSAVEL" className="block text-gray-700 text-sm font-bold mb-1">RESPONSAVEL</label>
            <input type="text" id="RESPONSAVEL" name="RESPONSAVEL" value={formData.RESPONSAVEL || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="DOCUMENTO_FOLHA" className="block text-gray-700 text-sm font-bold mb-1">DOCUMENTO_FOLHA</label>
            <input type="text" id="DOCUMENTO_FOLHA" name="DOCUMENTO_FOLHA" value={formData.DOCUMENTO_FOLHA || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="PATRIMONIO" className="block text-gray-700 text-sm font-bold mb-1">PATRIMONIO</label>
            <input type="text" id="PATRIMONIO" name="PATRIMONIO" value={formData.PATRIMONIO || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="CONCILIACAO" className="block text-gray-700 text-sm font-bold mb-1">CONCILIACAO</label>
            <input type="text" id="CONCILIACAO" name="CONCILIACAO" value={formData.CONCILIACAO || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="STATUS_FOLHA" className="block text-gray-700 text-sm font-bold mb-1">STATUS_FOLHA</label>
            <input type="text" id="STATUS_FOLHA" name="STATUS_FOLHA" value={formData.STATUS_FOLHA || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="PRO_LABORE" className="block text-gray-700 text-sm font-bold mb-1">PRO_LABORE</label>
            <input type="text" id="PRO_LABORE" name="PRO_LABORE" value={formData.PRO_LABORE || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="GRUPO" className="block text-gray-700 text-sm font-bold mb-1">GRUPO</label>
            <input type="text" id="GRUPO" name="GRUPO" value={formData.GRUPO || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="SITUACAO" className="block text-gray-700 text-sm font-bold mb-1">SITUACAO</label>
            <input type="text" id="SITUACAO" name="SITUACAO" value={formData.SITUACAO || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="PERFIL_1" className="block text-gray-700 text-sm font-bold mb-1">PERFIL_1</label>
            <input type="text" id="PERFIL_1" name="PERFIL_1" value={formData.PERFIL_1 || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="PERFIL_2" className="block text-gray-700 text-sm font-bold mb-1">PERFIL_2</label>
            <input type="text" id="PERFIL_2" name="PERFIL_2" value={formData.PERFIL_2 || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="LANCAMENTO" className="block text-gray-700 text-sm font-bold mb-1">LANCAMENTO</label>
            <input type="number" id="LANCAMENTO" name="LANCAMENTO" value={formData.LANCAMENTO || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-2">
            <label htmlFor="OBSERVACAO" className="block text-gray-700 text-sm font-bold mb-1">OBSERVACAO</label>
            <input type="text" id="OBSERVACAO" name="OBSERVACAO" value={formData.OBSERVACAO || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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