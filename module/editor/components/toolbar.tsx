
import { useTranslate } from '@/module/common/hook/useTranslate'
import { SelectLanguage } from '@/module/deepl/components/select-language'
import { useState, useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { useEditorState } from '../context/use-editor-state'
import { LanguageCode } from 'deepl-node'
import clsx from 'clsx'
import { AiOutlineReload } from 'react-icons/ai'
import { translateText } from '@/module/deepl/service'
import { BlockAPI, OutputBlockData, BlockChangedEvent } from '@editorjs/editorjs'
import { EDITOR_HELP_STORAGE_KEY } from './editor.help'
import { SavedData } from '@editorjs/editorjs/types/data-formats'
import { useToast } from '@/module/common/hook/useToast'


export const Toolbar = ({ tabHelp, setTabHelp }: { tabHelp: boolean, setTabHelp: (tabHelp: boolean) => void }) => {

    const { t, locale } = useTranslate()
    const { activeTool, args, editorValue, editorHelpValue, lastEditorEvent } = useEditorState();
    const [loadingTranslate, setLoadingTranslate] = useState(false);
    const { openToast } = useToast()

    const handleControlModeTranslate = () => {
        if (!args?.targetLanguage) return openToast(t('editor.subtab.translate.error.select-language'), 'error');
        if (args?.mode === 'in-write') {
            activeTool('translate', { ...args, mode: 'one' })
        } else {
            activeTool('translate', { ...args, mode: 'in-write' })
        }
    }

    useEffect(() => {
        if (args?.mode === 'in-write' && lastEditorEvent?.type === 'block-added') {
            console.log("NUEVO BLOQUE AÑADIDO:", lastEditorEvent.detail);
            // Aquí puedes llamar a tu lógica de traducción
        }
        //Debounce de 1 segundo
        const timer = setTimeout(() => {
            onChangeBlock()
        }, 1000)
        return () => clearTimeout(timer)


    }, [lastEditorEvent, args?.mode]);

    const handleToolTranslate = async (code: LanguageCode) => {
        if (!code) return;
        activeTool('translate', {
            text: args?.text,
            sourceLanguage: 'auto',
            targetLanguage: code,
            mode: 'one'
        });

        //Convertir el contenido de los bloques del editor al idioma seleccionado
        const data = await editorValue?.save();
        const arrayParse = data?.blocks.map(block => ({ id: block.id, text: block?.data?.text }))
        console.log(data)
        const arrayClean = arrayParse?.filter(e => e.text !== undefined);
        const arrayTranslate = await Promise.all(
            (arrayClean || []).map(async (item) => {
                const result = await translateText(item.text as string, 'auto', code);
                console.log("TRANSLATE: ", `Text: ${item.text}`, "Result: ", result);
                return { id: item.id!, text: result.text };
            })
        );


        //@ts-ignore
        const arrayUpdate: OutputBlockData[] = arrayParse?.map(e => {
            const oldAttr = data?.blocks.find(bl => bl.id === e.id) as OutputBlockData;
            return {
                id: e.id,
                ...oldAttr!,
                data: {
                    ...oldAttr?.data,
                    text: arrayTranslate.find(tr => tr.id === e.id)?.text || oldAttr?.data?.text
                }
            }
        })

        if (arrayUpdate) {
            await editorHelpValue?.render({ blocks: arrayUpdate });
            const data = await editorHelpValue?.save()
            localStorage.setItem(`${EDITOR_HELP_STORAGE_KEY}-help`, JSON.stringify(data));
        }
    }


    const onChangeBlock = async () => {
        if (args?.mode === 'in-write' && lastEditorEvent?.type === 'block-changed') {
            const detail = lastEditorEvent.detail as { index: number };
            const index = detail.index

            const currentBlock = editorValue?.blocks?.getBlockByIndex(index);
            if (!currentBlock) return;
            const _block = await currentBlock.save();
            const block = _block as SavedData

            const text = block.data.text;
            if (!text) return;
            console.log(text)
            const _translateText = await translateText(text, 'auto', args?.targetLanguage as LanguageCode);
            if (_translateText.text) {
                block.data.text = _translateText.text;

                // Comprobamos si el bloque ya existe en el editor de ayuda
                const existingBlock = editorHelpValue?.blocks.getById(block.id);
                if (existingBlock) {
                    // Si existe, lo actualizamos con la nueva traducción
                    editorHelpValue?.blocks.update(block.id, block.data);
                } else {
                    // Si no existe, lo insertamos.
                    // Los parámetros de insert son: (type, data, config, index, needToFocus, replace, id)
                    editorHelpValue?.blocks.insert(block.tool, block.data, undefined, index, false, false, block.id);
                }
            }
        }
    }


    return (
        <>
            <div className="relative w-full h-fit flex items-center border-b border-base-300/40 py-2 px-10 ">
                <button className="btn btn-xs" onClick={() => setTabHelp(!tabHelp)}>{tabHelp ? t('editor.subtab.hidden_tab') : t('editor.subtab.new_tab')}
                    {
                        tabHelp ? <BiPlus className="text-lg rotate-45 transition-all" /> : <BiPlus className="text-lg" />
                    }
                </button>
                {
                    tabHelp && <div className='ml-auto flex flex-col min-w-6/12'>
                        <div className='flex'>
                            <div className='tooltip tooltip-info' data-tip={t('editor.subtab.translate.tooltip')}>
                                <SelectLanguage
                                    value={args?.targetLanguage as LanguageCode}
                                    onChange={(code) => {
                                        handleToolTranslate(code)
                                    }}
                                />
                                {
                                    args?.targetLanguage && <button className="btn btn-xs btn-circle mx-2" onClick={() => handleToolTranslate(args.targetLanguage as LanguageCode)}><AiOutlineReload /></button>
                                }
                                <span className='text-xs ml-4'>In writing?: </span>
                                <button
                                    onClick={() => handleControlModeTranslate()}
                                    className={clsx(
                                        'btn btn-xs',
                                        args?.mode === 'in-write' ? 'btn-success' : 'btn-error'
                                    )}>
                                    {args?.mode === 'in-write' ? 'On' : 'Off'}
                                </button>
                            </div>
                        </div>
                        <div className='text-xs opacity-50 flex items-center w-full gap-2'>
                            <span className='w-5/12 border-b border-base-300 h-px' />
                            Toolbar
                            <span className='w-5/12 border-b border-base-300 h-px' />
                        </div>
                    </div>
                }

                <div className={clsx(
                    'absolute -bottom-1 left-0 w-full transition-all duration-300',
                    !loadingTranslate && 'opacity-0'
                )}>
                    <progress className="progress w-full progress-primary h-1"></progress>
                </div>
            </div>
        </>
    )
}