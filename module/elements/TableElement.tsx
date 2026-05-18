import React from 'react';
import type { Table } from '@/module/studio/type';

export interface TableElementProps {
    args: Table;
}

export const TableElement: React.FC<TableElementProps> = ({ args }) => {
    return (
        <div className="overflow-x-auto w-full border border-base-200 rounded-lg">
            <table className="table table-zebra w-full text-sm">
                <thead className="bg-base-200">
                    <tr>
                        {args.headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {args.data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
