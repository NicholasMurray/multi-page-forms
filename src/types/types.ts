import { FieldError, UseFormRegister } from "react-hook-form";

export type FormDataTypes = {
  confirmPassword: string;
  email: string;
  githubUrl: string;
  password: string;
  yearsOfExperience: number;
};

export type FormFieldProps = {
  error: FieldError | undefined;
  label: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormDataTypes>;
  type: string;
  value?: string;
};


export type ValidFieldNames =
  | "email"
  | "githubUrl"
  | "yearsOfExperience"
  | "password"
  | "confirmPassword"
  | "field1"
  | "field2";
