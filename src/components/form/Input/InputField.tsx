import { Controller, Control } from "react-hook-form";

interface InputFieldProps {
    name: string;
    control: Control<any>;
    placeholder?: string;
    type?: string;
    className?: string;
    defaultValue?: string | number;
}

const InputField: React.FC<InputFieldProps> = ({
    name,
    control,
    defaultValue,
    placeholder,
    type,
    className = "",
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <input
                    {...field}
                    type={type}
                    defaultValue={defaultValue}
                    className={`focus:border-4 focus:border-sky-200 py-2 border border-gray-300 rounded-lg w-[100px] px-3 focus:outline-sky-300 ${className}`}
                    placeholder={placeholder}
                />
            )}
        />
    );
};

export default InputField;
