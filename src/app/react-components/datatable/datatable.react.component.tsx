import * as React from 'react';
import {TickerPrice} from "../../common/model";

interface DataTableProps {
    data: TickerPrice[];
    removeTicker?: (ticker: string) => void;
}

const DatatableReactComponent: React.FC<DataTableProps> = ({data, removeTicker}) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    const handleRemoveTicker = (ticker: string) => {
        if (removeTicker) {
            removeTicker(ticker);
        }
    };

    return (
        <table>
            <caption>Live Crypto Data</caption>
            <thead>
            <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    <td>{row.ticker}</td>
                    <td>{row.price}</td>
                    <td>
                        <button onClick={() => handleRemoveTicker(row.ticker)}>Remove</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DatatableReactComponent;
