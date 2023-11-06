import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Graduate from "./components/Graduate";
import UnderGraduate from "./components/UnderGraduate";
import FacultyAdministrative from "./components/FacultyAdministrative";
import Blog from "./components/Blog";
import Admission from "./components/Admission";
import FacultyAcademics from "./components/FacultyAcademics";
import About from "./components/About";
import Contact from "./components/Contact";
import Loading from "./components/Loading";

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
        <Route
          path="/faculty/administration"
          element={<FacultyAdministrative />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
