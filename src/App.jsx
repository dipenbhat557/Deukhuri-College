import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Graduate from "./components/Graduate";
import UnderGraduate from "./components/UnderGraduate";
import FacultyAdministrative from "./components/FacultyAdministrative";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graduate" element={<Graduate />} />
        <Route path="/undergraduate" element={<UnderGraduate />} />
        <Route
          path="/faculty/administration"
          element={<FacultyAdministrative />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
