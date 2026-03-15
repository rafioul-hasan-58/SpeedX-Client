'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';

const SecurityPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters');
            return;
        }

        setLoading(true);
        try {
            // Simulate API call - replace with actual password change endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSuccess('Password changed successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Failed to change password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-xl font-semibold text-gray-900">Security</h1>
                        <p className="text-gray-600 text-sm mt-1">Customize your security credentials</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Current Password */}
                        <FieldGroup>
                            <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
                            <Input
                                id="current-password"
                                type="password"
                                value={currentPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCurrentPassword(e.target.value)
                                }
                                placeholder="••••••••••"
                                className="mt-1"
                            />
                        </FieldGroup>

                        {/* New Password */}
                        <FieldGroup>
                            <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                            <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNewPassword(e.target.value)
                                }
                                placeholder="••••••••••"
                                className="mt-1"
                            />
                        </FieldGroup>

                        {/* Confirm New Password */}
                        <FieldGroup>
                            <FieldLabel htmlFor="confirm-password">Confirm New Password</FieldLabel>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="••••••••••"
                                className="mt-1"
                            />
                        </FieldGroup>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-sm text-green-700">{success}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-end pt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-sky-400 hover:bg-sky-500 text-white px-6"
                            >
                                {loading ? 'Saving...' : 'Save Preferences'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SecurityPage
