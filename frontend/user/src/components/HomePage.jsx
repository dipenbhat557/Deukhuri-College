import { lazy, Suspense, useEffect, useState } from "react";
import Loading from "./Loading";
import Advertisement from "./Advertisement";
import Events from "./Events";
// import HeaderNotice from "./HeaderNotice";

const Navbar = lazy(() => import("./Navbar"));

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
    <Suspense fallback={<Loading />}>
      <div className={`${scrolled ? "flex flex-col" : ""} relative`}>
        {scrolled && <Navbar active="HOME" scrolled={scrolled} />}

        <Advertisement />
        <HeroHeader />
        {/* <HeaderNotice /> */}

        <Hero />
        <HeroFooter />
        <Notices />
        <VideoTour />
        <Specifications />
        <RegisterSection />
        <Messages />
        <Events />
        <Programs />
        <Subscriptions />
        <Footer />
      </div>
    </Suspense>
  );
};
export default HomePage;
