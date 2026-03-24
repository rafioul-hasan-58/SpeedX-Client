
import { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { Eye, EyeOff } from 'lucide-react';
import { useChangePasswordMutation } from '@/redux/features/auth/authApi';
// ✅ Reusable password input wrapper
const PasswordInput = ({
    id, value, onChange, show, onToggle, placeholder
}: {
    id: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    show: boolean;
    onToggle: () => void;
    placeholder?: string;
}) => (
    <div className="relative mt-1">
        <Input
            id={id}
            type={show ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            placeholder={placeholder || '••••••••••'}
            className="pr-10 focus-visible:ring-sky-400"
        />
        <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
            {show ? <EyeOff className="w-4 h-4 text-sky-400" /> : <Eye className="w-4 h-4 text-sky-400" />}
        </button>
    </div>
);

const SecurityPage = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');
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
                    <div className="mb-8">
                        <h1 className="text-xl font-semibold text-gray-900">Security</h1>
                        <p className="text-gray-600 text-sm mt-1">Customize your security credentials</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FieldGroup>
                            <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
                            <PasswordInput
                                id="current-password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                show={showCurrent}
                                onToggle={() => setShowCurrent(!showCurrent)}
                            />
                        </FieldGroup>

                        <FieldGroup>
                            <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                            <PasswordInput
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                show={showNew}
                                onToggle={() => setShowNew(!showNew)}
                            />
                        </FieldGroup>

                        <FieldGroup>
                            <FieldLabel htmlFor="confirm-password">Confirm New Password</FieldLabel>
                            <PasswordInput
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                show={showConfirm}
                                onToggle={() => setShowConfirm(!showConfirm)}
                            />
                        </FieldGroup>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                                <p className="text-sm text-green-700">{success}</p>
                            </div>
                        )}

                        <div className="flex justify-end pt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-sky-400 hover:bg-sky-500 text-white px-6"
                            >
                                {loading ? 'Changing...' : 'Change Password'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SecurityPage;