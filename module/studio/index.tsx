"use client";

import React, { useState } from 'react';
import {
    FiMousePointer,
    FiMove,
    FiSquare,
    FiCircle,
    FiType,
    FiImage,
    FiLayers,
    FiPlus,
    FiDatabase,
    FiSettings,
    FiChevronRight,
    FiChevronDown
} from 'react-icons/fi';
import { Canvas } from './components/canvas';
import { Layers } from './components/layers';
import { LoadData } from './components/load-data';

export function Studio() {
    const [leftPanelOpen, setLeftPanelOpen] = useState(true);
    const [rightPanelOpen, setRightPanelOpen] = useState(true);

    return (
        <div className="h-screen w-screen overflow-hidden bg-[#e5e5e5] dark:bg-base-300 relative font-sans text-base-content selection:bg-primary/30">

            {/* --- CANVAS AREA --- */}
            <Canvas />
            <LoadData />

            {/* --- FLOATING BOTTOM TOOLBAR --- */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-base-100/90 backdrop-blur-md shadow-2xl shadow-base-content/10 rounded-full px-2 py-1.5 flex items-center gap-1 border border-base-content/10">
                    <div className="tooltip" data-tip="Seleccionar (V)">
                        <button className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200 bg-base-200">
                            <FiMousePointer size={16} />
                        </button>
                    </div>
                    <div className="tooltip" data-tip="Mano (H)">
                        <button className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200">
                            <FiMove size={16} />
                        </button>
                    </div>
                    <div className="w-px h-6 bg-base-content/10 mx-1"></div>
                    <div className="tooltip" data-tip="Rectángulo (R)">
                        <button className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200">
                            <FiSquare size={16} />
                        </button>
                    </div>
                    <div className="tooltip" data-tip="Elipse (O)">
                        <button className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200">
                            <FiCircle size={16} />
                        </button>
                    </div>
                    <div className="tooltip" data-tip="Texto (T)">
                        <button className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200">
                            <FiType size={16} />
                        </button>
                    </div>
                    <div className="w-px h-6 bg-base-content/10 mx-1"></div>
                    <div className="tooltip" data-tip="Imagen (Shift+K)">
                        <button className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200">
                            <FiImage size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- TOP HEADER & ACTIONS --- */}
            <div className="absolute top-4 left-0 right-0 px-4 z-20 flex justify-between items-start pointer-events-none">

                {/* Left Side: File Info */}
                <div className="pointer-events-auto flex items-center gap-2 bg-base-100/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-base-content/10">
                    <div className="w-8 h-8 rounded bg-primary/20 text-primary flex items-center justify-center font-bold">
                        W
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold leading-tight">Draft Reporte Ventas</span>
                        <span className="text-[10px] text-base-content/50 leading-tight">Guardado hace 2 min</span>
                    </div>
                </div>


            </div>

            {/* --- LEFT PANEL: ELEMENT TREE (LAYERS) --- */}
            <Layers />

            {/* --- RIGHT PANEL: PROPERTIES --- */}
            <div
                className={`absolute top-20 right-4 bottom-6 z-20 bg-base-100/90 backdrop-blur-md rounded-2xl shadow-xl shadow-base-content/5 border border-base-content/10 transition-all duration-300 flex flex-col overflow-hidden ${rightPanelOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="p-3 border-b border-base-content/10 flex items-center gap-2 font-medium text-sm bg-base-100/50">
                    <FiSettings className="text-base-content/70" />
                    Propiedades
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
                    {/* X / Y / W / H Controls */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-base-content/50 w-3">X</span>
                            <input type="text" className="input input-sm input-bordered w-full rounded-md font-mono text-xs" defaultValue="40" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-base-content/50 w-3">Y</span>
                            <input type="text" className="input input-sm input-bordered w-full rounded-md font-mono text-xs" defaultValue="128" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-base-content/50 w-3">W</span>
                            <input type="text" className="input input-sm input-bordered w-full rounded-md font-mono text-xs" defaultValue="256" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-base-content/50 w-3">H</span>
                            <input type="text" className="input input-sm input-bordered w-full rounded-md font-mono text-xs" defaultValue="128" />
                        </div>
                    </div>

                    <div className="divider my-0"></div>

                    {/* Background / Color */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-base-content/70 uppercase">
                            Relleno
                            <FiPlus size={14} className="cursor-pointer hover:text-base-content" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded border border-base-content/20 bg-primary/10"></div>
                            <input type="text" className="input input-sm input-bordered flex-1 rounded-md text-xs font-mono" defaultValue="Primary / 10%" />
                        </div>
                    </div>

                    <div className="divider my-0"></div>

                    {/* Stroke */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-base-content/70 uppercase">
                            Borde
                            <FiPlus size={14} className="cursor-pointer hover:text-base-content" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded border border-base-content/20 bg-primary"></div>
                            <input type="text" className="input input-sm input-bordered flex-1 rounded-md text-xs font-mono" defaultValue="Primary" />
                        </div>
                        <div className="flex items-center justify-between text-base-content/70">
                            <span>Grosor</span>
                            <div className="flex items-center gap-2">
                                <input type="text" className="input input-sm input-bordered w-16 text-center rounded-md font-mono" defaultValue="2px" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-base-content/70">
                            <span>Estilo</span>
                            <select className="select select-sm select-bordered w-24 rounded-md font-normal text-xs" defaultValue="Dashed">
                                <option>Sólido</option>
                                <option>Punteado</option>
                                <option>Dashed</option>
                            </select>
                        </div>
                    </div>

                    <div className="divider my-0"></div>

                    {/* Data Source Bindings */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-base-content/70 uppercase">
                            Datos Enlazados
                        </div>
                        <div className="p-2 bg-base-200 rounded-lg text-xs flex flex-col gap-1 border border-base-content/10">
                            <span className="text-base-content/60">Fuente:</span>
                            <span className="font-medium text-primary">Ventas Trimestrales (API)</span>
                        </div>
                        <button className="btn btn-xs btn-outline w-full rounded-md border-base-content/20 mt-1">
                            Cambiar Fuente
                        </button>
                    </div>
                </div>
            </div>


            <div className="absolute bottom-6 right-4 z-20">
                <button
                    className={`btn btn-circle btn-sm ${rightPanelOpen ? 'btn-primary text-white' : 'btn-ghost bg-base-100/90 backdrop-blur-md border border-base-content/10'} shadow-md transition-colors`}
                    onClick={() => setRightPanelOpen(!rightPanelOpen)}
                    title="Alternar Propiedades"
                >
                    <FiSettings size={14} />
                </button>
            </div>
        </div>
    );
}
