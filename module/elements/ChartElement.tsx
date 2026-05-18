import React from 'react';
import type { Chart } from '@/module/studio/type';

export interface ChartElementProps {
    args: Chart;
}

export const ChartElement: React.FC<ChartElementProps> = ({ args }) => {
    // Simple mock representation since we don't have a charting library installed yet
    const maxValue = Math.max(...Object.values(args.data), 1);
    
    return (
        <div className="w-full h-full min-h-[150px] p-4 bg-base-100 rounded-lg shadow-sm border border-base-200 flex flex-col">
            <div className="text-sm font-semibold mb-4 capitalize text-center">{args.type} Chart</div>
            
            {args.type === 'bar' && (
                <div className="flex items-end flex-1 gap-2">
                    {Object.entries(args.data).map(([label, value], idx) => {
                        const heightPercent = (value / maxValue) * 100;
                        return (
                            <div key={idx} className="flex flex-col items-center flex-1 gap-1 group relative h-full justify-end">
                                <div className="absolute -top-6 hidden group-hover:block bg-base-300 text-xs px-2 py-1 rounded shadow-md z-10">
                                    {value}
                                </div>
                                <div 
                                    className="w-full bg-primary rounded-t-sm transition-all min-h-[4px]"
                                    style={{ height: `${Math.max(heightPercent, 2)}%` }}
                                ></div>
                                <span className="text-xs truncate w-full text-center text-base-content/70">{label}</span>
                            </div>
                        )
                    })}
                </div>
            )}
            
            {args.type !== 'bar' && (
                <div className="flex-1 flex items-center justify-center bg-base-200 rounded text-base-content/50 text-xs text-center p-2">
                    [Renderizado visual de gráfico {args.type} pendiente]
                    <br/>
                    Datos: {Object.keys(args.data).length} series
                </div>
            )}
        </div>
    );
};
