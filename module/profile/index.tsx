'use client';

import { useState } from 'react';
import { logout } from '../auth/actions/session';
import { updateProfile, type UpdateProfileData } from './actions/update-profile';
import { useRouter } from 'next/navigation';
import { useToast } from '@/module/common/hook/useToast';
import { FormTokens } from '../auth/components/form-tokens';
import type { User } from '@supabase/supabase-js';
import { useUser } from '../auth/context/useUser';
import { BiPencil } from 'react-icons/bi';
import Link from 'next/link';

interface ProfilePageProps {
    authUser: User;
    profile: UpdateProfileData | null;
}

export const ProfilePage = ({ authUser, profile: initialProfile }: ProfilePageProps) => {
    const [loading, setLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const { user, userDB, updateUser } = useUser()
    const [profile, setProfile] = useState<UpdateProfileData | null>(initialProfile)
    const [formData, setFormData] = useState(initialProfile);
    const router = useRouter()
    const { openToast } = useToast()


    const handleInputChange = (field: keyof UpdateProfileData, value: string | number | boolean) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const result = await updateProfile({
                name: formData!.name!,
                username: formData!.username!,
                email: user?.email || '',
                lastname: formData!.lastname!,
                auth_id: user?.id || '',
                avatar_url: profile?.avatar_url || null,
                role: 'owner',
                phone_number: profile?.phone_number || null,
            })

            if (result.success && result.data?.user) {
                setProfile(result.userDB as unknown as UpdateProfileData)
                updateUser(result.data.user, result!.userDB!)
                openToast('Perfil actualizado correctamente', 'success')
                setIsEditing(false)
            } else {
                openToast(result.error || 'Error al actualizar el perfil', 'error')
            }
        } catch (error) {
            openToast('Error al actualizar el perfil', 'error')
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    const exit = async () => {
        setLoading(true)
        await logout()
        setLoading(false)
        router.push('/')
    }

    if (!authUser) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-base-content/60">No user is logged in.</p>
                </div>
            </div>
        )
    }

    const displayName = profile?.name || ''
    const displayEmail = profile?.email
    const displayId = profile?.id;
    const displayCreatedAt = profile?.created_at || authUser.created_at;

    return (
        <div className="min-h-screen bg-base-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href={'/'} className="link mb-2 block">Go back</Link>
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-base-content">Profile Settings</h1>
                        <p className="text-sm text-base-content/60 mt-1">Manage your account information</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn btn-sm btn-warning gap-2"
                    >
                        <BiPencil />
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-base-100 border border-base-300/30 rounded-lg p-8 space-y-8">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-base-100 font-bold text-2xl">
                            {displayName?.[0]?.toUpperCase() || displayEmail?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-base-content">
                                {displayName}
                            </h2>
                            <p className="text-sm text-base-content/60">{displayEmail}</p>
                        </div>
                    </div>

                    <div className="divider my-0"></div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        {/* Email Field - Read Only */}
                        <div>
                            <label className="text-sm font-semibold text-base-content/80 block mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={displayEmail}
                                disabled
                                className="w-full px-4 py-3 bg-base-200/30 border border-base-300/30 rounded-lg text-base-content/60 text-sm"
                            />
                            <p className="text-xs text-base-content/50 mt-1">Your email cannot be changed</p>
                        </div>

                        {/* Full Name Field */}
                        <div>
                            <label className="text-sm font-semibold text-base-content/80 block mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData?.name || ''}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                disabled={!isEditing}
                                placeholder="Enter your full name"
                                className={`w-full px-4 py-3 border rounded-lg text-sm transition-colors ${isEditing
                                    ? 'bg-base-100 border-base-300/50 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/30'
                                    : 'bg-base-200/30 border-base-300/30 text-base-content/60'
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-base-content/80 block mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={formData?.lastname || ''}
                                onChange={(e) => handleInputChange('lastname', e.target.value)}
                                disabled={!isEditing}
                                placeholder="Enter your last name"
                                className={`w-full px-4 py-3 border rounded-lg text-sm transition-colors ${isEditing
                                    ? 'bg-base-100 border-base-300/50 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/30'
                                    : 'bg-base-200/30 border-base-300/30 text-base-content/60'
                                    }`}
                            />
                        </div>

                        {/* Username Field */}
                        <div>
                            <label className="text-sm font-semibold text-base-content/80 block mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={formData?.username || ''}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                disabled={!isEditing}
                                placeholder="Enter your username"
                                className={`w-full px-4 py-3 border rounded-lg text-sm transition-colors ${isEditing
                                    ? 'bg-base-100 border-base-300/50 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/30'
                                    : 'bg-base-200/30 border-base-300/30 text-base-content/60'
                                    }`}
                            />
                        </div>

                        {/* User ID Field - Read Only */}
                        <div>
                            <label className="text-sm font-semibold text-base-content/80 block mb-2">
                                User ID
                            </label>
                            <input
                                type="text"
                                value={displayId}
                                disabled
                                className="w-full px-4 py-3 bg-base-200/30 border border-base-300/30 rounded-lg text-base-content/60 text-sm font-mono"
                            />
                            <p className="text-xs text-base-content/50 mt-1">Your unique identifier</p>
                        </div>

                        {/* Account Created Date */}
                        <div>
                            <label className="text-sm font-semibold text-base-content/80 block mb-2">
                                Account Created
                            </label>
                            <input
                                type="text"
                                value={new Date(displayCreatedAt || '').toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                disabled
                                className="w-full px-4 py-3 bg-base-200/30 border border-base-300/30 rounded-lg text-base-content/60 text-sm"
                            />
                        </div>
                    </div>

                    <div className="divider my-0"></div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4">
                        {isEditing && (
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="btn btn-primary btn-sm gap-2"
                            >
                                {isSaving && <span className="loading loading-spinner loading-xs"></span>}
                                Save Changes
                            </button>
                        )}
                        <button
                            onClick={exit}
                            disabled={loading}
                            className="btn btn-outline btn-sm gap-2"
                        >
                            {loading && <span className="loading loading-spinner loading-xs"></span>}
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 p-6 bg-base-200/20 border border-base-300/20 rounded-lg">
                    <h3 className="font-semibold text-sm text-base-content mb-3">Account Status</h3>
                    <div className="space-y-2 text-sm text-base-content/70">
                        <div className="flex items-center justify-between">
                            <span>Email Verified</span>
                            <span className="badge badge-sm badge-success">Verified</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Account Status</span>
                            <span className="badge badge-sm badge-info">Active</span>
                        </div>
                    </div>
                </div>


                {
                    userDB && (

                        <div className='bg-base-100 border border-base-300/30 rounded-lg p-8 space-y-8'>
                            <FormTokens />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
