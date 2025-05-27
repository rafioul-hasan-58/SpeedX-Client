import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAddProductMutation } from "../../redux/features/admin/productManagement.Api";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { Form } from "../../components/ui/form";
import BFormInput from "../../components/form/Input/BFormInput";
import BFormSelect from "../../components/form/Input/BFormSelect";
import { bikeTypeOptions, brandOptions, colorOptions } from "../../constant/ProductConstant";
import BFormTextarea from "../../components/form/Input/BFormTextarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "../../components/ui/card";
import BFormImageUpload from "../../components/form/Input/BFormImageUploader";
import { useState } from "react";
import useImageUploader from "@/utils/useImageUploader";
import { Button } from "@/components/ui/button";

const AddProduct = () => {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { uploadImagesToCloudinary, isUploading } = useImageUploader();
  const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
  const [ImageUrls, setImageUrls] = useState<File | File[]>([]);
  const form = useForm();
  const { control, handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = await uploadImagesToCloudinary(ImageUrls, true);
    const productData = {
      ...data,
      price: Number(data.price),
      stocks: Number(data.stocks),
      images
    };
    try {
      const res = await addProduct(productData);
      if (res?.data?.success) {
        reset()
        toast.success("Product Added successfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <div className=" w-full p-4">
        <h1 className="text-2xl font-semibold text-center text-sky-500 mb-6">
          Add New Product | Admin Panel
        </h1>
        <Card className="max-w-5xl w-full mx-auto shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-sky-500">New Product Details</CardTitle>
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
                <BFormSelect
                  name="brandName"
                  label="Brand Name"
                  placeholder="Brand Name"
                  options={brandOptions}
                  control={control}
                  className="border border-sky-400 bg-white w-full"
                />
                <BFormSelect
                  name="bikeType"
                  label="Bike Type"
                  placeholder="Bike Type"
                  options={bikeTypeOptions}
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
                    type="submit"
                    className="w-full py-3 bg-sky-400 h-[35px] hover:bg-sky-500"
                  >
                    {isLoading || isUploading ? (
                      <LuLoaderCircle className="animate-spin" />
                    ) : (
                      <p>Add Product</p>
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

export default AddProduct;
