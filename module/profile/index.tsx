'use client';

import { useState, useEffect } from 'react';
import { useUser } from '../auth/context/useUser'
import { logout } from '../auth/actions/session';
import { updateProfile } from './actions/updateProfile';
import { useRouter } from 'next/navigation';
import { useToast } from '@/module/common/hook/useToast';

export const ProfilePage = () => {
    const { user, exit: _exit, updateUser } = useUser()
    const [loading, setLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const { showToast } = useToast()

    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
    })

    useEffect(() => {
        if (user?.user_metadata) {
            setFormData({
                full_name: user.user_metadata.full_name || '',
                username: user.user_metadata.username || '',
            })
        }
    }, [user])

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const result = await updateProfile({
                full_name: formData.full_name,
                username: formData.username,
            })

            if (result.success && result.data) {
                updateUser(result.data)
                showToast('Perfil actualizado correctamente', 'success')
                setIsEditing(false)
            } else {
                showToast(result.error || 'Error al actualizar el perfil', 'error')
            }
        } catch (error) {
            showToast('Error al actualizar el perfil', 'error')
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    const exit = async () => {
        setLoading(true)
        await logout()
        _exit()
        setLoading(false)
        router.push('/')
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-base-content/60">No user is logged in.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-semibold text-base-content">Profile Settings</h1>
                        <p className="text-sm text-base-content/60 mt-1">Manage your account information</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn btn-sm btn-ghost gap-2"
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>

                {/* Profile Card */}
                <div className="bg-base-100 border border-base-300/30 rounded-lg p-8 space-y-8">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-base-100 font-bold text-2xl">
                            {formData.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-base-content">
                                {formData.full_name || 'User'}
                            </h2>
                            <p className="text-sm text-base-content/60">{user.email}</p>
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
                                value={user.email || ''}
                                disabled
                                className="w-full px-4 py-3 bg-base-200/30 border border-base-300/30 rounded-lg text-base-content/60 text-sm"
                            />
                            <p className="text-xs text-base-content/50 mt-1">Your email cannot be changed</p>
                        </div>

                        {/* Full Name Field */}
                        <div>
                            <label className="text-sm font-semibold text-base-content/80 block mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.full_name}
                                onChange={(e) => handleInputChange('full_name', e.target.value)}
                                disabled={!isEditing}
                                placeholder="Enter your full name"
                                className={`w-full px-4 py-3 border rounded-lg text-sm transition-colors ${
                                    isEditing
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
                                value={formData.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                disabled={!isEditing}
                                placeholder="Enter your username"
                                className={`w-full px-4 py-3 border rounded-lg text-sm transition-colors ${
                                    isEditing
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
                                value={user.id || ''}
                                disabled
                                className="w-full px-4 py-3 bg-base-200/30 border border-base-300/30 rounded-lg text-base-content/60 text-sm font-mono text-xs"
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
                                value={new Date(user.created_at || '').toLocaleDateString('en-US', {
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
            </div>
        </div>
    )
}
