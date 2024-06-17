import React from 'react';
import { usePage } from "@inertiajs/react";
import PriceChart from "@/Pages/Auth/PriceChart"; // Assurez-vous que le chemin est correct
import VolumeChart from "@/Pages/Auth/VolumeChart"; // Assurez-vous que le chemin est correct

// Define the BarData type
interface BarData {
    symbol: string;

    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
    date: string; // Add the 'date' property
    t: number; // Add the 't' property
}

const HistoricalBars = () => {
    const { barsData }: { barsData: { original: any } } = usePage().props as unknown as { barsData: { original: any } };
    console.log("barsData:", barsData);

    // Transformons les données pour qu'elles soient utilisables dans les graphiques
    const data: BarData[] = [];
    if (barsData && (barsData as any).original) {
        Object.keys(barsData.original).forEach(symbol => {
            barsData.original[symbol].forEach((entry: any) => {
                data.push({
                    symbol: symbol,
                    date: new Date(entry.t * 1000).toLocaleDateString(), // Assumant que 't' est un timestamp en secondes
                    o: entry.o,
                    h: entry.h,
                    l: entry.l,
                    c: entry.c,
                    v: entry.v,
                    t: entry.t // Add the 't' property
                });
            });
        });
    }

    if (data.length === 0) {
        return <div className="text-white">Aucune donnée historique disponible.</div>;
    }

    return (
        <div className="text-white">
            <h2>Historical Bars Data</h2>
            <PriceChart data={data} />
            <VolumeChart data={data} />
        </div>
    );
};

export default HistoricalBars;
