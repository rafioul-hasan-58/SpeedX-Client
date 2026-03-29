import { useRef, useState, useEffect } from "react";
import { Store, Loader2, CheckCircle2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useResendOtpMutation, useVerifyOTPMutation } from "@/lib/api/authApi";
import toast from "react-hot-toast";

const VerifyOtp = ({ email }: { email: string }) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [seconds, setSeconds] = useState(59);
    const [isSuccess, setIsSuccess] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    const [verifyOtp, { isLoading }] = useVerifyOTPMutation();
    const [resendOtp] = useResendOtpMutation();

    useEffect(() => {
        if (seconds <= 0) return;
        const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(timer);
    }, [seconds]);

    const handleChange = (index: number, value: string) => {
        const val = value.replace(/[^0-9]/g, "");
        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);
        if (val && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
        if (paste.length === 6) {
            setOtp(paste.split(""));
            inputRefs.current[5]?.focus();
        }
        e.preventDefault();
    };

    const handleVerify = async () => {
        try {
            const res = await verifyOtp({ email, otp: otp.join("") }).unwrap();
            if (res.success) {
                setIsSuccess(true);
                setTimeout(() => navigate("/seller/dashboard"), 1500);
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Invalid OTP");
        }
    };

    const handleResend = async () => {
        await resendOtp({ email });
        setOtp(Array(6).fill(""));
        setSeconds(59);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md">
                <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center mb-4">
                    <Store size={20} className="text-white" />
                </div>
                <h2 className="text-lg font-semibold">Verify your email</h2>
                <p className="text-sm text-gray-500 mt-1 mb-6">
                    We sent a 6-digit code to <span className="text-sky-500 font-medium">{email}</span>
                </p>

                {!isSuccess ? (
                    <>
                        <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className={`w-12 h-14 text-center text-xl font-semibold border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition ${digit ? "border-sky-400" : "border-gray-300"}`}
                                />
                            ))}
                        </div>

                        <Button
                            onClick={handleVerify}
                            disabled={otp.some((d) => !d) || isLoading}
                            className="w-full bg-gradient-to-r from-sky-400 to-sky-600 hover:opacity-90 text-white"
                        >
                            {isLoading ? <><Loader2 size={14} className="mr-2 animate-spin" /> Verifying...</> : "Verify OTP"}
                        </Button>

                        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                            <span>Didn't receive the code?</span>
                            <button
                                onClick={handleResend}
                                disabled={seconds > 0}
                                className="text-sky-500 font-medium disabled:text-gray-400"
                            >
                                Resend
                            </button>
                            {seconds > 0 && (
                                <span className="text-sky-500 font-medium">
                                    0:{seconds < 10 ? `0${seconds}` : seconds}
                                </span>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 py-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 size={24} className="text-green-600" />
                        </div>
                        <p className="font-medium">Email verified!</p>
                        <p className="text-sm text-gray-500">Your store is being set up. Redirecting...</p>
                    </div>
                )}

                <hr className="my-4 border-gray-100" />
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center gap-1 text-sm text-gray-400 w-full"
                >
                    <ChevronLeft size={14} /> Back to store setup
                </button>
            </div>
        </div>
    );
};

export default VerifyOtp;