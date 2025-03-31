"use client"

import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Importe seu cliente Supabase
import CompanySummary from '../components/CompanySumary'; // Certifique-se que o caminho está correto

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

export default function Dashboard() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cadastro_empresas') // Use o nome da sua tabela
          .select('*');

        if (error) {
          setError(error.message);
        } else if (data) {
          setCompanies(data);
          console.log("Dados recebidos do Supabase:", data);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []); // O array de dependências vazio significa que este efeito rodará apenas uma vez, na montagem do componente

  if (loading) {
    return <div>Carregando dados das empresas...</div>;
  }

  if (error) {
    return <div>Erro ao carregar dados das empresas: {error}</div>;
  }

  return (
    <div className="bg-gray-400 p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900">Dashboard</h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Resumo das Empresas</h2>
      {companies.map((company) => (
        <CompanySummary key={company.COD} company={company} />
      ))}
    </div>
  );
}