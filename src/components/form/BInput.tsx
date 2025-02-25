import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  placeholder: string;
};

const BInput = ({ type, name, label, disabled, defaultValue, placeholder }: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              value={field.value ?? defaultValue}
              placeholder={placeholder}
              onChange={field.onChange}
              style={{ inlineSize: '600px', backgroundColor: 'white', border: '1px solid #38bdf8', blockSize: '35px', margin: '0px 0px 0px 0px', }}
              type={type}
              id={name}
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default BInput;
