import { usePage } from '@inertiajs/react';

const HistoricalBars = () => {
    const { barsData } = usePage().props;
        console.log('barsData:', barsData);
        return (
                <div>
                    <h2>Historical Bars Data</h2>
                    {barsData ? (
                        <pre>{JSON.stringify(barsData, null, 2)}</pre>
                    ) : (
                        <div>Error: No data available</div>
                    )}
                </div>
        );
};

export default HistoricalBars;
