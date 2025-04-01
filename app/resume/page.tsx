"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Ajuste o caminho
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PieController, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PieController, ArcElement, Title, Tooltip, Legend);

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

const PaginaResumoEmpresas = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [empresasPorResponsavelData, setEmpresasPorResponsavelData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  } | null>({ labels: [], datasets: [] });

  const [empresasPorTributacaoData, setEmpresasPorTributacaoData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  } | null>({ labels: [], datasets: [] });

  const [empresasComProLaboreData, setEmpresasComProLaboreData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  } | null>({ labels: [], datasets: [] });

  const [empresasPorStatusFolha2Data, setEmpresasPorStatusFolha2Data] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  } | null>({ labels: [], datasets: [] });

  const [empresasPorSituacaoData, setEmpresasPorSituacaoData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  } | null>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase.from('cadastro_empresas').select('*');
      if (error) {
        console.error('Erro ao buscar dados das empresas:', error);
        return;
      }
      if (data) {
        if (Array.isArray(data)) {
          setCompanies(data as Company[]);
        } else {
          console.error('Dados recebidos não são um array:', data);
        }
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (companies.length > 0) {
      // Processar dados para Empresas por Responsável
      const responsavelCounts: { [key: string]: number } = {};
      companies.forEach((company) => {
        const responsavel = company.RESPONSÁVEL;
        responsavelCounts[responsavel] = (responsavelCounts[responsavel] || 0) + 1;
      });
      setEmpresasPorResponsavelData({
        labels: Object.keys(responsavelCounts),
        datasets: [
          {
            label: 'Número de Empresas',
            data: Object.values(responsavelCounts),
            backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'],
          },
        ],
      });

      // Processar dados para Empresas por Tributação
      const tributacaoCounts: { [key: string]: number } = {};
      companies.forEach((company) => {
        const tributacao = company.TRIBUTAÇÃO;
        tributacaoCounts[tributacao] = (tributacaoCounts[tributacao] || 0) + 1;
      });
      setEmpresasPorTributacaoData({
        labels: Object.keys(tributacaoCounts),
        datasets: [
          {
            label: 'Número de Empresas',
            data: Object.values(tributacaoCounts),
            backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'],
          },
        ],
      });

      // Processar dados para Empresas com Pró Labore
      const proLaboreCount = companies.filter(company => company.pro_labore).length;
      const semProLaboreCount = companies.length - proLaboreCount;
      setEmpresasComProLaboreData({
        labels: ['Com Pró Labore', 'Sem Pró Labore'],
        datasets: [
          {
            label: 'Número de Empresas',
            data: [proLaboreCount, semProLaboreCount],
            backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 206, 86, 0.8)'],
          },
        ],
      });

      // Processar dados para Empresas por Status Folha 2
      const statusFolha2Counts: { [key: string]: number } = {};
      companies.forEach((company) => {
        const status = company.StatusFolha2 || 'Não Informado'; // Lidar com valores nulos/undefined
        statusFolha2Counts[status] = (statusFolha2Counts[status] || 0) + 1;
      });
      setEmpresasPorStatusFolha2Data({
        labels: Object.keys(statusFolha2Counts),
        datasets: [
          {
            label: 'Número de Empresas',
            data: Object.values(statusFolha2Counts),
            backgroundColor: ['rgba(255, 205, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(100, 200, 150, 0.8)'],
          },
        ],
      });

      // Processar dados para Empresas por Situação
      const situacaoCounts: { [key: string]: number } = {};
      companies.forEach((company) => {
        const situacao = company.Situação || 'Não Informado'; // Lidar com valores nulos/undefined
        situacaoCounts[situacao] = (situacaoCounts[situacao] || 0) + 1;
      });
      setEmpresasPorSituacaoData({
        labels: Object.keys(situacaoCounts),
        datasets: [
          {
            label: 'Número de Empresas',
            data: Object.values(situacaoCounts),
            backgroundColor: ['rgba(255, 159, 64, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(255, 205, 86, 0.8)', 'rgba(54, 162, 235, 0.8)'],
          },
        ],
      });
    }
  }, [companies]);

  const chartOptions = {
    responsive: true,
    aspectRatio: 2, // Experimente diferentes valores
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '', // O título será definido individualmente para cada gráfico
      },
    },
  };

  return (
    <div className="container my-20 mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Resumo Geral das Empresas</h1>
      <div className="flex flex-wrap gap-4">
        {empresasPorResponsavelData && (
          <div className="mb-8 p-4 bg-white text-stone-700 rounded shadow max-w-xl mx-auto max-h-[350px]">
            <h2 className="text-xl font-semibold mb-2">Empresas por Responsável</h2>
            <Pie data={empresasPorResponsavelData} options={chartOptions} />
          </div>
        )}

        {empresasPorTributacaoData && (
          <div className="mb-8 p-4 bg-white text-stone-700 rounded shadow max-w-xl mx-auto max-h-[350px]">
            <h2 className="text-xl font-semibold mb-2">Empresas por Tipo de Tributação</h2>
            <Bar data={empresasPorTributacaoData} options={chartOptions} />
          </div>
        )}

        {empresasComProLaboreData && (
          <div className="mb-8 p-4 bg-white text-stone-700 rounded shadow max-w-md mx-auto max-h-[350px]">
            <h2 className="text-xl stone-600 font-semibold mb-2">Empresas com Pró Labore</h2>
            <Pie data={empresasComProLaboreData} options={chartOptions} />
          </div>
        )}

        {empresasPorStatusFolha2Data && (
          <div className="mb-8 p-4 bg-white text-stone-700 rounded shadow max-w-xl mx-auto max-h-[350px]">
            <h2 className="text-xl font-semibold mb-2">Empresas por Status Folha 2</h2>
            <Bar data={empresasPorStatusFolha2Data} options={chartOptions} />
          </div>
        )}

        {empresasPorSituacaoData && (
          <div className="mb-8 p-4 bg-white text-stone-700 rounded shadow max-w-xl mx-auto max-h-[350px]">
            <h2 className="text-xl font-semibold mb-2">Empresas por Situação</h2>
            <Bar data={empresasPorSituacaoData} options={chartOptions} />
          </div>
        )}
      </div>

      {!empresasPorResponsavelData && !empresasPorTributacaoData && !empresasComProLaboreData && !empresasPorStatusFolha2Data && !empresasPorSituacaoData && (
        <p>Carregando dados do resumo...</p>
      )}
    </div>
  );
};

export default PaginaResumoEmpresas;