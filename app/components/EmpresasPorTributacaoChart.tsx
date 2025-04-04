import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import data from '../data/empresa-usuario.json'; 

interface Company {
  COD: number;
  'RAZÃO SOCIAL': string;
  CNPJ: string;
  TRIBUTACAO: string;
}

const EmpresasPorTributacaoChart = () => {
  const tributacaoData = useMemo(() => {
    const counts: { [key: string]: number } = {};
    data.forEach((company: Company) => {
      const tributacao = company.TRIBUTACAO;
      counts[tributacao] = (counts[tributacao] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ tributacao: key, count: counts[key] }));
  }, [data]);

  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Empresas por Tributação</h2>
      <BarChart width={500} height={300} data={tributacaoData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tributacao" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default EmpresasPorTributacaoChart;