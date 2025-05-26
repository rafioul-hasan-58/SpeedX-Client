import { TUser } from "@/types/auth.types";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useImageUploader from "./useImageUploader";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@/redux/features/admin/userManagement.Api";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import BFormInput from "@/components/form/Input/BFormInput";
import { Label } from "@/components/ui/label";
import BImageUploader from "./BImageUploader";
import { LuLoaderCircle } from "react-icons/lu";

const UpdateProfile = (myProfile: TUser) => {
    const form = useForm({
        defaultValues: {
            name: myProfile?.name,
        }
    });
    const { handleSubmit } = form;
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const { uploadImagesToCloudinary,isUploading } = useImageUploader();
    const [updateUser, { isLoading }] = useUpdateProfileMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const image = await uploadImagesToCloudinary(imageFiles);
        const { name } = data;
        const userData = {
            name,
            image: image || myProfile?.image,
        };
        const userUpdateData = {
            id: myProfile?._id,
            data: userData
        }
        try {
            const { data } = await updateUser(userUpdateData);
            if (data?.success) {
                toast.success("Profile updated successfully");
                setImageFiles([]);
                window.location.reload();
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Error happened while updating your profile")
        }

    }
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="bg-sky-500 cursor-pointer mb-5">Edit Profile</Button>
                </PopoverTrigger>
                <PopoverContent className="relative right-[300px] bottom-[50px]">
                    <h1 className="text-center text-xl font-semibold">Update your Profile</h1>
                    <Form {...form}>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <BFormInput
                                name="name"
                                label="Your Name"
                                placeholder="Enter your name"
                                control={form.control}
                                className="rounded-none border-sky-500"
                            />
                            <Label>Your Image <span className="text-xl text-sky-500 relative right-0.5">*</span></Label>
                            <BImageUploader
                                setImageFiles={setImageFiles}
                                imageFiles={imageFiles}
                            />
                            <Button className="mt-2 w-full rounded-none bg-sky-500 cursor-pointer">
                                {
                                    isLoading || isUploading? <div className="flex items-center gap-1"><p>Updating</p> <LuLoaderCircle className="animate-spin mt-1.5" /></div> :<p>Update</p>
                                }
                            </Button>
                        </form>
                    </Form>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default UpdateProfile;