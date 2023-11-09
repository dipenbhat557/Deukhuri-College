import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import emailjs from "emailjs-com";
import { contactBg, facebook, instagram, twitter } from "../assets";
import Footer from "./Footer";
import HeroHeader from "./HeroHeader";
import Navbar from "./Navbar";
import Subscription from "./Subscriptions";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";

// Lazy-loaded components
const Loading = lazy(() => import("./Loading"));

const Contact = () => {
  const [scrolled, setScrolled] = useState(false);

  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_htp2klw",
        "template_a9c3yzv",
        {
          from_name: form.name,
          to_name: "Dipendra",
          from_email: form.email,
          to_email: "bhattadipen557@gmail.com",
          message: form.message,
        },
        "70gtdMrv58XYFp0DP"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong");
        }
      );
  };

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
        {scrolled && <Navbar active="CONTACT" scrolled={scrolled} />}
        <HeroHeader />
      </Suspense>

      <div className="w-full h-[500px] sm:h-[616px] relative">
        <img
          src={contactBg}
          alt="Graduate BG"
          className="w-full h-full object-cover -z-10"
        />

        <Suspense fallback={<Loading />}>
          <div
            className={`w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex flex-col ${
              scrolled ? "justify-end" : "justify-between"
            } items-center text-white`}
          >
            {scrolled || <Navbar active="CONTACT" scrolled={scrolled} />}

            <div className="w-[60%] h-[15%] flex flex-col ">
              <div className="w-full h-[60%] text-center pt-2 bg-red-900">
                <p className="text-[18px] sm:text-[20px] font-bold text-white">
                  Contact
                </p>
              </div>
              <div className="w-full h-[40%] bg-white" />
            </div>
          </div>
        </Suspense>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start w-full h-auto sm:mx-8 pl-24">
        <div className=" flex w-full sm:w-[50%] h-auto ml-0  sm:ml-10">
          {/* Contact form section */}
          <Suspense fallback={<Loading />}>
            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className="flex-[0.75]  rounded-2xl"
            >
              {/* Contact form */}
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mt-12 flex flex-col gap-8"
              >
                <label className="flex flex-col">
                  <span className=" font-medium my-4">Name *</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    className=" py-4 px-6 placeholder:text-slate-400 bg-slate-100 rounded-lg  font-medium"
                  />
                </label>
                <label className="flex flex-col">
                  <span className=" font-medium my-4">Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your web address?"
                    className=" py-4 px-6 placeholder:text-slate-400 bg-slate-100 rounded-lg  font-medium"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="font-medium my-4">Message *</span>
                  <textarea
                    rows={7}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What you want to say?"
                    className=" py-4 px-6 placeholder:text-slate-400 rounded-lg bg-slate-100 font-medium"
                  />
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  className="py-3 px-8 rounded-xl w-full text-white font-bold shadow-lg bg-red-900 shadow-black"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </motion.div>
          </Suspense>
        </div>

        <Suspense fallback={<Loading />}>
          <div className="h-auto w-[80% ] sm:w-[35%] flex flex-col my-4 ">
            <p className="text-[18px] p-3">Deukhuri Multiple Campus</p>
            <p className="text-[16px] text-slate-600 p-2">
              Lamahi-6, Dang, Nepal
            </p>
            <p className="text-[16px] text-slate-600 p-2">
              +977 98765789, 098769 , 098790
            </p>
            <p className="text-[16px] text-slate-600 p-2">
              deukhuricampus@gmail.com
            </p>
            <div className="flex items-start gap-5 justify-start m-4">
              <img
                src={instagram}
                alt="instagram"
                className="rounded-2xl cursor-pointer h-[50px]"
              />
              <img
                src={twitter}
                alt="twitter"
                className="rounded-2xl cursor-pointer h-[50px]"
              />
              <img
                src={facebook}
                alt="facebook"
                className="rounded-2xl cursor-pointer h-[50px]"
              />
            </div>
          </div>
        </Suspense>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3526.8379558822553!2d82.51065539999999!3d27.8762477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399799b1acfbe8b9%3A0x3cbacc276efcd797!2sDeukhuri%20Multiple%20Campus!5e0!3m2!1sen!2sin!4v1699093685673!5m2!1sen!2sin"
        allowFullScreen=""
        id="location"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[350px]  mt-4"
      ></iframe>

      <Suspense fallback={<Loading />}>
        <div className="w-full">
          <Subscription />
          <Footer />
        </div>
      </Suspense>
    </div>
  );
};
export default Contact;
