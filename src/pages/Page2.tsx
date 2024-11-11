import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useMultiPageForm } from "../hooks/useMultiPageForm";
import { FormField } from "../providers/MultiPageFormProvider";
import { IFormInput, FormSchema } from "./FormSchema";

interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

// Example of a Page Component
export const Page2 = ({ currentPage, setCurrentPage }: Props) => {
  const { formData, updateFormData } = useMultiPageForm();
  const [localFields, setLocalFields] = useState<FormField[]>(() => {
    // Initialize with existing fields or an empty array
    return formData[currentPage].fields.length > 0
      ? formData[currentPage].fields
      : [
          { name: "field1", value: "" },
          { name: "field2", value: "" },
        ];
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFields((prevFields) => {
      const fieldIndex = prevFields.findIndex((field) => field.name === name);
      if (fieldIndex !== -1) {
        // Update existing field
        return prevFields.map((field, index) =>
          index === fieldIndex ? { ...field, value } : field
        );
      } else {
        // Add new field if it doesn't exist
        return [...prevFields, { name, value }];
      }
    });
  };

  const onSubmit = (data: IFormInput) => {
    console.log("onSubmit called");
    updateFormData(currentPage, localFields); // Update data for current page
    setCurrentPage(currentPage + 1);
    console.log(data);
  };

  return (
    <div>
      <h2>Current Page: {currentPage + 1}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div>
            <label htmlFor="field1">Field1</label>
            <input
              value={localFields.find((f) => f.name === "field1")?.value || ""}
              {...register("field1", {
                onChange: (e) => handleChange(e),
              })}
            />
            {errors?.field1?.message && <p>{errors.field1.message}</p>}
          </div>
          <div>
            <label htmlFor="field2">Field2</label>
            <input
              value={localFields.find((f) => f.name === "field2")?.value || ""}
              {...register("field2", {
                onChange: (e) => handleChange(e),
              })}
            />
            {errors?.field2?.message && <p>{errors.field2.message}</p>}
          </div>
          <button type="submit" onClick={handleSubmit(onSubmit)}>
            Next
          </button>
        </fieldset>
      </form>
    </div>
  );
};
