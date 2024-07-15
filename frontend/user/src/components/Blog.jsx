import React, { useEffect, useState, lazy, Suspense } from "react";
import { Tilt } from "react-tilt";
import { blogBg, def } from "../assets";
import { styles } from "../styles";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import RegisterSection from "./RegisterSection";
import Subscription from "./Subscriptions";
import useFetch from "./UseFetch";
import axios from "axios";

// Lazy-loaded components
const Loading = lazy(() => import("./Loading"));

const Blog = () => {
  const [scrolled, setScrolled] = useState(false);

  const [blogs,setBlogs] = useState([])

useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_ROOT}/api/blog`
        );
        let receivedData = response?.data;
        setBlogs(receivedData);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 105) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${scrolled ? "flex flex-col" : ""}`}>
      <Suspense fallback={<Loading />}>
        {scrolled && <Navbar active="BLOG" scrolled={scrolled} />}
        <HeroHeader />
      </Suspense>

      <div className="w-full h-[500px] sm:h-[616px] relative">
        <img
          src={blogBg}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />

        <Suspense fallback={<Loading />}>
          <div
            className={`w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex flex-col ${
              scrolled ? "justify-end" : "justify-between"
            } items-center text-white`}
          >
            {scrolled || <Navbar active="BLOG" scrolled={scrolled} />}

            <div className="w-[60%] h-[15%] flex flex-col ">
              <div className="w-full h-[60%] text-center pt-2 bg-red-900">
                <p className="text-[20px] font-bold text-white">Blog</p>
              </div>
              <div className="w-full h-[40%] bg-white" />
            </div>
          </div>
        </Suspense>
      </div>

      <div className={`${styles.padding} w-full h-auto relative`}>
        <div className="w-full h-[10%] flex items-start justify-center">
          <p className="text-[20px] sm:text-[25px] font-bold">
            Message's from our Faculty
          </p>
        </div>
        <div
          className="bg-red-950 w-[80px] h-[100px] flex justify-start top-20 ml-[40px] rounded-t-xl"
          style={{ position: "absolute", zIndex: -1 }}
        ></div>

        <div className="w-full h-[80%] flex flex-wrap justify-around items-center mb-16">
          {blogs?.length > 0 ? (
            blogs.map((blog, index) => (
              <Tilt
                key={index}
                options={{
                  max: 45,
                  scale: 1,
                  speed: 450,
                }}
                className=" mt-9 rounded-2xl h-auto w-full sm:w-[35%]"
              >
                <div className=" flex mt-10 flex-col justify-center items-center w-full h-full shadow-2xl p-4">
                  <img
                    className="rounded-3xl w-[80%] h-[55%]"
                    src={`data:image/jpeg;base64,${blog?.img}` || def}
                    alt={blog?.title}
                  />
                  <div className="flex flex-col w-full h-[45%]">
                    <div className="flex items-center w-full h-[15%] font-semibold">
                      <p className="text-red-900 text-[12px] md:text-[20px] ml-3 md:ml-9">
                        {blog?.title}
                      </p>
                      <div className="ml-2 w-[8%] h-[2px] border-b-4 border-red-900 rounded-3xl" />
                    </div>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: blog?.description
                      }}
                      className="text-[10px] md:text-[16px] h-[85%]  text-2xl mx-8 text-justify"
                    ></p>
                  </div>
                </div>
              </Tilt>
            ))
          ) : (
            <Loading />
          )}
        </div>
        <div
          className="hidden sm:flex bg-red-900 w-[80px] h-[90px] justify-end bottom-4 right-28 rounded-b-xl"
          style={{ position: "absolute", zIndex: -1 }}
        ></div>
      </div>

      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <RegisterSection />
          <Subscription />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
};
export default Blog;
