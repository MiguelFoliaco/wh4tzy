import { ProfilePage } from "@/module/profile"
import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

export default async function ProfilePageRoute() {
    const client = await createClient()
    const session = await client.auth.getUser()

    if (!session.data.user) {
        redirect('/auth/login')
    }

    return <ProfilePage />
}
