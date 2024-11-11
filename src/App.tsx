import { useState } from "react";
import { MultiPageFormProvider } from "./providers/MultiPageFormProvider";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";
import { Summary } from "./Summary";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <h1>Multi-page Form Submission</h1>
      <div className="card">
        <MultiPageFormProvider>
          {currentPage === 0 && (
            <Page1 currentPage={currentPage} setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 1 && (
            <Page2 currentPage={currentPage} setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 2 && (
            <Summary
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </MultiPageFormProvider>
      </div>
    </>
  );
}

export default App;
