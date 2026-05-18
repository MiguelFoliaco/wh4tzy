import { ProfilePage } from "@/module/profile"
import { createClient } from "@/supabase/server"


export default async function ProfilePages() {

    const client = await createClient()
    const session = await client.auth.getUser()
    if (!session.data.user) return <div>Login</div>


    return <ProfilePage />
}
