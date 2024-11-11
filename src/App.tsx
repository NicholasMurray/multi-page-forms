import { useState } from "react";
import { MultiPageFormProvider } from "./providers/MultiPageFormProvider";
import { Page1 } from "./pages/Page1";
import { Page2 } from "./pages/Page2";
import { Summary } from "./pages/Summary";
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
