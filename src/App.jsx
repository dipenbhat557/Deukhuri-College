import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Graduate from "./components/Graduate";
import UnderGraduate from "./components/UnderGraduate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graduate" element={<Graduate />} />
        <Route path="/undergraduate" element={<UnderGraduate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
