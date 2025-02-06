import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const BInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
            style={{width:'600px',backgroundColor:'white',border:'1px solid #38bdf8', height: '35px'}}
              {...field}
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