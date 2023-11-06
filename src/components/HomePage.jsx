import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

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
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 105) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    // const debouncedHandleScroll = debounce(handleScroll, 100); // Adjust the delay time (in milliseconds) as needed
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={`${scrolled ? "flex flex-col" : ""}`}>
        {scrolled && <Navbar active="ACADEMICS" scrolled={scrolled} />}
        <HeroHeader />
        <Hero scrolled={scrolled} />
        <HeroFooter />
        <Notices />
        <VideoTour />
        <Specifications />
        <RegisterSection />
        <Messages />
        <Programs />
        <Subscriptions />
        <Footer />
      </div>
    </Suspense>
  );
};
export default HomePage;
