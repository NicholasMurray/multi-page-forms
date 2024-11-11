import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useMultiPageForm } from "./hooks/useMultiPageForm";
import { FormField } from "./providers/MultiPageFormProvider";

interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

// Example of a Page Component
export const Page1 = ({ currentPage, setCurrentPage }: Props) => {
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

  const handleSubmit = () => {
    updateFormData(currentPage, localFields); // Update data for current page
    setCurrentPage(currentPage + 1);
    // navigate to next page
  };

  return (
    <div>
      <h2>Current Page: {currentPage}</h2>
      <form>
        <fieldset>
          <div>
            <label htmlFor="field1">Field1</label>
            <input
              name="field1"
              value={localFields.find((f) => f.name === "field1")?.value || ""}
              onChange={handleChange}
              placeholder="Field 1"
            />
          </div>
          <div>
            <label htmlFor="field2">Field2</label>
            <input
              name="field2"
              value={localFields.find((f) => f.name === "field2")?.value || ""}
              onChange={handleChange}
              placeholder="Field 2"
            />
          </div>
          <button onClick={handleSubmit}>Next</button>
        </fieldset>
      </form>
    </div>
  );
};
