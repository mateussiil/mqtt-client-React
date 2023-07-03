import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { 
  Chart as ChartJS , 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, 
  LineController
} from 'chart.js';
import { QosOption, topicHatual } from '../Hook/Mqtt';
import { useContext } from 'react';

ChartJS.register(
  LineController, 
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const getTime = () => {
  const dataAtual = new Date();

  // Obtém as horas, minutos, segundos e milissegundos
  const horas = dataAtual.getHours();
  const minutos = dataAtual.getMinutes();
  const segundos = dataAtual.getSeconds();
  const milissegundos = dataAtual.getMilliseconds();

  const resultado = `${horas}:${minutos}:${segundos}.${milissegundos}`;

  return resultado
}

const customChartData = (chartData, message) => {
  const newLabels = [...chartData.labels];
  const newData = [...chartData.datasets[0].data];

  if (newLabels.length > 10) {
    newLabels.shift();
  }

  newLabels.push(getTime());

  if (newData.length > 10) {
    newData.shift();
  }

  newData.push(message);

  return {
    ...chartData,
    labels: newLabels,
    datasets: [
      {
        ...chartData.datasets[0],
        data: newData
      }
    ]
  };
}

const initialChart = {
  labels: [0],
  datasets: [
    {
      data: [0],
      borderColor: 'rgb(75, 192, 192)',
      label: 'Nivel Atual',
      borderWidth: 1,
      backgroundColor: "red",
    }
  ]
}

export const NivelTanqueChart = () => {
  const { payload } = useContext(QosOption)

  const [chartData, setChartData] = useState(initialChart);
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      if (payload.topic === topicHatual) {
        setChartData(prevChart => customChartData(prevChart, JSON.parse(payload.message)))
      }
    }
  }, [payload])

  return (
    <Card
      title="Nísvel do tanque"
    >
      <Chart 
        type='line'
        ref={chartRef}
        data={chartData}
        />
    </Card>
  );
};