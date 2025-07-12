import { useGoogleLoginMutation } from '@/redux/features/auth/authApi';
import { setUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IUser } from '@/types/auth.types';
import { verifyToken } from '@/utils/verifyToken';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function GooLogin() {
    const [googleLogin] = useGoogleLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
        const token = credentialResponse.credential;
        if (!token) {
            toast.error('Google login failed');
            return;
        }
        const res = await googleLogin(token).unwrap();
        if (res?.success) {
            toast.success(res?.message)
        }
        const user = verifyToken(res.data.accessToken) as IUser;
        dispatch(setUser({ user: user, token: res.data.accessToken }));
        if (user?.role === 'admin') {
            navigate(`/admin/dashboard`)
        } else {
            navigate(`/`)
        }
    };
    return (
        <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
                toast.error('Login Failed');
            }}
        />
    )
}
export default GooLogin;
