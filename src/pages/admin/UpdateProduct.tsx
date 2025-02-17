import { Button, Col, Form, Input } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProductMutation } from "../../redux/features/admin/productManagement.Api";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
const UpdateProduct = () => {
    const [updateProduct] = useUpdateProductMutation()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const productdata = {
            name: data.name,
            brandName: data.brandName,
            price: Number(data.price),
            description: data.description,
            stocks: Number(data.stocks),
            color: data.color
        }
        console.log(data.photo);
        const formData = new FormData()
        formData.append('data', JSON.stringify(productdata))
        formData.append('file', data.photo)
        // console.log(data.image);
        try {
            const res = await updateProduct(formData)
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
                    <BInput placeholder="Name" type="text" label="Name" name="name" />
                    <Col>
                        <Controller
                            name="photo"
                            render={({ field: { onChange, value, ...field } }) => (
                                <Form.Item label={'Photo'}>
                                    <Input
                                        style={{ backgroundColor: '#f3f4f6', border: '1px solid #38bdf8' }}
                                        type="file"
                                        value={value?.fileName}
                                        {...field}
                                        onChange={(e) => onChange(e.target.files?.[0])}
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>
                    <BInput placeholder="Brand Name" type="text" label="Brand Name" name="brandName" />
                    <BInput placeholder="Color" type="text" label="Color" name="color" />
                    <BInput placeholder="Number" type="number" label="Price" name="price" />
                    <BInput placeholder="Stocks" type="number" label="Stocks" name="stocks" />
                    <BInput placeholder="Description" type="text" label="Description" name="description" />
                    <div className="w-full">
                        <Button style={{ backgroundColor: '#38bdf8', color: 'white' }} className="w-full py-2 bg" htmlType="submit">Add Product</Button>
                    </div>
                </BForm>
            </div>
        </div>
    );
};

export default UpdateProduct;