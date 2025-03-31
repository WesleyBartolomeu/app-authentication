// components/CompanySummary.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface Company {
  COD: number;
  'RAZÃO SOCIAL': string;
  CNPJ: string;
  TRIBUTAÇÃO: string;
  RESPONSÁVEL: string;
  DocumentoLançamentoFiscal: string | null | undefined;
  FolhaPatrimônio: string | null | undefined;
  Conciliação: string | null | undefined;
  StatusFolha2: string | null | undefined;
  'Pro Labore': string | null | undefined;
  GRUPO: string | null | undefined;
  Situação: string | null | undefined;
  'Perfil 1': string | null | undefined;
  'Perfil 2': string | null | undefined;
  DocumentosRecebimento: number | null | undefined;
  OBSERVAÇÃO: string | null | undefined;
}

interface CompanySummaryProps {
  company: Company;
}

const CompanySummary: React.FC<CompanySummaryProps> = ({ company }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/empresas/editar/${company.COD}`);
  };

  return (
    <div className="bg-sky-100 rounded-md shadow-md p-4 mb-4 border border-sky-200 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-sky-700">{company['RAZÃO SOCIAL']}</h3>
        <p className="text-gray-700 mb-1">CNPJ: {company.CNPJ}</p>
        <p className="text-gray-700 mb-1">COD: {company.COD}</p>
        <p className="text-gray-700 mb-1">Tributação: {company.TRIBUTAÇÃO}</p>
        <p className="text-gray-700 mb-1">Responsável: {company.RESPONSÁVEL}</p>
        <p className="text-gray-700 mb-1">Lançamento Fiscal: {company.DocumentoLançamentoFiscal !== null && company.DocumentoLançamentoFiscal !== undefined ? company.DocumentoLançamentoFiscal : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Folha Patrimônio: {company.FolhaPatrimônio !== null && company.FolhaPatrimônio !== undefined ? company.FolhaPatrimônio : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Conciliação: {company.Conciliação !== null && company.Conciliação !== undefined ? company.Conciliação : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Status Folha 2: {company.StatusFolha2 !== null && company.StatusFolha2 !== undefined ? company.StatusFolha2 : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Pró Labore: {company['Pro Labore'] !== null && company['Pro Labore'] !== undefined ? company['Pro Labore'] : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Grupo: {company.GRUPO !== null && company.GRUPO !== undefined ? company.GRUPO : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Situação: {company.Situação !== null && company.Situação !== undefined ? company.Situação : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Perfil 1: {company['Perfil 1'] !== null && company['Perfil 1'] !== undefined ? company['Perfil 1'] : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Perfil 2: {company['Perfil 2'] !== null && company['Perfil 2'] !== undefined ? company['Perfil 2'] : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Documentos Recebimento: {company.DocumentosRecebimento !== null && company.DocumentosRecebimento !== undefined ? company.DocumentosRecebimento : <span className="text-gray-500">N/A</span>}</p>
        <p className="text-gray-700 mb-1">Observação: {company.OBSERVAÇÃO !== null && company.OBSERVAÇÃO !== undefined ? company.OBSERVAÇÃO : <span className="text-gray-500">Nenhuma</span>}</p>
      </div>
      <button
        onClick={handleEditClick}
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm"
      >
        Editar
      </button>
      
    </div>
  );
};

export default CompanySummary;