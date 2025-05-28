import { Button } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useGetProductDetailsQuery, useUpdateProductMutation } from "../../redux/features/admin/productManagement.Api";
import toast from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";
import { Form } from "../../components/ui/form";
import BFormInput from "../../components/form/Input/BFormInput";
import BFormSelect from "../../components/form/Input/BFormSelect";
import { colorOptions } from "../../constant/ProductConstant";
import BFormTextarea from "../../components/form/Input/BFormTextarea";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from "../../components/ui/card";
import BFormImageUpload from "../../components/form/Input/BFormImageUploader";
import { useEffect, useState } from "react";
import useImageUploader from "@/utils/useImageUploader";
import { useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

const UpdateProduct = () => {
    const { id } = useParams();
    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const { data: productData } = useGetProductDetailsQuery(id);
    const previousData = productData?.data;
    const { uploadImagesToCloudinary, isUploading } = useImageUploader();
    const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
    const [ImageUrls, setImageUrls] = useState<File | File[]>([]);
    const form = useForm({
        defaultValues: {
            name: previousData?.name ?? "",
            brandName: previousData?.brandName ?? "",
            color: previousData?.color ?? "",
            price: previousData?.price ?? "",
            stocks: previousData?.stocks ?? "",
            description: previousData?.description ?? ""
        }
    });
    const { control, handleSubmit, reset } = form;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const images = await uploadImagesToCloudinary(ImageUrls, true);
        const productData = {
            ...data,
            price: Number(data.price),
            stocks: Number(data.stocks),
            images
        };
        const updatedData = {
            id: previousData._id,
            data: productData
        }
        try {
            const res = await updateProduct(updatedData);
            if (res?.data?.success) {
                window.location.href = '/admin/all-product'
                toast.success("Product updated successfully");
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (previousData) {
            reset({
                name: previousData.name || "",
                brandName: previousData.brandName || "",
                color: previousData.color || "",
                price: previousData.price || "",
                stocks: previousData.stocks || "",
                description: previousData.description || ""
            });
        }
    }, [previousData, reset]);
    // const handleImageDelete = async (image: string) => {
    //     try {
    //         const opData = {
    //             image,
    //             id: previousData._id,
    //         };
    //         const res = await removeIdeaImage(opData);
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    return (
        <div>
            <div className=" w-full p-4">
                <h1 className="text-2xl font-semibold text-center text-sky-500 mb-6">
                    Update Product | Admin Panel
                </h1>
                <Card className="max-w-5xl w-full mx-auto shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg text-sky-500">Updated Product Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <BFormInput
                                    name="name"
                                    label="Product Name"
                                    placeholder="Product Name"
                                    control={control}
                                    className="border border-sky-400 bg-white w-full"
                                />
                                <BFormInput
                                    name="brandName"
                                    label="Brand Name"
                                    placeholder="Brand Name"
                                    control={control}
                                    className="border border-sky-400 bg-white w-full"
                                />
                                <BFormSelect
                                    name="color"
                                    label="Color"
                                    placeholder="Color"
                                    options={colorOptions}
                                    control={control}
                                    className="border border-sky-400 bg-white w-full"
                                />
                                <BFormInput
                                    name="price"
                                    label="Price"
                                    placeholder="Price"
                                    type="number"
                                    control={control}
                                    className="border border-sky-400 bg-white w-full"
                                />
                                <BFormInput
                                    name="stocks"
                                    label="Stocks"
                                    placeholder="Stocks"
                                    type="number"
                                    control={control}
                                    className="border border-sky-400 bg-white w-full"
                                />
                                <BFormTextarea
                                    name="description"
                                    label="Description"
                                    placeholder="Description"
                                    control={control}
                                    className="border border-sky-400 bg-white w-full"
                                />
                                {previousData?.images?.length > 0 && (
                                    <>
                                        <Label htmlFor="image" className="font-semibold text-[14px]">
                                            Current Images
                                            <span className="text-green-500 text-xl relative top-0.5">
                                                *
                                            </span>
                                        </Label>
                                        <div className="border border-green-500 p-2 grid grid-cols-4 border-dashed">
                                            {previousData?.images?.map((image: string) => (
                                                <div key={image} className="relative">
                                                    <img
                                                        src={image}
                                                        alt="image"
                                                        width={200}
                                                        height={200}
                                                        className="rounded-sm"
                                                    />
                                                    <Button
                                                        className="absolute top-0 right-1 rounded-full shadow-md  hover:scale-110 transition-transform cursor-pointer">
                                                        <Trash2 size={14} className=" text-white" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                <Label htmlFor="image" className="font-semibold text-[14px]">New Images <span className="text-sky-500 text-xl relative top-0.5">*</span></Label>
                                <div className="border border-dashed rounded-lg p-6 text-center border-sky-400 transition-colors cursor-pointer">

                                    <BFormImageUpload
                                        previewImages={previewImages}
                                        setPreviewImages={setPreviewImages}
                                        name="images"
                                        multiple={true}
                                        onImageUpload={setImageUrls}
                                        control={control}
                                    />
                                </div>

                                <CardFooter className="p-0 pt-4">
                                    <Button
                                        style={{ color: "white" }}
                                        className="w-full py-3 bg-sky-400 h-[35px] hover:bg-sky-500"
                                        htmlType="submit"
                                    >
                                        {isLoading || isUploading ? (
                                            <>
                                                <p>updating...</p>
                                                <LuLoaderCircle className="animate-spin" />
                                            </>
                                        ) : (
                                            "Update"
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UpdateProduct;
