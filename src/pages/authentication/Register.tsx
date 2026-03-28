import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import image from '../../assets/SignUp.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";
import { IUser } from "@/types/auth.types";
import { verifyToken } from "@/utils/verifyToken";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const userValidationSchema = z.object({
    fullName: z.string({ required_error: "Full Name is required!" })
        .trim()
        .min(1, "Full Name is required!")
        .max(20, "Full Name cannot be more than 20 characters!"),
    email: z.string({ required_error: "Email is required!" })
        .min(1, "Email is required!")
        .email("Invalid email address!"),
    password: z.string({ required_error: "Password is required!" })
        .min(8, "Password must be at least 8 characters!"),
});

type TRegisterForm = z.infer<typeof userValidationSchema>;

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TRegisterForm>({
        resolver: zodResolver(userValidationSchema)
    });

    const [signUpUser, { isLoading }] = useSignUpMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<TRegisterForm> = async (data) => {
        const userInfo = {
            fullName: data.fullName,
            email: data.email,
            password: data.password
        };
        try {
            const res = await signUpUser(userInfo).unwrap();
            if (res.success) {
                const user = verifyToken(res.data.accessToken) as IUser;
                dispatch(setUser({ user: user, token: res.data.accessToken }));
                toast.success('User registered successfully');
                navigate('/');
            }
        } catch (err: any) {
            console.log("error", err);
            toast.error(err?.data?.message || "Registration Failed!");
        }
    };

    return (
        <div className="lg:mx-44">
            <div className="lg:flex lg:flex-row-reverse">
                <div className="lg:w-3/5 lg:block hidden">
                    <img src={image} alt="" />
                </div>
                <div className="lg:w-2/5 max-h-screen mx-3 lg:mt-0 mt-[200px]">
                    <div className="lg:relative top-28 border-2 border-gray-200 border-b-0 p-10 rounded-xl">
                        <h1 className="text-2xl text-center text-blue-600">Register your account</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Full Name */}
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">Full Name</label>
                                <input
                                    className={`w-full lg:px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline bg-gray-100 ${errors.fullName ? 'border-red-500' : 'border-blue-300'}`}
                                    {...register('fullName')}
                                    type="text"
                                    placeholder="Full Name"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">Email</label>
                                <input
                                    className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline bg-gray-100 ${errors.email ? 'border-red-500' : 'border-blue-300'}`}
                                    {...register('email')}
                                    type="text"
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
                                <input
                                    className={`w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline bg-gray-100 ${errors.password ? 'border-red-500' : 'border-blue-300'}`}
                                    {...register('password')}
                                    type="password"
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="w-full">
                                <Button
                                    style={{ backgroundColor: '#0ea5e9', color: 'white', fontSize: '16px' }}
                                    className="w-full py-2"
                                    htmlType="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? <LuLoaderCircle className="animate-spin" /> : 'Register'}
                                </Button>
                            </div>
                            <h1 className="text-center mt-2 text-blue-500">
                                Already Have an account? <Link className="text-black" to='/login'>Login</Link>
                            </h1>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;