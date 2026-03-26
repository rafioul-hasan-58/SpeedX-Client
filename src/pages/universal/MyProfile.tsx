import defPic from '../../assets/Images/default.jpg'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { toast } from 'sonner';
import { useState } from 'react';
import { useGetMyProfileQuery, useUpdateProfileMutation } from '@/lib/api/userApi';
interface IUpdateData {
    fullName: string;
    email: string;
}
const MyProfile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: userData } = useGetMyProfileQuery()
    const [updateUser] = useUpdateProfileMutation()
    const { register, handleSubmit, } = useForm()
    const handleChange: SubmitHandler<FieldValues> = async (data) => {
        if (!userData?.data?._id) return;
        const updateData: IUpdateData = {
            fullName: data.fullName,
            email: data.email
        }
        const finalData = {
            id: userData?.data?._id,
            data: updateData
        }
        const res = await updateUser(finalData)
        if (res?.data?.success) {
            toast.success('Profile Updated Successfully')
            setIsOpen(false)
        }
    }
    return (
        <div className='flex justify-center lg:mt-20'>
            <div className="border-2 border-sky-500 rounded-sm w-[400px] h-[400px]">
                <div className='flex justify-center'>
                    <img className=' w-[150px] h-[150px] mt-5 rounded-full border-red-300' src={userData?.data?.profileImage || defPic} alt="" />
                </div>
                <div className='text-center mt-10 text-gray-600'>
                    <p className='  text-2xl font-semibold'>{userData?.data?.fullName}</p>
                    <p className=' text-xl '> <span className=' text-xl text-black italic'>{userData?.data?.email}</span></p>
                    <p className=' text-xl mt-2 font-bold text-sky-500'>Admin</p>
                </div>
                <div className='flex justify-center mt-5'>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button style={{ backgroundColor: '#0EA5E9', color: 'white' }} variant="outline">Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <form onSubmit={handleSubmit(handleChange)}>
                                    <div className="mb-4 flex ">
                                        <p className="text-left w-[65px] mt-1">Name</p>
                                        <input
                                            className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none focus:outline-none focus:border-black bg-white"
                                            defaultValue={userData?.data?.fullName}
                                            {...register('fullName')}
                                            name='fullName'
                                            type="text"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div className="mb-4 flex ">
                                        <p className="text-left mt-1 w-[65px]">Image</p>
                                        <input
                                            className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none 
                                            focus:outline-none focus:border-black bg-white"
                                            {...register('profileImage')}
                                            defaultValue={userData?.data?.profileImage}
                                            name="profileImage"
                                            type="url"
                                            placeholder="Profile Image"
                                        />
                                    </div>

                                    <div className="mb-4 flex ">
                                        <p className="text-left mt-1 w-[65px]">Email</p>
                                        <input
                                            className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none focus:outline-none focus:border-black bg-white"
                                            defaultValue={userData?.data?.email}
                                            disabled
                                            {...register('email')}
                                            name='email'
                                            type="text"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <DialogFooter>
                                        <Button style={{ backgroundColor: '#0EA5E9', color: 'white' }} type="submit">Save changes</Button>
                                    </DialogFooter>
                                </form>
                            </div>

                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;