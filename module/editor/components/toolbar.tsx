
import { useTranslate } from '@/module/common/hook/useTranslate'
import { SelectLanguage } from '@/module/deepl/components/select-language'
import { BiPlus } from 'react-icons/bi'
import { FaLanguage } from 'react-icons/fa'

export const Toolbar = ({ tabHelp, setTabHelp }: { tabHelp: boolean, setTabHelp: (tabHelp: boolean) => void }) => {

    const { t } = useTranslate()

    return (
        <>
            <div className="w-full h-fit flex items-center border-b border-base-300/40 py-2 px-10 ">
                <button className="btn btn-xs" onClick={() => setTabHelp(!tabHelp)}>{tabHelp ? t('editor.subtab.hidden_tab') : t('editor.subtab.new_tab')}
                    {
                        tabHelp ? <BiPlus className="text-lg rotate-45 transition-all" /> : <BiPlus className="text-lg" />
                    }
                </button>
                {
                    tabHelp && <div className='ml-auto flex flex-col min-w-6/12'>
                        <div className='flex'>
                            <div className='tooltip tooltip-info' data-tip={t('editor.subtab.translate.tooltip')}>
                                <SelectLanguage />
                            </div>
                        </div>
                        <div className='text-xs opacity-50 flex items-center w-full gap-2'>
                            <span className='w-5/12 border-b border-base-300 h-px' />
                            Toolbar
                            <span className='w-5/12 border-b border-base-300 h-px' />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}