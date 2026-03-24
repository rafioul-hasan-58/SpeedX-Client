import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Camera } from 'lucide-react'
import { useGetMyProfileQuery, useUpdateProfileMutation } from '@/redux/features/user/userRelatedApi'
import SecurityPage from '@/components/common/Security'
import { useEffect, useRef, useState } from 'react'

const Settings = () => {

    const { data } = useGetMyProfileQuery();

    const myProfile = data?.data;

    const [fullName, setFullName] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    useEffect(() => {
        if (myProfile) {
            setFullName(myProfile.fullName || '');
            setLocation(myProfile.location || '');
            setBio(myProfile.bio || '');
            if (myProfile.profileImage) {
                setPreview(myProfile.profileImage);
            }
        }
    }, [myProfile]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const handleCameraClick = () => fileInputRef.current?.click();

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("bodyData", JSON.stringify({ fullName, location, bio }));
        if (selectedFile) {
            formData.append("profileImage", selectedFile);
        }
        const { data } = await updateProfile(formData);
        console.log("res", data);
    };

    return (
        <div className="w-full">
            <div className="px-6 max-w-7xl mx-auto">
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold">My Settings | Customer</h2>
                    <p className="text-lg text-gray-500">Manage your profile from here.</p>
                </div>
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Information</h2>
                    <p className="text-gray-600 text-sm mb-6">Update your personal information</p>

                    <div className="flex gap-8">
                        {/* Avatar */}
                        <div className="flex flex-col items-center gap-2 flex-shrink-0">
                            <div className="relative">
                                <Avatar className="w-24 h-24 border-2 border-sky-400">
                                    <AvatarImage
                                        src={preview || myProfile?.profileImage || "https://i.ibb.co.com/hFPk2s03/download.jpg"}
                                        alt={myProfile?.fullName}
                                    />
                                    <AvatarFallback className="bg-gray-200">
                                        {myProfile?.fullName?.split(' ').map((n: string) => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <button
                                    type="button"
                                    onClick={handleCameraClick}
                                    className="absolute bottom-0 right-0 bg-gray-700 rounded-full p-1.5 hover:bg-gray-800 transition-colors"
                                >
                                    <Camera className="w-4 h-4 text-white" />
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="bg-white border border-gray-300 focus-visible:ring-sky-400"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    disabled
                                    value={myProfile?.email || ''}
                                    className="bg-white border border-gray-400 "
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="location" className="text-gray-700 font-medium">Location</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="bg-white border border-gray-300 focus-visible:ring-sky-400"
                                    placeholder="Enter your location"
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="bio" className="text-gray-700 font-medium">Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="bg-white border border-gray-300 resize-none focus-visible:ring-sky-400"
                                    placeholder="Tell us about yourself"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-2"
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </Card>

                <Card className='mt-6'>
                    <SecurityPage />
                </Card>
            </div>
        </div>
    );
};

export default Settings;