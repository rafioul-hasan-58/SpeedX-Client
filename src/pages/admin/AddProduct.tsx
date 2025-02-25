import { Button} from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddProductMutation } from "../../redux/features/admin/productManagement.Api";
import BForm from "../../components/form/BForm";
import { toast } from "sonner";
import InputField from "../../components/form/Input/InputField";
import { LuLoaderCircle } from "react-icons/lu";
const AddProduct = () => {
    const [addProduct,{isLoading,error}] = useAddProductMutation()
    console.log(error);
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const productdata = {
            name: data.name,
            brandName: data.brandName,
            price: Number(data.price),
            description: data.description,
            stocks: Number(data.stocks),
            color: data.color,
            image:data.image
        }
        try {
            const res = await addProduct(productdata)
            if (res?.data?.success) {
                toast.success('Product Added successfully')
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <h1 className="text-center text-2xl font-semibold text-sky-400 ">Add product</h1>
            <div className="lg:flex justify-center ">
                <BForm onSubmit={onSubmit}>
                    <InputField placeholder="Name" type="text" label="Name" name="name" />
                    <InputField placeholder="Image" type="url" label="Image" name="image" />
                    <InputField placeholder="Brand Name" type="text" label="Brand Name" name="brandName" />
                    <InputField placeholder="Color" type="text" label="Color" name="color" />
                    <InputField placeholder="Number" type="number" label="Price" name="price" />
                    <InputField placeholder="Stocks" type="number" label="Stocks" name="stocks" />
                    <InputField placeholder="Description" type="text" label="Description" name="description" />
                    <div className="w-full">
                        <Button style={{ backgroundColor: '#38bdf8', color: 'white' }} className="w-full py-2 bg" htmlType="submit">{isLoading?<LuLoaderCircle className="animate-spin" />:'Add Product'}</Button>
                    </div>
                </BForm>
            </div>
        </div>
    );
};

export default AddProduct;