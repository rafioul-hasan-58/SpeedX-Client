import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useGetProductDetailsQuery, useUpdateProductMutation } from "../../redux/features/admin/productManagement.Api";
import BForm from "../../components/form/BForm";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/form/Input/InputField";
import { LuLoaderCircle } from "react-icons/lu";
const UpdateProduct = () => {
    const [updateProduct, { isLoading, error }] = useUpdateProductMutation()
    console.log(error);
    const { id } = useParams()
    const { data: datas } = useGetProductDetailsQuery(id);
    const navigate = useNavigate()
    const prevData = datas?.data;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const productdata = {
            name: data.name || prevData?.name,
            brandName: data.brandName || prevData?.brandName,
            price: Number(data.price) || Number(prevData?.price),
            description: data.description || prevData?.description,
            stocks: Number(data.stocks) || Number(prevData?.stocks),
            color: data.color || prevData?.color,
            image: data.image || prevData?.image
        }
        console.table(productdata);
        // const formData = new FormData()
        // formData.append('data', JSON.stringify(productdata))
        // formData.append('file', data.photo)
        const updatedData = {
            id: prevData?._id,
            data: productdata
        }
        // console.log(data.image);
        try {
            const res = await updateProduct(updatedData)
            if (res?.data?.success) {
                toast.success('Product updated successfully')
                navigate('/admin/all-product')
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <h1 className="text-center text-2xl font-semibold text-sky-400 ">Update product</h1>
            <div className="lg:flex justify-center ">
                <BForm onSubmit={onSubmit}>
                    <InputField name="name" defaultValue={prevData?.name} label="Name" type="text" />
                    <InputField name="image" defaultValue={prevData?.image} label="Image" type="url" />
                    <InputField name="brandName" defaultValue={prevData?.brandName} label="Brand Name" type="text" />
                    <InputField name="color" defaultValue={prevData?.color} label="Color" type="text" />
                    <InputField name="price" defaultValue={prevData?.price} label="Price" type="number" />
                    <InputField name="stocks" defaultValue={prevData?.stocks} label="Stocks" type="number" />
                    <InputField name="description" defaultValue={prevData?.description} label="Description" type="text" />
                    <div className="w-full">
                        <Button style={{ backgroundColor: '#38bdf8', color: 'white' }} className="w-full py-2 bg" htmlType="submit">{isLoading ? <LuLoaderCircle className="animate-spin" /> : 'Update Product'}</Button>
                    </div>
                </BForm>
            </div>
        </div>
    );
};

export default UpdateProduct;