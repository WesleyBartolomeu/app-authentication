"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../app/utils/supabaseClient'; // Importe o cliente Supabase
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'; // Ícones para o dropdown

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
  const [isExpanded, setIsExpanded] = useState(false);

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
          router.refresh();
        }
      }
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{company.razao_social}</h3>
          <p className="text-gray-600">{company.CNPJ}</p>
        </div>
        <div className="flex items-center">
          <button onClick={handleEditClick} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm mr-2">Editar</button>
          <button onClick={handleDeleteClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm">Deletar</button>
          <button onClick={toggleExpand} className="ml-2 focus:outline-none">
            {isExpanded ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 border-t pt-4 border-gray-200">
          <div><p className="text-gray-600 font-semibold">COD:</p><p className="text-gray-700">{company.COD}</p></div>
          <div><p className="text-gray-600 font-semibold">Tributação:</p><p className="text-gray-700">{company.TRIBUTAÇÃO}</p></div>
          <div><p className="text-gray-600 font-semibold">Responsável:</p><p className="text-gray-700">{company.RESPONSÁVEL}</p></div>
          <div><p className="text-gray-600 font-semibold">Lançamento Fiscal:</p><p className="text-gray-700">{company.DocumentoLançamentoFiscal !== null && company.DocumentoLançamentoFiscal !== undefined ? company.DocumentoLançamentoFiscal : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Folha Patrimônio:</p><p className="text-gray-700">{company.FolhaPatrimônio !== null && company.FolhaPatrimônio !== undefined ? company.FolhaPatrimônio : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Conciliação:</p><p className="text-gray-700">{company.Conciliação !== null && company.Conciliação !== undefined ? company.Conciliação : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Status Folha 2:</p><p className="text-gray-700">{company.StatusFolha2 !== null && company.StatusFolha2 !== undefined ? company.StatusFolha2 : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Pró Labore:</p><p className="text-gray-700">{company.pro_labore !== null && company.pro_labore !== undefined ? company.pro_labore : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Grupo:</p><p className="text-gray-700">{company.GRUPO !== null && company.GRUPO !== undefined ? company.GRUPO : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Situação:</p><p className="text-gray-700">{company.Situação !== null && company.Situação !== undefined ? company.Situação : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Perfil 1:</p><p className="text-gray-700">{company.perfil_1 !== null && company.perfil_1 !== undefined ? company.perfil_1 : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Perfil 2:</p><p className="text-gray-700">{company.perfil_2 !== null && company.perfil_2 !== undefined ? company.perfil_2 : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Documentos Recebimento:</p><p className="text-gray-700">{company.DocumentosRecebimento !== null && company.DocumentosRecebimento !== undefined ? company.DocumentosRecebimento : <span className="text-gray-500">N/A</span>}</p></div>
          <div className="col-span-full"><p className="text-gray-600 font-semibold">Observação:</p><p className="text-gray-700">{company.OBSERVAÇÃO !== null && company.OBSERVAÇÃO !== undefined ? company.OBSERVAÇÃO : <span className="text-gray-500">Nenhuma</span>}</p></div>
        </div>
      )}
    </div>
  );
};

export default CompanySummary;