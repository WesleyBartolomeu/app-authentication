"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../app/utils/supabaseClient'; // Importe o cliente Supabase

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

interface CompanySummaryProps {
  company: Company;
  onCompanyDeleted?: (cod: number) => void; // Callback opcional para informar a exclusão ao componente pai
}

const CompanySummary: React.FC<CompanySummaryProps> = ({ company, onCompanyDeleted }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/empresas/editar/${company.COD}`);
  };

  const handleDeleteClick = async () => {
    if (window.confirm(`Tem certeza que deseja deletar a empresa: ${company.razao_social} (COD: ${company.COD})? Esta ação é irreversível.`)) {
      const { error } = await supabase
        .from('cadastro_empresas')
        .delete()
        .eq('COD', company.COD);

      if (error) {
        alert(`Erro ao deletar empresa: ${error.message}`);
      } else {
        alert(`Empresa "${company.razao_social}" deletada com sucesso!`);
        if (onCompanyDeleted) {
          onCompanyDeleted(company.COD); // Chama o callback para atualizar a lista no componente pai
        } else {
          // Se não houver callback, podemos recarregar a página para atualizar a lista
          router.refresh();
        }
      }
    }
  };

  return (
    <div className="bg-sky-100 rounded-md shadow-md p-4 mb-4 border border-sky-200 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-sky-700">{company.razao_social}</h3>
        <p className="text-gray-700 mb-1">CNPJ: {company.CNPJ}</p>
        <p className="text-gray-700 mb-1">COD: {company.COD}</p>
        <p className="text-gray-700 mb-1">Tributação: {company.TRIBUTAÇÃO}</p>
        <p className="text-gray-700 mb-1">Responsável: {company.RESPONSÁVEL}</p>
        <p className="text-gray-700 mb-1">Lançamento Fiscal: {company.DocumentoLançamentoFiscal !== null && company.DocumentoLançamentoFiscal !== undefined ? company.DocumentoLançamentoFiscal : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Folha Patrimônio: {company.FolhaPatrimônio !== null && company.FolhaPatrimônio !== undefined ? company.FolhaPatrimônio : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Conciliação: {company.Conciliação !== null && company.Conciliação !== undefined ? company.Conciliação : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Status Folha 2: {company.StatusFolha2 !== null && company.StatusFolha2 !== undefined ? company.StatusFolha2 : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Pró Labore: {company.pro_labore !== null && company.pro_labore !== undefined ? company.pro_labore : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Grupo: {company.GRUPO !== null && company.GRUPO !== undefined ? company.GRUPO : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Situação: {company.Situação !== null && company.Situação !== undefined ? company.Situação : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Perfil 1: {company.perfil_1 !== null && company.perfil_1 !== undefined ? company.perfil_1 : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Perfil 2: {company.perfil_2 !== null && company.perfil_2 !== undefined ? company.perfil_2 : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Documentos Recebimento: {company.DocumentosRecebimento !== null && company.DocumentosRecebimento !== undefined ? company.DocumentosRecebimento : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Observação: {company.OBSERVAÇÃO !== null && company.OBSERVAÇÃO !== undefined ? company.OBSERVAÇÃO : <span className="text-gray-500">Nenhuma</span>}</p>
      </div>
      <div className="flex flex-col items-end">
        <button
          onClick={handleEditClick}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm mb-2"
        >
          Editar
        </button>
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Deletar
        </button>
      </div>
    </div>
  );
};

export default CompanySummary;