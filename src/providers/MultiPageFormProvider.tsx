import { createContext, ReactNode, useState } from "react";

type MultiPageFormProviderProps = {
  children?: ReactNode;
};

// Define the structure of a single field
export interface FormField {
  name: string;
  value: string;
}

// Define the structure of each page's form data
export interface PageData {
  fields: FormField[];
}

// Form data will now be an array of `PageData` objects
export type FormData = PageData[];

// Define the type for the context
export interface FormContextType {
  formData: FormData;
  updateFormData: (pageIndex: number, fields: FormField[]) => void;
}

// Create Context with an initial empty value
// eslint-disable-next-line react-refresh/only-export-components
export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export const MultiPageFormProvider = ({
  children,
}: MultiPageFormProviderProps) => {
  const [formData, setFormData] = useState<FormData>([
    { fields: [] }, // Page 1
    { fields: [] }, // Page 2
    // Add more pages as needed
  ]);

  // Function to update the fields for a specific page
  const updateFormData = (pageIndex: number, fields: FormField[]) => {
    setFormData((prev) =>
      prev.map((pageData, index) =>
        index === pageIndex ? { fields } : pageData
      )
    );
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
