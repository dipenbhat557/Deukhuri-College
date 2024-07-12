import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import Hero from "./pages/Dashboard/Hero";
import Rules from "./components/Tables/Rules";
import SignIn from "./pages/Auth/Signin";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "./pages/store";
import Blog from "./components/Tables/Blog";
import BlogForm from "./pages/Form/BlogForm";

import Dashboard from "./pages/Dashboard/Dashboard";
import CourseForm from "./pages/Form/CourseForm";
import Course from "./components/Tables/Course";

function App() {
  const isLogIn = useRecoilValue(isLoggedIn);
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (!isLogIn) {
      navigate("/signin");
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />

        <Route
          index
          element={
            <>
              <PageTitle title="Welcome" />
              <Hero />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard" />
              <Dashboard />
            </>
          }
        />
        
        <Route
          path="/rules"
          element={
            <>
              <PageTitle title="Rules" />
              <Rules />
            </>
          }
        />
        
         <Route
          path="/forms/blog-form"
          element={
            <>
              <PageTitle title="Blog Form" />
              <BlogForm />
            </>
          }
        />
        
        <Route
          path="/blogs"
          element={
            <>
              <PageTitle title="Blogs" />
              <Blog />
            </>
          }
        />

        <Route
          path="/forms/course-form"
          element={
            <>
              <PageTitle title="Course Form" />
              <CourseForm />
            </>
          }
        />
        
        <Route
          path="/courses"
          element={
            <>
              <PageTitle title="Courses" />
              <Course />
            </>
          }
        />
       
        </Routes>
    </>
  );
}

export default App;
