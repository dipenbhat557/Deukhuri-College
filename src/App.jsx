import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Graduate from "./components/Graduate";
import Blog from "./components/Blog";
import Admission from "./components/Admission";
import FacultyAcademics from "./components/FacultyAcademics";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graduate" element={<Graduate pIndex="0" />} />
        <Route path="/undergraduate" element={<Graduate pIndex="1" />} />
        <Route
          path="/ACADEMICS"
          element={<Navigate to="/graduate" replace />}
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admission" element={<Admission />} />
        <Route
          path="/faculty/academics"
          element={<FacultyAcademics fIndex="0" />}
        />
        <Route
          path="/faculty/administration"
          element={<FacultyAcademics fIndex="1" />}
        />

        <Route
          path="/FACULTY"
          element={<Navigate to="/faculty/academics" replace />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
