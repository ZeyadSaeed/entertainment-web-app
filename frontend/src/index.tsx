// CSS
import "./index.css";
// LIBRARIES
import App from "./App";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// CONTEXT
import { SignupProvider } from "./context/SignupContext";
import { SigninProvider } from "./context/SigninContext";
import { GlobalErrorsProvider } from "./context/GlobalErrors";
import { SearchProvider } from "./context/SearchContext";
import { BookmarkProvider } from "./context/BookmarkedContext";

ReactDOM.render(
  <BrowserRouter>
    <SignupProvider>
      <SigninProvider>
        <SearchProvider>
          <BookmarkProvider>
            <GlobalErrorsProvider>
              <App />
            </GlobalErrorsProvider>
          </BookmarkProvider>
        </SearchProvider>
      </SigninProvider>
    </SignupProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
