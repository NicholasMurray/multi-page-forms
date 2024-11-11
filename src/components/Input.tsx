import { FormFieldProps } from "../types/types";

// error: FieldError | undefined;
// label: string;
// name: ValidFieldNames;
// register: UseFormRegister<FormDataTypes>;
// type: string;
// valueAsNumber?: boolean;

export const Input: React.FC<FormFieldProps> = ({
  error,
  label,
  name,
  register,
  type,
  value,
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input type={type} value={value} {...register} />
    {error && <span className="error-message">{error.message}</span>}
  </div>
);
