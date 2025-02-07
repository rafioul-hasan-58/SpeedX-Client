import { Button } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import image from '../../assets/SignUp.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

const Register = () => {
    const { register, handleSubmit, } = useForm()
    const [signUpUser] = useSignUpMutation()
    const navigate=useNavigate()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data);
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password
        }
        const res = await signUpUser(userInfo).unwrap()
        if (res.success) {
            toast.success('User register Successfully')
            navigate('/SignIn')
        }
    }
    return (
        <div className="lg:mx-44 ">
            <div className="flex">
                <div className="w-3/5 ">
                    <img src={image} alt="" />
                </div>
                <div className="w-2/5   max-h-screen">
                    <div className="lg:relative top-28 border-2 border-gray-200 border-b-0 p-10 rounded-xl">
                        <h1 className="text-2xl  text-center text-blue-600">Register your account</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" >Name</label>
                                <input
                                    className=" w-full lg:px-3 py-2 leading-tight text-gray-700 border rounded border-blue-300 appearance-none focus:outline-none focus:shadow-outline bg-gray-100"
                                    {...register('name')}
                                    name='name'
                                    type="text"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">Email</label>
                                <input
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded border-blue-300 appearance-none focus:outline-none focus:shadow-outline bg-gray-100"
                                    {...register('email')}
                                    id="username"
                                    name='email'
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">Password</label>
                                <input
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded border-blue-300 appearance-none focus:outline-none focus:shadow-outline bg-gray-100"
                                    {...register('password')}
                                    name='password'
                                    type="text"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="w-full">
                                <Button className="w-full py-2 bg" htmlType="submit">SignUp</Button>
                            </div>
                            <h1 className="text-center mt-2 text-blue-500">Already Have an account?<Link className="" to='/login'>Login</Link></h1>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;