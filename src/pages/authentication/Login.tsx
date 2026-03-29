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
import toast from "react-hot-toast";
import GooLogin from "@/components/Login/GoogleLogin/GoogleLogin";
import { UserRole } from "@/components/constants/namingConstant";
import { useState } from "react";
import ForgotPasswordModal from "@/components/Login/GoogleLogin/ForgotPasswordModal";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [login, { isLoading }] = useLoginMutation();
    const [forgotOpen, setForgotOpen] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const userInfo = {
                email: data.email,
                password: data.password,
            };
            const res = await login(userInfo).unwrap();
            if (res?.success) {
                toast.success(res?.message);
            }
            const user = verifyToken(res.data.accessToken) as IUser;
            dispatch(setUser({ user: user, token: res.data.accessToken }));
            if (user?.activeRole === UserRole.ADMIN) {
                navigate(`/admin/dashboard`);
            } else {
                navigate(`/`);
            }
        } catch (err: unknown) {
            const error = err as { data: { message: string } };
            toast.error(error?.data?.message || "Login Failed!");
        }
    };

    return (
        <div className="lg:mx-44">
            <div className="lg:flex">
                <div className="lg:w-3/5 lg:block hidden">
                    <img src={image} alt="" />
                </div>
                <div className="lg:w-2/5 lg:mt-0 max-h-screen mx-3 mt-[200px]">
                    <div className="lg:relative top-28 border-2 border-gray-200 border-b-0 p-10 rounded-xl">
                        <h1 className="text-2xl text-center text-blue-600">Enter Your Credentials</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                            <div className="mb-1">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">Password</label>
                                <input
                                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded border-blue-300 appearance-none focus:outline-none focus:shadow-outline bg-gray-100"
                                    {...register('password')}
                                    id="password"
                                    name='password'
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>

                            {/* Forgot Password anchor */}
                            <div className="mb-4 text-right">
                                <button
                                    type="button"
                                    onClick={() => setForgotOpen(true)}
                                    className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <div className="w-full mb-5">
                                <Button
                                    style={{ backgroundColor: '#0ea5e9', color: 'white', borderRadius: '0px', fontSize: '16px' }}
                                    className="w-full py-2"
                                    htmlType="submit"
                                >
                                    {isLoading ? <LuLoaderCircle className="animate-spin" /> : 'Login'}
                                </Button>
                            </div>
                            <GooLogin />
                            <h1 className="text-center mt-2 text-blue-500">
                                New here? <Link className="text-black" to='/register'>Register</Link>
                            </h1>
                        </form>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal Flow */}
            <ForgotPasswordModal
                isOpen={forgotOpen}
                onClose={() => setForgotOpen(false)}
            />
        </div>
    );
};

export default Login;