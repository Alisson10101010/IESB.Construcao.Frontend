'use client';


import Pagina from '@/components/Pagina';
import React from 'react';
import { Box, Card, Typography, Grid, Avatar } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';

// importa os componentes essenciais, graficos
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Sales = () => {

  // Dados de vendas por tipo de peça de roupa
  const dataBar = {
    labels: ['Camisetas', 'Calças', 'Jaquetas', 'Tênis'],
    datasets: [
      {
        label: 'Vendas por Tipo de Peça',
        data: [150, 200, 120, 180],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        borderWidth: 1,
      },
    ],
  };

  // Dados para o gráfico de pizza
  const dataPie = {
    labels: ['Camisetas', 'Calças', 'Jaquetas', 'Tênis'],
    datasets: [
      {
        data: [150, 200, 120, 180],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        borderColor: '#ffffff',
      },
    ],
  };

  return (
    <Pagina titulo="Controle de Vendas"> {/* Incluindo o componente Pagina para o menu */}
      <Box p={3} maxWidth="lg" mx="auto">


        <Grid container spacing={4} justifyContent="center">

          {/* Informações adicionais de vendas */}
          
          <Grid item xs={12} md={4}>
            <Card style={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: '#FF6384', marginRight: '16px' }}>R$</Avatar>
                <Box>
                  <Typography variant="h6">Vendas Totais</Typography>
                  <Typography variant="subtitle1">R$ 12.500,00</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card style={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: '#36A2EB', marginRight: '16px' }}>💼</Avatar>
                <Box>
                  <Typography variant="h6">Pedidos Concluídos</Typography>
                  <Typography variant="subtitle1">180 Pedidos</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card style={{ backgroundColor: '#f5f5f5', padding: '16px' }}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: '#FFCE56', marginRight: '16px' }}>👚</Avatar>
                <Box>
                  <Typography variant="h6">Peça Mais Vendida</Typography>
                  <Typography variant="subtitle1">Camisetas</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Gráfico de Barras Menor */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: '#e3f2fd', padding: '16px' }}>
              <Typography variant="h6" color="secondary" textAlign="center" gutterBottom>
                Vendas por Tipo de Peça
              </Typography>
              <Box height={200}>
                <Bar data={dataBar} options={{ maintainAspectRatio: false }} />
              </Box>
            </Card>
          </Grid>

          {/* Gráfico de Pizza Menor */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: '#e3f2fd', padding: '16px' }}>
              <Typography variant="h6" color="secondary" textAlign="center" gutterBottom>
                Proporção de Vendas por Peça
              </Typography>
              <Box height={200}>
                <Pie data={dataPie} options={{ maintainAspectRatio: false }} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Pagina>
  );
};

export default Sales;
