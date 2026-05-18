'use server';

import { TablesInsert, TablesUpdate } from "@/supabase/database.types";
import { createClient } from "@/supabase/server";
import { cache } from "react";

type args = {
    body: TablesInsert<'docs'> | TablesUpdate<'docs'>;
}

const selectDocument = `
    auth_id,
    cover_url,
    created_at,
    id,
    status,
    synopsis,
    title,
    updated_at,
    chapters: chapters(
        auth_id,
        content,
        created_at,
        doc_id,
        id,
        order_index,
        status,
        title,
        updated_at
    )
`

export const upsertDocument = async ({ body }: args) => {
    const client = await createClient();
    if (!body.id) {
        const { error, data } = await client.from('docs').insert({
            auth_id: body.auth_id!,
            title: body.title!,
            status: body.status,
            synopsis: body.synopsis,
            cover_url: body.cover_url,
            updated_at: body.updated_at,
        }).select(selectDocument).maybeSingle();
        return { error, data }
    }

    const { error, data } = await client.from('docs').update({
        title: body.title!,
        status: body.status,
        synopsis: body.synopsis,
        cover_url: body.cover_url,
        updated_at: body.updated_at,
    }).eq('id', body.id!).select(selectDocument).maybeSingle();

    return { error, data }
};

export type UpsertDocumentReturn = NonNullable<Awaited<ReturnType<typeof upsertDocument>>>['data'];

export const getMyDocuments = cache(async () => {
    const client = await createClient();
    const { data: { user } } = await client.auth.getUser();
    if (!user) return { data: null, error: 'Not authenticated' };

    const { data, error } = await client.from('docs')
        .select(selectDocument)
        .eq('auth_id', user.id)
        .order('updated_at', { ascending: false });

    return { data, error };
})

export type GetMyDocumentsReturn = NonNullable<Awaited<ReturnType<typeof getMyDocuments>>['data']>;




export const getDocumentById = cache(async ({ id }: { id: string }) => {
    const client = await createClient();
    const { data, error } = await client.from('docs').select(selectDocument).eq('id', id).maybeSingle();
    return { data, error };
}
)

type argsChapters = {
    body: TablesInsert<'chapters'> | TablesUpdate<'chapters'>;
}

export const upsertChapter = async ({ body }: argsChapters) => {
    const client = await createClient();
    if (!body.id) {
        const { error, data } = await client.from('chapters').insert({
            doc_id: body.doc_id!,
            title: body.title!,
            content: body.content,
            status: body.status,
            updated_at: body.updated_at,
            auth_id: body.auth_id!,
            order_index: body.order_index,
        }).select('*').maybeSingle();

        return { error, data }
    }

    const { error, data } = await client.from('chapters').update({
        title: body.title!,
        content: body.content,
        status: body.status,
        updated_at: body.updated_at,
        order_index: body.order_index,
    }).eq('id', body.id!).select('*').maybeSingle();

    return { error, data }
}

export type UpsertChapterReturn = NonNullable<Awaited<ReturnType<typeof upsertChapter>>['data']>;


const selectChapters = `
    auth_id,
    created_at,
    doc_id,
    id,
    order_index,
    status,
    title,
    updated_at
`

export const getChaptersByDocumentId = cache(async ({ doc_id }: { doc_id: string }) => {
    const client = await createClient();
    const { data, error } = await client.from('chapters').select(selectChapters).eq('doc_id', doc_id).order('order_index', { ascending: true });
    return { data, error };
}
)

export type GetChaptersByDocumentIdReturn = Awaited<ReturnType<typeof getChaptersByDocumentId>>;

export const getChapterById = async ({ id }: { id: string }) => {
    const client = await createClient();
    const { data, error } = await client.from('chapters').select('*').eq('id', id).maybeSingle();
    return { data, error };
}