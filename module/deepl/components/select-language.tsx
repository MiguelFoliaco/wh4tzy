import { useEditorState } from '@/module/editor/context/use-editor-state'
import clsx from 'clsx'
import { Language } from 'deepl-node'
import { useEffect, useMemo, useState } from 'react'
import { FaLanguage } from 'react-icons/fa'

type props = {
    value?: Language['code']
    onChange?: (language: Language['code']) => void
    className?: string
}
export const SelectLanguage = ({ value, onChange }: props) => {
    const [value_, setValue_] = useState<Language['code'] | undefined>(value)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setValue_(value)
    }, [value])

    const _onChange = (language: Language['code']) => {
        setIsOpen(false)
        setValue_(language)
        onChange?.(language)
    }

    const nameByCode = useMemo(() => {
        return languages.find(e => e.code === value_)?.name
    }, [value_])

    return (
        <div className='join'>
            <button onClick={() => setIsOpen(!isOpen)} className={
                clsx(
                    'btn btn-xs join-item  btn-primary',
                    !value && 'btn-outline'
                )
            }> {!isOpen && `Translate to: ${nameByCode ?? ''}`}<FaLanguage size={16} /></button>
            {
                isOpen &&
                <select value={value_} onChange={(e) => _onChange(e.target.value as Language['code'])}
                    className={
                        clsx(
                            'select select-primary select-xs join-item',
                        )
                    }
                >
                    {
                        languages.map(e => (
                            <option key={e.code} value={e.code}>
                                {e.name}
                            </option>
                        ))
                    }
                </select>
            }
        </div>
    )
}


type LanguageOption = {
    code: Language['code'];
    name: string;
};

export const languages: LanguageOption[] = [
    { code: 'ace', name: 'Acehnese' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'an', name: 'Aragonese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'as', name: 'Assamese' },
    { code: 'ay', name: 'Aymara' },
    { code: 'az', name: 'Azerbaijani' },
    { code: 'ba', name: 'Bashkir' },
    { code: 'be', name: 'Belarusian' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'bho', name: 'Bhojpuri' },
    { code: 'bn', name: 'Bengali' },
    { code: 'br', name: 'Breton' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'ca', name: 'Catalan' },
    { code: 'ceb', name: 'Cebuano' },
    { code: 'ckb', name: 'Central Kurdish' },
    { code: 'cs', name: 'Czech' },
    { code: 'cy', name: 'Welsh' },
    { code: 'da', name: 'Danish' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'es', name: 'Spanish' },
    { code: 'et', name: 'Estonian' },
    { code: 'eu', name: 'Basque' },
    { code: 'fa', name: 'Persian' },
    { code: 'fi', name: 'Finnish' },
    { code: 'fr', name: 'French' },
    { code: 'ga', name: 'Irish' },
    { code: 'gl', name: 'Galician' },
    { code: 'gn', name: 'Guarani' },
    { code: 'gom', name: 'Goan Konkani' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'ha', name: 'Hausa' },
    { code: 'he', name: 'Hebrew' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hr', name: 'Croatian' },
    { code: 'ht', name: 'Haitian Creole' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'hy', name: 'Armenian' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ig', name: 'Igbo' },
    { code: 'is', name: 'Icelandic' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'jv', name: 'Javanese' },
    { code: 'ka', name: 'Georgian' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'kmr', name: 'Northern Kurdish' },
    { code: 'ko', name: 'Korean' },
    { code: 'ky', name: 'Kyrgyz' },
    { code: 'la', name: 'Latin' },
    { code: 'lb', name: 'Luxembourgish' },
    { code: 'lmo', name: 'Lombard' },
    { code: 'ln', name: 'Lingala' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'lv', name: 'Latvian' },
    { code: 'mai', name: 'Maithili' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'mi', name: 'Maori' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'mn', name: 'Mongolian' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ms', name: 'Malay' },
    { code: 'mt', name: 'Maltese' },
    { code: 'my', name: 'Myanmar (Burmese)' },
    { code: 'nb', name: 'Norwegian Bokmål' },
    { code: 'ne', name: 'Nepali' },
    { code: 'nl', name: 'Dutch' },
    { code: 'oc', name: 'Occitan' },
    { code: 'om', name: 'Oromo' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'pag', name: 'Pangasinan' },
    { code: 'pam', name: 'Pampanga' },
    { code: 'pl', name: 'Polish' },
    { code: 'prs', name: 'Dari' },
    { code: 'ps', name: 'Pashto' },
    { code: 'qu', name: 'Quechua' },
    { code: 'ro', name: 'Romanian' },
    { code: 'ru', name: 'Russian' },
    { code: 'sa', name: 'Sanskrit' },
    { code: 'scn', name: 'Sicilian' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'sq', name: 'Albanian' },
    { code: 'sr', name: 'Serbian' },
    { code: 'st', name: 'Sesotho' },
    { code: 'su', name: 'Sundanese' },
    { code: 'sv', name: 'Swedish' },
    { code: 'sw', name: 'Swahili' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'tg', name: 'Tajik' },
    { code: 'th', name: 'Thai' },
    { code: 'tk', name: 'Turkmen' },
    { code: 'tl', name: 'Tagalog' },
    { code: 'tn', name: 'Tswana' },
    { code: 'tr', name: 'Turkish' },
    { code: 'ts', name: 'Tsonga' },
    { code: 'tt', name: 'Tatar' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ur', name: 'Urdu' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'wo', name: 'Wolof' },
    { code: 'xh', name: 'Xhosa' },
    { code: 'yi', name: 'Yiddish' },
    { code: 'yue', name: 'Cantonese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'zu', name: 'Zulu' },

    // Extras
    { code: 'en', name: 'English' },
    { code: 'en-GB', name: 'English (British)' },
    { code: 'en-US', name: 'English (American)' },
    { code: 'es-419', name: 'Spanish (Latin America)' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'pt-PT', name: 'Portuguese (Portugal)' },
    { code: 'zh-HANS', name: 'Chinese (Simplified)' },
    { code: 'zh-HANT', name: 'Chinese (Traditional)' },
];