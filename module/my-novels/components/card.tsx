import { useToast } from '@/module/common/hook/useToast'
import { useTranslate } from '@/module/common/hook/useTranslate'
import { deleteDocument, GetMyDocumentsReturn } from '@/module/editor/services'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiBook, BiNavigation, BiTrash } from 'react-icons/bi'

type props = {
    novel: GetMyDocumentsReturn[number]
}
export const CardNovel = ({ novel }: props) => {
    const { t } = useTranslate()
    const router = useRouter()
    const { openToast } = useToast()
    const [loadingDelete, setLoadingDelete] = useState(false)

    const redirect = () => {
        router.push(`/editor?id=${novel.id}&tab=write`)
    }

    const onDeleteConfirm = () => {
        const check = confirm(t('myNovels.delete.confirm', { title: novel.title }))
        if (check) {
            setLoadingDelete(true)
            deleteDocument({ id: novel.id }).then((res) => {
                if (res.error) {
                    openToast("Something went wrong", "error")
                } else {
                    openToast("Deleted", "success")
                    router.refresh()
                }
            })
                .finally(() => {
                    setLoadingDelete(false)
                })
        }
    }

    return (
        <div key={novel.id} className="card bg-base-100 select-none hover:bg-base-200 active:scale-95 transition-all shadow-sm ring-1 ring-base-300 hover:shadow-md cursor-pointer">
            <div className='card-actions p-2 flex justify-between'>
                <button disabled={loadingDelete} onClick={onDeleteConfirm} className='btn btn-error btn-outline btn-xs'>
                    {
                        loadingDelete ?
                            <span className='loading loading-infinity' />
                            :
                            <>
                                <BiTrash size={16} />
                                {t('card.delete')}
                            </>
                    }
                </button>
                <button onClick={redirect} className='btn btn-neutral btn-outline btn-xs'>
                    <BiNavigation size={16} />
                    {t('card.open-on-editor')}
                </button>
            </div>
            <div className="card-body p-6">
                <h2 className="card-title text-xl mb-1">{novel.title || t('myNovels.untitled')}</h2>
                <p className="text-sm text-base-content/60 line-clamp-3 min-h-16">
                    {novel.synopsis || t('myNovels.noSynopsis')}
                </p>

                <div className="mt-4 pt-4 border-t border-base-300/50 flex justify-between items-center">
                    <div className="text-xs text-base-content/50">
                        {t('myNovels.updated')} {new Date(novel.updated_at || novel.created_at || '').toLocaleDateString()}
                    </div>
                    <div className="badge badge-primary badge-outline text-xs capitalize">
                        {novel.status === 'draft' ? t('myNovels.draft') : novel.status}
                    </div>
                </div>
            </div>
        </div>
    )
}
