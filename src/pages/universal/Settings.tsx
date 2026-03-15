
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Camera } from 'lucide-react'
import { useAppSelector } from '@/redux/hooks'
import { selectCurrentToken } from '@/redux/features/auth/authSlice'
import { verifyToken } from '@/utils/verifyToken'
import { useGetMyProfileQuery } from '@/redux/features/user/userReletedApi'
import SecurityPage from '@/components/common/Security'

const Settings = () => {

    const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token);
    }
    const { data: myProfile } = useGetMyProfileQuery(user?.email);

    return (
        <div className="w-full ">
            {/* Header Section */}
            {/* Main Content */}
            <div className="px-6  max-w-7xl mx-auto">
                <div className="mb-4 ">
                    <h2 className="text-2xl font-semibold">My Settings | Customer</h2>
                    <p className="text-lg text-gray-500">Manage, your profile form here.</p>
                </div>
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Information</h2>
                    <p className="text-gray-600 text-sm mb-6">Update your personal information</p>

                    <div className="flex gap-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center gap-2 flex-shrink-0">
                            <div className="relative">
                                <Avatar className="w-24 h-24 border-2 border-sky-400">
                                    <AvatarImage src={myProfile?.data.name || "https://i.ibb.co.com/hFPk2s03/download.jpg"} alt={myProfile?.data.name} />
                                    <AvatarFallback className="bg-gray-200">
                                        {myProfile?.data?.name
                                            .split(' ')
                                            .map((n: any) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <button className="absolute bottom-0 right-0 bg-gray-700 rounded-full p-1.5 hover:bg-gray-800 transition-colors">
                                    <Camera className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-gray-700 font-medium">
                                    Full Name
                                </Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    value={myProfile?.data?.name || "Sourav Prodhan"}
                                    className="bg-white border border-gray-300"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Professional Title */}
                            <div className="space-y-2">
                                <Label htmlFor="professionalTitle" className="text-gray-700 font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="text"
                                    value={myProfile?.data?.email || "rafioulhasan2@gmail.com"}

                                    className="bg-white border border-gray-300"
                                    placeholder="Enter your professional email"
                                />
                            </div>

                            {/* Location */}
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="location" className="text-gray-700 font-medium">
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    type="text"

                                    className="bg-white border border-gray-300"
                                    placeholder="Enter your location"
                                />
                            </div>

                            {/* Bio */}
                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="bio" className="text-gray-700 font-medium">
                                    Bio
                                </Label>
                                <Textarea
                                    id="bio"

                                    className="bg-white border border-gray-300 resize-none"
                                    placeholder="Tell us about yourself"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                        <Button

                            className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-2"
                        >
                            Save
                        </Button>
                    </div>

                </Card>
                <Card className='mt-6'>
                    <SecurityPage />
                </Card>
            </div>
        </div>
    )
}
export default Settings