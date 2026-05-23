import { ProfilePage } from "@/module/profile"
import { createClient } from "@/supabase/server"

export default async function Profile() {
    const client = await createClient()
    const session = await client.auth.getUser()

    if (!session.data.user) {
        return <div>Login</div>
    }

    const { data: profile } = await client
        .from('users')
        .select('*')
        .eq('auth_id', session.data.user.id)
        .maybeSingle()

    return <ProfilePage authUser={session.data.user} profile={profile} />
}
