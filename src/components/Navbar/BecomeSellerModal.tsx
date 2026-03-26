import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Store, Upload, Loader2, X } from "lucide-react";
import useImageUploader from "@/utils/useImageUploader";
import { useCreateStoreMutation } from "@/lib/api/storeApi";
import toast from "react-hot-toast";

const formSchema = z.object({
    storeName: z.string().min(3, "Store name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    logo: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const BecomeSellerModal = () => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null); // ✅ moved to component level
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [createStore, { isLoading: isCreatingStore }] = useCreateStoreMutation();

    const { uploadImagesToCloudinary, isUploading } = useImageUploader();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            storeName: "",
            description: "",
        },
    });

    const handleClearLogo = (field: any) => {
        setPreview(null);
        setSelectedFile(null);
        field.onChange(null);
    };

    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);
        try {
            let logoUrl: string | null = null;

            // Upload image to Cloudinary if a file was selected
            if (selectedFile) {
                const url = await uploadImagesToCloudinary(selectedFile);
                logoUrl = url as string;
            }

            const payload = {
                storeName: values.storeName,
                description: values.description,
                logoUrl,
            };
            const res = await createStore(payload).unwrap();
            toast.success(res.message)

            setOpen(false);
            form.reset();
            setPreview(null);
            setSelectedFile(null);
        } catch (err) {
            console.error("❌ Submission error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <li
                onClick={() => setOpen(true)}
                className="relative p-[2px] rounded-full cursor-pointer list-none group"
                style={{ width: "fit-content" }}
            >
                <span
                    aria-hidden="true"
                    style={{
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "9999px",
                        padding: "2px",
                        background: "linear-gradient(var(--angle, 0deg), #0ea5e9, #ffffff, #0ea5e9, #38bdf8, #ffffff, #0ea5e9)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        animation: "spin-border 6s linear infinite",
                        pointerEvents: "none",
                    }}
                />
                <div className="relative overflow-hidden px-4 py-2 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-200 whitespace-nowrap">
                    <span className="relative z-10">Become A Seller</span>
                    <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:left-[150%] transition-all duration-700 ease-in-out" />
                </div>
                <style>{`
                    @property --angle {
                        syntax: '<angle>';
                        initial-value: 0deg;
                        inherits: false;
                    }
                    @keyframes spin-border {
                        to { --angle: 360deg; }
                    }
                `}</style>
            </li>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center">
                                <Store size={18} className="text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-bold">
                                    Create Your Store
                                </DialogTitle>
                                <DialogDescription className="text-xs text-gray-500">
                                    Apply for a seller role and set up your store
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">

                            {/* Store Name */}
                            <FormField
                                control={form.control}
                                name="storeName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">
                                            Store Name <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. SpeedX Motors"
                                                className="focus-visible:ring-[#00b4d8]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">
                                            Description <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us about your store..."
                                                className="resize-none focus-visible:ring-[#00b4d8]"
                                                rows={3}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Logo Upload */}
                            <FormField
                                control={form.control}
                                name="logo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold flex items-center gap-1">
                                            <Upload size={13} />
                                            Logo
                                            <span className="text-gray-400 font-normal text-xs ml-1">
                                                (optional)
                                            </span>
                                        </FormLabel>

                                        <FormControl>
                                            <div className="flex flex-col gap-3">
                                                {/* Upload Box — hidden when preview exists */}
                                                {!preview && (
                                                    <label className="border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-[#00b4d8] transition">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    setSelectedFile(file);       // ✅ track file for upload
                                                                    field.onChange(file);
                                                                    const url = URL.createObjectURL(file);
                                                                    setPreview(url);             // ✅ uses component-level state
                                                                }
                                                            }}
                                                        />
                                                        <div className="text-center text-sm text-gray-500">
                                                            Click to upload logo
                                                        </div>
                                                    </label>
                                                )}

                                                {/* Preview with X (cross) button */}
                                                {preview && (
                                                    <div className="relative w-fit">
                                                        <img
                                                            src={preview}
                                                            alt="Logo preview"
                                                            className="w-20 h-20 object-cover rounded-lg border shadow-sm"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleClearLogo(field)} // ✅ clears preview + file
                                                            className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow hover:bg-red-50 transition"
                                                        >
                                                            <X size={14} className="text-red-500" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Footer Buttons */}
                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        setOpen(false);
                                        form.reset();
                                        setPreview(null);       // ✅ clear on cancel
                                        setSelectedFile(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isLoading || isUploading}
                                    className="flex-1 bg-gradient-to-r from-sky-400 to-sky-600 hover:opacity-90 text-white"
                                >
                                    {isLoading || isUploading || isCreatingStore ? (
                                        <>
                                            <Loader2 size={14} className="mr-2 animate-spin" />
                                            {isUploading ? "Uploading..." : "Applying..."}
                                        </>
                                    ) : (
                                        "Apply Now"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BecomeSellerModal;