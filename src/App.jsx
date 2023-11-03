import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Graduate from "./components/Graduate";
import UnderGraduate from "./components/UnderGraduate";
import Blog from "./components/Blog";
import Admission from "./components/Admission";
import FacultyAcademics from "./components/FacultyAcademics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graduate" element={<Graduate />} />
        <Route path="/undergraduate" element={<UnderGraduate />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/faculty/academics" element={<FacultyAcademics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
