'use client';
import { useToast } from "@/module/common/hook/useToast";
import { TableElement } from "@/module/elements";
import { useMemo, useState } from "react";
import { BsDatabase } from "react-icons/bs"

export const Form = () => {

    const [typeFileLoad, setTypeFileLoad] = useState<'json' | 'csv'>('json');
    const [separator, setSeparator] = useState<',' | ';' | '\t'>(',');
    const [file, setFile] = useState<File | null>(null);
    const [nameDataset, setNameDataset] = useState<string>('');
    const [headers, setHeaders] = useState<string[]>([]);
    const [dataRows, setDataRows] = useState<string[][]>([]);
    const [loadedData, setLoadedData] = useState(false)
    const { openToast } = useToast();
    const isValidLoad = useMemo(() => {
        if (typeFileLoad === 'json') {
            return !!file && !!typeFileLoad && !!nameDataset;
        }
        return !!file && !!typeFileLoad && !!separator && !!nameDataset;
    }, [file, typeFileLoad, separator, nameDataset])


    const handlerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const generatePreviewTable = () => {
        setLoadedData(false);
        if (!file) {
            openToast("Error al cargar el archivo", 'error');
            setLoadedData(false);
            setHeaders([]);
            setDataRows([]);
            return;
        }
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            const data = reader.result;
            if (!data) {
                openToast("Error al cargar el archivo", 'error');
                return;
            }
            const rows = data.toString().split('\n');
            const _headers = rows[0].split(separator);
            const _dataRows = rows.slice(1).map(row => row.split(separator));
            setHeaders(_headers);
            setDataRows(_dataRows);
            setLoadedData(true);
        }
    }



    return (
        <div className="w-[650px] h-fit bg-base-100 border transition-all duration-300 border-base-content/10 p-4">
            <div className="w-100 h-50 border border-base-300 border-dashed dashed relative">
                <input onChange={handlerFile} type="file" className="opacity-0 absolute top-0 left-0 w-full h-full" />
                <div className="w-full h-full flex flex-col items-center justify-center text-base-content/70">
                    <BsDatabase />
                    <p className="text-sm mt-1">
                        {
                            file?.name || 'Subir archivos JSON/CSV'
                        }
                    </p>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <fieldset className="fieldset  min-w-[45%]">
                    <legend>Tipo de archivo</legend>
                    <select className="select" value={typeFileLoad} onChange={(e) => setTypeFileLoad(e.target.value as 'json' | 'csv')}>
                        <option value="json">JSON</option>
                        <option value="csv">CSV</option>
                    </select>
                </fieldset>

                {
                    typeFileLoad === 'csv' &&
                    <fieldset className="fieldset min-w-[45%]">
                        <legend>Separación CSV</legend>
                        <select className="select" value={separator} onChange={(e) => setSeparator(e.target.value as ',' | ';' | '\t')}>
                            <option value=",">Coma (,)</option>
                            <option value=";">Punto y coma (;)</option>
                            <option value="\t">Tabulación (\t)</option>
                        </select>
                    </fieldset>
                }
            </div>

            <div className="flex justify-between mt-4 join">
                <input value={nameDataset} onChange={(e) => setNameDataset(e.target.value)} type="text" className="w-full input join-item" placeholder="Nombre del dataset" />
                <button onClick={generatePreviewTable} disabled={!isValidLoad} className="btn btn-primary join-item w-fit">Cargar</button>
            </div>

            {
                loadedData &&
                <div className="mt-2 mx-auto">
                    <div className="h-[200px] w-[600px] overflow-y-auto ">
                        <TableElement
                            args={{
                                columns: headers,
                                data: dataRows,
                                headers
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    )
}
