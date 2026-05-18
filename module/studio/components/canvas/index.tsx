import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css'
import React from 'react'
import { FiDatabase } from 'react-icons/fi';

export const Canvas = () => {
    return (
        <div
            className="absolute inset-0 z-0 overflow-auto cursor-crosshair"
            style={{
                backgroundImage: 'radial-gradient(var(--fallback-bc,oklch(var(--bc)/0.2)) 1px, transparent 0)',
                backgroundSize: '24px 24px'
            }}
        >
            <div className="min-h-[200vh] min-w-[100vh] flex items-center justify-center p-20">
                {/* Main Draft Canvas / Artboard */}
                <div className="w-[794px] h-[1123px] bg-white dark:bg-base-100 shadow-sm ring-1 ring-base-content/5 relative">
                    {/* Some placeholder canvas content */}
                    <div className="absolute top-10 left-10 text-4xl font-bold text-base-content/20 pointer-events-none">
                        Reporte A4
                    </div>

                    {/* Example Element on Canvas */}
                    <div className="absolute top-32 left-10 w-64 h-32 bg-primary/10 border-2 border-primary border-dashed flex flex-col items-center justify-center text-primary rounded-lg cursor-move hover:bg-primary/20 transition-colors">
                        <FiDatabase className="text-2xl mb-2" />
                        <span className="text-sm font-medium">Data Widget</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
