import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const HeroHeader = lazy(() => import("./components/HeroHeader"));
const Hero = lazy(() => import("./components/Hero"));
const HeroFooter = lazy(() => import("./components/HeroFooter"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroHeader />
        <Hero />
        <HeroFooter />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
