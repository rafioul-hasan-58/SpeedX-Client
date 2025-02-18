import defPic from '../../assets/Images/default.jpg'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { useGetMyProfileQuery, useUpdateProfileMutation } from "../../redux/features/admin/userManagement.Api";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { toast } from 'sonner';
import { useState } from 'react';

const MyProfile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) {
        user = verifyToken(token);
    }
    const { data: userData } = useGetMyProfileQuery(user?.email)
    const [updateUser] = useUpdateProfileMutation()
    const { register, handleSubmit, } = useForm()
    const handleChange: SubmitHandler<FieldValues> = async (data) => {
        const image = data.image[0]

        const updateData = {
            name: data.name,
            email: data.email
        }
        const formData = new FormData();
        formData.append('data', JSON.stringify(updateData));
        formData.append('file', image)
        console.log(formData);
        const finalData = {
            id: userData?.data?._id,
            data: formData
        }
        const res = await updateUser(finalData)
        if (res.data.success) {
            toast.success('Profile Updated Successfully')
            setIsOpen(false)
        }
    }
    return (
        <div className='flex justify-center lg:mt-20'>
            <div className="border-2 border-sky-500 rounded-sm w-[400px] h-[400px]">
                <div className='flex justify-center'>
                    <img className=' w-[150px] h-[150px] mt-5 rounded-full border-red-300' src={userData?.data?.image || defPic} alt="" />
                </div>
                <div className='text-center mt-10 text-gray-600'>
                    <p className='  text-2xl font-semibold'>{userData?.data?.name}</p>
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
                                            defaultValue={userData?.data?.name}
                                            {...register('name')}
                                            name='name'
                                            type="text"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className="mb-4 flex ">
                                        <p className="text-left mt-1 w-[65px]">Image</p>
                                        <input
                                            className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none focus:outline-none focus:border-black bg-white"
                                            {...register('image')}
                                            name='image'
                                            type="file"
                                            placeholder="Image"
                                        />
                                    </div>

                                    <div className="mb-4 flex ">
                                        <p className="text-left mt-1 w-[65px]">Email</p>
                                        <input
                                            className=" w-[300px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-gray-300  appearance-none focus:outline-none focus:border-black bg-white"
                                            defaultValue={userData?.data?.email}
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