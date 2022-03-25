// LIBRARIES
import { Route, Routes } from "react-router";
// COMPONENTS
import PrivateRoutes from "./pages/PrivateRoutes";
import Home from "./pages/Home";
import Login from "./pages/Signin";
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import BookMarked from "./pages/BookMarked";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvseries" element={<TvSeries />} />
            <Route path="/bookmarked" element={<BookMarked />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
