"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../app/utils/supabaseClient'; // Importe o cliente Supabase
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'; // Ícones para o dropdown

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
    if (window.confirm(`Tem certeza que deseja deletar a empresa: ${company.RAZAO_SOCIAL} (COD: ${company.COD})? Esta ação é irreversível.`)) {
      const { error } = await supabase
        .from('cadastro_empresas')
        .delete()
        .eq('COD', company.COD);

      if (error) {
        alert(`Erro ao deletar empresa: ${error.message}`);
      } else {
        alert(`Empresa "${company.RAZAO_SOCIAL}" deletada com sucesso!`);
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
          <h3 className="text-xl font-semibold text-gray-800">{company.RAZAO_SOCIAL}</h3>
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
          <div><p className="text-gray-600 font-semibold">Tributação:</p><p className="text-gray-700">{company.TRIBUTACAO}</p></div>
          <div><p className="text-gray-600 font-semibold">Responsável:</p><p className="text-gray-700">{company.RESPONSAVEL}</p></div>
          <div><p className="text-gray-600 font-semibold">Lançamento Fiscal:</p><p className="text-gray-700">{company.DOCUMENTO_FOLHA !== null && company.DOCUMENTO_FOLHA !== undefined ? company.DOCUMENTO_FOLHA : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Folha Patrimônio:</p><p className="text-gray-700">{company.PATRIMONIO !== null && company.PATRIMONIO !== undefined ? company.PATRIMONIO : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">CONCILIACAO:</p><p className="text-gray-700">{company.CONCILIACAO !== null && company.CONCILIACAO !== undefined ? company.CONCILIACAO : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Status Folha 2:</p><p className="text-gray-700">{company.STATUS_FOLHA !== null && company.STATUS_FOLHA !== undefined ? company.STATUS_FOLHA : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Pró Labore:</p><p className="text-gray-700">{company.PRO_LABORE !== null && company.PRO_LABORE !== undefined ? company.PRO_LABORE : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Grupo:</p><p className="text-gray-700">{company.GRUPO !== null && company.GRUPO !== undefined ? company.GRUPO : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">SITUACAO:</p><p className="text-gray-700">{company.SITUACAO !== null && company.SITUACAO !== undefined ? company.SITUACAO : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Perfil 1:</p><p className="text-gray-700">{company.PERFIL_1 !== null && company.PERFIL_1 !== undefined ? company.PERFIL_1 : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Perfil 2:</p><p className="text-gray-700">{company.PERFIL_2 !== null && company.PERFIL_2 !== undefined ? company.PERFIL_2 : <span className="text-gray-500">N/A</span>}</p></div>
          <div><p className="text-gray-600 font-semibold">Documentos Recebimento:</p><p className="text-gray-700">{company.LANCAMENTO !== null && company.LANCAMENTO !== undefined ? company.LANCAMENTO : <span className="text-gray-500">N/A</span>}</p></div>
          <div className="col-span-full"><p className="text-gray-600 font-semibold">Observação:</p><p className="text-gray-700">{company.OBSERVACAO !== null && company.OBSERVACAO !== undefined ? company.OBSERVACAO : <span className="text-gray-500">Nenhuma</span>}</p></div>
        </div>
      )}
    </div>
  );
};

export default CompanySummary;