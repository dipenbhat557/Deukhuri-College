import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

const HeroHeader = lazy(() => import("./HeroHeader"));
const Hero = lazy(() => import("./Hero"));
const HeroFooter = lazy(() => import("./HeroFooter"));
const Notices = lazy(() => import("./Notices"));
const VideoTour = lazy(() => import("./VideoTour"));
const Specifications = lazy(() => import("./Specifications"));
const RegisterSection = lazy(() => import("./RegisterSection"));
const Messages = lazy(() => import("./Messages"));
const Programs = lazy(() => import("./Programs"));
const Subscriptions = lazy(() => import("./Subscriptions"));
const Footer = lazy(() => import("./Footer"));

const HomePage = () => {
  return (
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
  );
};
export default HomePage;
