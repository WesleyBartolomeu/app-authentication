"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Ajuste o caminho
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, PolarAngleAxis, PolarRadiusAxis, PolarGrid, RadialBarChart, RadialBar, Tooltip, Legend } from 'recharts';

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const PaginaResumoEmpresasRecharts = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [empresasPorResponsavelData, setEmpresasPorResponsavelData] = useState<
    { name: string; value: number; fill: string }[] | null
  >(null);
  const [empresasPorTributacaoData, setEmpresasPorTributacaoData] = useState<
    { name: string; value: number; fill: string }[] | null
  >(null);
  const [empresasComProLaboreData, setEmpresasComProLaboreData] = useState<
    { name: string; value: number; fill: string }[] | null
  >(null);
  const [empresasPorStatusFolha2Data, setEmpresasPorStatusFolha2Data] = useState<
    { name: string; value: number }[] | null
  >(null);
  const [empresasPorSituacaoData, setEmpresasPorSituacaoData] = useState<
    { name: string; value: number }[] | null
  >(null);

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
      // Processar dados para Empresas por Responsável (Pie Chart)
      const responsavelCounts: { [key: string]: number } = {};
      companies.forEach((company) => {
        const responsavel = company.RESPONSÁVEL;
        responsavelCounts[responsavel] = (responsavelCounts[responsavel] || 0) + 1;
      });
      setEmpresasPorResponsavelData(
        Object.keys(responsavelCounts).map((key, index) => ({
          name: key,
          value: responsavelCounts[key],
          fill: COLORS[index % COLORS.length],
        }))
      );

      // Processar dados para Empresas por Tributação (RadialBar Chart)
      const tributacaoCounts: { [key: string]: number } = {};
      companies.forEach((company) => {
        const tributacao = company.TRIBUTAÇÃO;
        tributacaoCounts[tributacao] = (tributacaoCounts[tributacao] || 0) + 1;
      });
      setEmpresasPorTributacaoData(
        Object.keys(tributacaoCounts).map((key, index) => ({
          name: key,
          value: tributacaoCounts[key],
          fill: COLORS[index % COLORS.length],
        }))
      );

      // Processar dados para Empresas com Pró Labore (Pie Chart)
      const proLaboreCount = companies.filter(company => company.pro_labore).length;
      const semProLaboreCount = companies.length - proLaboreCount;
      setEmpresasComProLaboreData([
        { name: 'Com Pró Labore', value: proLaboreCount, fill: COLORS[4] },
        { name: 'Sem Pró Labore', value: semProLaboreCount, fill: COLORS[5] },
      ]);

      // Processar dados para Empresas por Status Folha 2 (Bar Chart)
      const statusFolha2Counts: { [key: string]: number } = {};
      companies.forEach((company) => {
        const status = company.StatusFolha2 || 'Não Informado';
        statusFolha2Counts[status] = (statusFolha2Counts[status] || 0) + 1;
      });
      setEmpresasPorStatusFolha2Data(
        Object.keys(statusFolha2Counts).map((key) => ({ name: key, value: statusFolha2Counts[key] }))
      );

      // Processar dados para Empresas por Situação (Bar Chart)
      const situacaoCounts: { [key: string]: number } = {};
      companies.forEach((company) => {
        const situacao = company.Situação || 'Não Informado';
        situacaoCounts[situacao] = (situacaoCounts[situacao] || 0) + 1;
      });
      setEmpresasPorSituacaoData(
        Object.keys(situacaoCounts).map((key) => ({ name: key, value: situacaoCounts[key] }))
      );
    }
  }, [companies]);

  return (
    <div className="container my-20 mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Resumo Geral das Empresas (Recharts)</h1>
      <div className="flex flex-wrap gap-4">
        {empresasPorResponsavelData && (
          <div className="mb-8 p-4 bg-white text-stone-700 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Empresas por Responsável (Pie Chart)</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={empresasPorResponsavelData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                nameKey="name"
                label
              >
                {empresasPorResponsavelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}

        {empresasPorTributacaoData && (
          <div className="mb-8 p-4 bg-white text-stone-700 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Empresas por Tipo de Tributação (RadialBar Chart)</h2>
            <RadialBarChart width={500} height={300} innerRadius={20} outerRadius={140} data={empresasPorTributacaoData} startAngle={90} endAngle={-270}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" type="category" tickLine={false} />
              <RadialBar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
              <Tooltip />
              <Legend />
            </RadialBarChart>
          </div>
        )}

        {empresasComProLaboreData && (
          <div className="mb-8 p-4 bg-white text-stone-700 rounded shadow max-w-md mx-auto">
            <h2 className="text-xl stone-600 font-semibold mb-2">Empresas com Pró Labore (Pie Chart)</h2>
            <PieChart width={300} height={250}>
              <Pie
                data={empresasComProLaboreData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                nameKey="name"
                label
              >
                {empresasComProLaboreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}

        {empresasPorStatusFolha2Data && (
          <div className="mb-8 p-4 bg-white text-stone-700 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Empresas por Status Folha 2 (Bar Chart)</h2>
            <BarChart width={500} height={300} data={empresasPorStatusFolha2Data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </div>
        )}

        {empresasPorSituacaoData && (
          <div className="mb-8 p-4 bg-white text-stone-700 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">Empresas por Situação (Bar Chart)</h2>
            <BarChart width={500} height={300} data={empresasPorSituacaoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ffc658" />
            </BarChart>
          </div>
        )}
      </div>

      {!empresasPorResponsavelData && !empresasPorTributacaoData && !empresasComProLaboreData && !empresasPorStatusFolha2Data && !empresasPorSituacaoData && (
        <p>Carregando dados do resumo...</p>
      )}
    </div>
  );
};

export default PaginaResumoEmpresasRecharts;