import React from "react";
import { Doughnut } from "react-chartjs-2"; // Importez le type de graphique que vous souhaitez utiliser

interface YourDataTypeHere {
    type: string;
    value: number;
}

const PortfolioDistribution = ({ data }: { data: YourDataTypeHere[] }) => {
    // Préparez les données pour le graphique Doughnut
    const chartData = {
        labels: data.map((item) => item.type), // Les types d'actifs
        datasets: [
            {
                label: "Répartition du Portefeuille",
                data: data.map((item) => item.value), // Les valeurs pour chaque type
                backgroundColor: [
                    // Des couleurs pour chaque segment
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#F7464A",
                    "#949FB1",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#F7464A",
                    "#949FB1",
                ],
            },
        ],
    };

    return (
        <div>
            <h2>Répartition du Portefeuille</h2>
            <Doughnut data={chartData} /> {/* c'est ici que l'ereur est causée */}
        </div>
    );
};

export default PortfolioDistribution;
