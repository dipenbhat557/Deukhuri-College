import { BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const HeroHeader = lazy(() => import("./components/HeroHeader"));
const Hero = lazy(() => import("./components/Hero"));
const HeroFooter = lazy(() => import("./components/HeroFooter"));
const Notices = lazy(() => import("./components/Notices"));
const VideoTour = lazy(() => import("./components/VideoTour"));
const Specifications = lazy(() => import("./components/Specifications"));
const RegisterSection = lazy(() => import("./components/RegisterSection"));
const Messages = lazy(() => import("./components/Messages"));
const Programs = lazy(() => import("./components/Programs"));
const Subscriptions = lazy(() => import("./components/Subscriptions"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroHeader />
        <Hero />
        <HeroFooter />
        <Notices />
        <VideoTour />
        <Specifications />
        <RegisterSection />
        <Messages />
        <Programs />
        <Subscriptions />
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
