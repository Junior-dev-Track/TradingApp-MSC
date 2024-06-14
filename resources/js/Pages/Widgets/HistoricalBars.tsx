import { usePage } from "@inertiajs/react";

const HistoricalBars = () => {
    const { barsData } = usePage().props;
    console.log("barsData:", barsData);
    return (
        <div className="text-white">
            <h2>Historical Bars Data</h2>
        </div>
    );
};

export default HistoricalBars;
