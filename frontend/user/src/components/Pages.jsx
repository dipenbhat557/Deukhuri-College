import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import Graduate from "./Graduate";
import Blog from "./Blog";
import Admission from "./Admission";
import Faculty from "./Faculty";
import Contact from "./Contact";
import About from "./About";
import Publications from "./Publications";
import StudentForm1 from "./Forms/StudentForm1";
import StudentForm2 from "./Forms/StudentForm2";
import EventPage from "./EventPage";
import AfterEvent from "./AfterEvent";
import { QrComponent } from "./QrComponent";

function Pages() {
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
        <Route path="/faculty/academics" element={<Faculty fIndex="0" />} />
        <Route
          path="/faculty/administration"
          element={<Faculty fIndex="1" />}
        />

        <Route path="/faculty/management" element={<Faculty fIndex="2" />} />

        <Route
          path="/FACULTY"
          element={<Navigate to="/faculty/academics" replace />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/form1" element={<StudentForm1 />} />
        <Route path="/form2" element={<StudentForm2 />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/afterevent/:id" element={<AfterEvent />} />
        <Route path="/qr/:id" element={<QrComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;
