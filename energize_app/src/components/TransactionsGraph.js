import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsGraph = ({ transactions }) => {    
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Transactions",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [data, setData] = useState({labels, datasets: []})
  useEffect(() => {
    function getEnergy(type){
        const monthArray = new Array(12).fill(0)
        for(let i in transactions){
            if(type === 0 && transactions[i].transactionType === 1) continue
            if(type === 1 && transactions[i].transactionType === 0) continue
            const month = transactions[i].dateCreated.toDate().getMonth()
            const energy = transactions[i].energyAmount
            monthArray[month] += energy
        }
        return monthArray;
    }
    const energyBought = getEnergy(0);
    const energySold = getEnergy(1);
    setData({...data, datasets: [
        {
            label: "Energy Bought",
            data: energyBought,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Energy Sold",
            data: energySold,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        }
    ]});
  }, [transactions])

  return <Line options={options} data={data} />;
};

export default TransactionsGraph;
