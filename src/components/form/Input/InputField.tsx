import { Form } from "antd";
import { Controller } from "react-hook-form";


type TInputProps = {
    type: string;
    name: string;
    label?: string;
    defaultValue?: any;
    placeholder?: string;
};
const InputField = ({ name, type, label, defaultValue, placeholder }: TInputProps) => {
    return (
        <div>
            <Controller
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Form>
                        <label className="block  text-sm font-bold text-gray-700" >{label}</label>
                        <input
                            className="lg:w-[600px] lg:px-3 py-2 leading-tight text-gray-700 border rounded border-blue-300 appearance-none focus:outline-none focus:shadow-outline bg-gray-white"
                            name={name}
                            onChange={field.onChange}
                            defaultValue={defaultValue}
                            type={type}
                            placeholder={placeholder}
                        />
                    </Form>
                )}
            />
            <div className="mb-4">

            </div>
        </div>
    );
};

export default InputField;