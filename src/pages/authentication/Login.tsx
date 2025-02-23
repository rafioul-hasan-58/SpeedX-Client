import { Button } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import image from '../../assets/SignUp.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { IUser } from "../../types/auth.types";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";
const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [login, { isLoading }] = useLoginMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const userInfo = {
                email: data.email,
                password: data.password,
            };
            const res = await login(userInfo).unwrap();
            if (res?.success) {
                toast.success(res?.message)
            }
            const user = verifyToken(res.data.accessToken) as IUser;
            dispatch(setUser({ user: user, token: res.data.accessToken }));
            if (user?.role === 'admin') {
                navigate(`/admin/dashboard`)
            } else {
                navigate(`/customer/dashboard`)
            }
        } catch (err: any) {
            toast.error(err?.data?.message)
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
                        <h1 className="text-2xl  text-center text-blue-600">Enter Your Credentials</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">Email</label>
                                <input
                                    defaultValue={'tesla@gmail.com'}
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
                                    defaultValue={123456}
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded border-blue-300 appearance-none focus:outline-none focus:shadow-outline bg-gray-100"
                                    {...register('password')}
                                    name='password'
                                    type="text"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="w-full">
                                <Button style={{ backgroundColor: '#0ea5e9', color: 'white', borderRadius: '0px 0px 0px 0px', fontSize: '16px' }} className="w-full py-2 bg" htmlType="submit">{isLoading ? <LuLoaderCircle className="animate-spin" /> : 'Login'}</Button>
                            </div>
                            <h1 className="text-center mt-2 text-blue-500">New here?<Link className="text-black" to='/register'>Register</Link></h1>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;