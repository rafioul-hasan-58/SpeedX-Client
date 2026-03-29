import { useState, useRef, useEffect } from "react";
import { LuLoaderCircle, LuX, LuMail, LuShieldCheck, LuLock } from "react-icons/lu";
import toast from "react-hot-toast";

import { useForgotPasswordMutation, useVerifyForgotPasswordOTPMutation, useResetPasswordMutation } from "@/lib/api/authApi";
import { verifyToken } from "@/utils/verifyToken";

type Step = "email" | "verify" | "reset";

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const STEP_CONFIG = {
    email: {
        icon: <LuMail size={28} className="text-blue-500" />,
        title: "Forgot Password",
        subtitle: "Enter your registered email address. We'll send you a verification code.",
    },
    verify: {
        icon: <LuShieldCheck size={28} className="text-blue-500" />,
        title: "Verify Your Email",
        subtitle: "Enter the 6-digit code we sent to your email.",
    },
    reset: {
        icon: <LuLock size={28} className="text-blue-500" />,
        title: "Reset Password",
        subtitle: "Create a new strong password for your account.",
    },
};

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const [forgotPassword] = useForgotPasswordMutation();
    const [verifyForgotPasswordOTP] = useVerifyForgotPasswordOTPMutation();
    const [resetPassword] = useResetPasswordMutation();
    const [accessToken, setAccessToken] = useState("");

    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer for OTP resend
    useEffect(() => {
        if (resendTimer <= 0) return;
        const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [resendTimer]);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep("email");
                setEmail("");
                setOtp(["", "", "", "", "", ""]);
                setNewPassword("");
                setConfirmPassword("");
                setResendTimer(0);
            }, 300);
        }
    }, [isOpen]);

    // ── Step 1: Send OTP ──────────────────────────────────────────────────────
    const handleSendOtp = async () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        setIsLoading(true);
        try {
            const res = await forgotPassword({ email }).unwrap();
            if (res.success) {
                toast.success(res.message || "Verification code sent to your email!");
                setStep("verify");
                setResendTimer(60);
                setTimeout(() => otpRefs.current[0]?.focus(), 100);
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to send OTP. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // ── OTP input helpers ─────────────────────────────────────────────────────
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);
        if (value && index < 5) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pasted.length === 6) {
            setOtp(pasted.split(""));
            otpRefs.current[5]?.focus();
            e.preventDefault();
        }
    };

    // ── Step 2: Verify OTP ────────────────────────────────────────────────────
    const handleVerifyOtp = async () => {
        const code = otp.join("");
        if (code.length < 6) {
            toast.error("Please enter the complete 6-digit code.");
            return;
        }
        setIsLoading(true);
        try {
            const res = await verifyForgotPasswordOTP({ email, otp: Number(code) }).unwrap();

            if (res.success) {
                setAccessToken(res.data.accessToken);
                toast.success(res.message || "Code verified! Set your new password.");
                setStep("reset");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Invalid or expired code.");
            console.log("handleVerifyOtp", err)
        } finally {
            setIsLoading(false);
        }
    };

    // ── Resend OTP ────────────────────────────────────────────────────────────
    const handleResend = async () => {
        if (resendTimer > 0) return;
        setIsLoading(true);
        try {
            const res = await forgotPassword({ email }).unwrap();
            if (res.success) {
                toast.success(res.message || "New code sent!");
                setResendTimer(60);
                setOtp(["", "", "", "", "", ""]);
                setTimeout(() => otpRefs.current[0]?.focus(), 100);
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to resend. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // ── Step 3: Reset Password ────────────────────────────────────────────────
    const handleResetPassword = async () => {
        if (newPassword.length < 6) {
            toast.error("Password must be at least 8 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        setIsLoading(true);
        try {
            const { email } = verifyToken(accessToken);
            const res = await resetPassword({ newPassword, confirmPassword, email }).unwrap();

            if (res.success) {
                toast.success(res.message || "Password reset successfully! Please log in.");
                onClose();
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to reset password.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    const config = STEP_CONFIG[step];

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* Dialog */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label="Close"
                >
                    <LuX size={20} />
                </button>

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    {(["email", "verify", "reset"] as Step[]).map((s, i) => (
                        <div key={s} className="flex items-center gap-2">
                            <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step === s
                                    ? "bg-blue-500 text-white scale-110"
                                    : ["email", "verify", "reset"].indexOf(step) > i
                                        ? "bg-blue-200 text-blue-700"
                                        : "bg-gray-100 text-gray-400"
                                    }`}
                            >
                                {i + 1}
                            </div>
                            {i < 2 && (
                                <div
                                    className={`w-8 h-0.5 transition-all duration-300 ${["email", "verify", "reset"].indexOf(step) > i ? "bg-blue-300" : "bg-gray-200"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Icon + Title */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                        {config.icon}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{config.title}</h2>
                    <p className="text-sm text-gray-500 text-center mt-1 max-w-xs">{config.subtitle}</p>
                </div>

                {/* ── Step 1: Email ────────────────────────────────────────── */}
                {step === "email" && (
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                                className="w-full px-3 py-2 text-gray-700 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                                placeholder="you@example.com"
                                autoFocus
                            />
                        </div>
                        <button
                            onClick={handleSendOtp}
                            disabled={isLoading}
                            className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isLoading ? <LuLoaderCircle className="animate-spin" /> : "Send Verification Code"}
                        </button>
                    </div>
                )}

                {/* ── Step 2: OTP Verify ───────────────────────────────────── */}
                {step === "verify" && (
                    <div className="space-y-5">
                        <div>
                            <p className="text-xs text-center text-gray-500 mb-3">
                                Sent to <span className="font-semibold text-gray-700">{email}</span>
                            </p>
                            <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => { otpRefs.current[i] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                        className="w-11 h-12 text-center text-lg font-bold border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50 transition-all"
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleVerifyOtp}
                            disabled={isLoading}
                            className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isLoading ? <LuLoaderCircle className="animate-spin" /> : "Verify Code"}
                        </button>

                        <div className="flex justify-between items-center text-sm">
                            <button
                                onClick={() => setStep("email")}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                ← Change email
                            </button>
                            <button
                                onClick={handleResend}
                                disabled={resendTimer > 0 || isLoading}
                                className={`font-medium transition-colors ${resendTimer > 0
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-blue-500 hover:text-blue-700"
                                    }`}
                            >
                                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Step 3: Reset Password ───────────────────────────────── */}
                {step === "reset" && (
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-gray-700">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3 py-2 text-gray-700 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                                placeholder="Min. 8 characters"
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
                                className={`w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring-2 bg-gray-50 transition-colors ${confirmPassword && newPassword !== confirmPassword
                                    ? "border-red-400 focus:ring-red-200"
                                    : "border-blue-300 focus:ring-blue-400"
                                    }`}
                                placeholder="Re-enter password"
                            />
                            {confirmPassword && newPassword !== confirmPassword && (
                                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                            )}
                        </div>

                        {/* Strength bar */}
                        {newPassword && (
                            <div className="space-y-1">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((lvl) => {
                                        const strength =
                                            (newPassword.length >= 6 ? 1 : 0) +
                                            (/[A-Z]/.test(newPassword) ? 1 : 0) +
                                            (/\d/.test(newPassword) ? 1 : 0) +
                                            (/[^a-zA-Z0-9]/.test(newPassword) ? 1 : 0);
                                        const color =
                                            strength <= 1 ? "bg-red-400" :
                                                strength === 2 ? "bg-yellow-400" :
                                                    strength === 3 ? "bg-blue-400" : "bg-green-500";
                                        return (
                                            <div
                                                key={lvl}
                                                className={`h-1 flex-1 rounded-full transition-all ${lvl <= strength ? color : "bg-gray-200"}`}
                                            />
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-gray-400">
                                    Tip: Use uppercase, numbers & symbols for a stronger password.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleResetPassword}
                            disabled={isLoading}
                            className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isLoading ? <LuLoaderCircle className="animate-spin" /> : "Reset Password"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordModal;