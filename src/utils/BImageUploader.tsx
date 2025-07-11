import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { File } from "lucide-react";
import { Input } from "@/components/ui/input";

type TImageUpload = {
    setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
    setImagePreview?: Dispatch<SetStateAction<[] | string[]>>;
    imageFiles: File[] | [];
    label?: string;
    className?: string;
};

const BImageUploader = ({
    setImageFiles,
    setImagePreview,
    className,
    imageFiles
}: TImageUpload) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setImageFiles((prev) => [...prev, file]);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (setImagePreview) {
                    setImagePreview((prev) => [...prev, reader.result as string]);
                }
            };
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    };
    return (
        <div
            className={cn(
                "flex justify-center items-center w-full gap-4",
                className
            )}>
            <Input
                onChange={handleImageChange}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="image-uploader"
            />

            <label
                htmlFor="image-uploader"
                className="w-[400px]  flex justify-center items-center  border-dashed  cursor-pointer text-center border border-sky-500 transition mt-3 py-1 text-sky-400">
                <File size={15} className="text-sky-400" /> {imageFiles?.length === 0 ? "Upload your image" : imageFiles[0].name}
            </label>
        </div>
    );
};

export default BImageUploader;