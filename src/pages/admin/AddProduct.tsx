import { Button, Col, Form, Input } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { useAddProductMutation } from "../../redux/features/admin/productManagement.Api";
import BForm from "../../components/form/BForm";
import { toast } from "sonner";
import InputField from "../../components/form/Input/InputField";
import { LuLoaderCircle } from "react-icons/lu";
const AddProduct = () => {
    const [addProduct,{isLoading}] = useAddProductMutation()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const productdata = {
            name: data.name,
            brandName: data.brandName,
            price: Number(data.price),
            description: data.description,
            stocks: Number(data.stocks),
            color: data.color
        }
        console.log(data.photo, 'aida');
        const formData = new FormData()
        formData.append('data', JSON.stringify(productdata))
        formData.append('file', data.photo)
        // console.log(data.image);
        try {
            const res = await addProduct(formData)
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
                    <Col>
                        <Controller
                            name="photo"
                            render={({ field: { onChange, value, ...field } }) => (
                                <Form.Item label={'Photo'}>
                                    <Input
                                        style={{ backgroundColor: 'white', border: '1px solid #38bdf8' }}
                                        type="file"
                                        value={value?.fileName}
                                        {...field}
                                        onChange={(e) => onChange(e.target.files?.[0])}
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>
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