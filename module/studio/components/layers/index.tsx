import React, { useState } from 'react'
import { FiChevronDown, FiChevronRight, FiDatabase, FiImage, FiLayers, FiPlus, FiSquare, FiType } from 'react-icons/fi'

export const Layers = () => {

    const [leftPanelOpen, setLeftPanelOpen] = useState(true);

    return (
        <>
            <div
                className={`absolute top-20 left-4 bottom-6 z-20 bg-base-100/90 backdrop-blur-md rounded-2xl shadow-xl shadow-base-content/5 border border-base-content/10 transition-all duration-300 flex flex-col overflow-hidden ${leftPanelOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="p-3 border-b border-base-content/10 flex items-center justify-between bg-base-100/50">
                    <div className="flex items-center gap-2 font-medium text-sm">
                        <FiLayers className="text-base-content/70" />
                        Capas / Elementos
                    </div>
                    <button className="btn btn-ghost btn-xs btn-square">
                        <FiPlus size={14} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-0.5 text-sm">
                    {/* Tree Item 1 */}
                    <div className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-base-200 cursor-default select-none">
                        <FiChevronDown size={14} className="text-base-content/40" />
                        <FiSquare size={14} className="text-base-content/70" />
                        <span className="flex-1 truncate">Reporte A4</span>
                    </div>

                    {/* Nested Items */}
                    <div className="pl-6 space-y-0.5">
                        <div className="group flex items-center gap-2 px-2 py-1.5 rounded-md bg-primary/10 text-primary cursor-default select-none">
                            <div className="w-3" />
                            <FiDatabase size={14} />
                            <span className="flex-1 truncate font-medium">Data Widget</span>
                        </div>

                        <div className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-base-200 cursor-default select-none">
                            <div className="w-3" />
                            <FiType size={14} className="text-base-content/70" />
                            <span className="flex-1 truncate text-base-content/80">Título Principal</span>
                        </div>

                        <div className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-base-200 cursor-default select-none">
                            <FiChevronRight size={14} className="text-base-content/40" />
                            <FiImage size={14} className="text-base-content/70" />
                            <span className="flex-1 truncate text-base-content/80">Logo Empresa</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-6 left-4 z-20">
                <button
                    className={`btn btn-circle btn-sm ${leftPanelOpen ? 'btn-primary ' : 'btn-ghost bg-base-100/90 backdrop-blur-md border border-base-content/10'} shadow-md transition-colors`}
                    onClick={() => setLeftPanelOpen(!leftPanelOpen)}
                    title="Alternar Capas"
                >
                    <FiLayers size={14} />
                </button>
            </div>
        </>
    )
}
