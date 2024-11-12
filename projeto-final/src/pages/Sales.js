'use client'

import Pagina from '../components/Pagina'
import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';  // Alterando para um gráfico de barras

// Importe os elementos necessários do Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrando os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Sales = () => {
  // Dados de vendas por tipo de peça de roupa
  const data = {
    labels: ['Camisetas', 'Calças', 'Jaquetas', 'Tênis'],  // Tipos de peças
    datasets: [
      {
        label: 'Vendas por Tipo de Peça',  // Título do gráfico
        data: [150, 200, 120, 180],  // Vendas por peça
        backgroundColor: 'rgba(75, 192, 192, 0.5)',  // Cor das barras
        borderColor: 'rgb(75, 192, 192)',  // Cor das bordas das barras
        borderWidth: 1,  // Largura da borda das barras
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Vendas por Peça
      </Typography>

      {/* Card para o gráfico */}
      <Card>
        <Box p={3}>
          <Typography variant="h6">Gráfico de Vendas por Tipo de Peça</Typography>
          {/* Inserindo o gráfico de barras */}
          <Bar data={data} />
        </Box>
      </Card>
    </Box>
  );
};

export default Sales;
