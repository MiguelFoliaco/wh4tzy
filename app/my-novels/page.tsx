import React from 'react'
import { getMyDocuments } from '@/module/editor/services'
import { MyNovelsClient } from '@/module/my-novels'

export default async function MyNovelsPage() {
    const { data: novels, error } = await getMyDocuments()

    return <MyNovelsClient novels={novels} error={error} />
}
