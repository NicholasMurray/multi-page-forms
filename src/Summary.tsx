import { Dispatch, SetStateAction } from "react";
import { FormField, PageData } from "./providers/MultiPageFormProvider";
import { useMultiPageForm } from "./hooks/useMultiPageForm";

interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

// Example of Summary Page
export const Summary = ({ currentPage, setCurrentPage }: Props) => {
  const { formData } = useMultiPageForm();
  const handleSubmit = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div>
      <h2>Summary</h2>
      {formData.map((pageData: PageData, pageIndex: number) => (
        <div key={pageIndex}>
          <h3>Page {pageIndex + 1}</h3>
          {pageData.fields.map((field: FormField) => (
            <div key={field.name}>
              <span>
                {field.name}: {field.value}
              </span>{" "}
              <a onClick={() => setCurrentPage(pageIndex)}>change</a>
            </div>
          ))}
        </div>
      ))}
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
