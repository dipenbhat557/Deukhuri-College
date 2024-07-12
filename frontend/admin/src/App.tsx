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
import EventForm from "./pages/Form/EventForm";
import Event from "./components/Tables/Event";
import FacultyForm from "./pages/Form/FacultyForm";
import Faculty from "./components/Tables/Faculty";
import MessageForm from "./pages/Form/MessageForm";
import Message from "./components/Tables/Message";
import NoticeForm from "./pages/Form/NoticeForm";
import Publication from "./components/Tables/Publication";
import Notice from "./components/Tables/Notice";
import PublicationForm from "./pages/Form/PublicationForm";
import ResultForm from "./pages/Form/ResultForm";
import Result from "./components/Tables/Result";
import StatuteForm from "./pages/Form/StatuteForm";
import Statute from "./components/Tables/Statute";
import SubscribedForm from "./pages/Form/SubscribedForm";
import Subscribed from "./components/Tables/Subscribed";
import SyllabusForm from "./pages/Form/SyllabusForm";
import Syllabus from "./components/Tables/Syllabus";

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

        <Route
          path="/forms/event-form"
          element={
            <>
              <PageTitle title="Event Form" />
              <EventForm />
            </>
          }
        />
        
        <Route
          path="/events"
          element={
            <>
              <PageTitle title="Events" />
              <Event />
            </>
          }
        />

        <Route
          path="/forms/faculty-form"
          element={
            <>
              <PageTitle title="Faculty Form" />
              <FacultyForm />
            </>
          }
        />
        
        <Route
          path="/faculties"
          element={
            <>
              <PageTitle title="Faculties" />
              <Faculty />
            </>
          }
        />

        <Route
          path="/forms/message-form"
          element={
            <>
              <PageTitle title="Message Form" />
              <MessageForm />
            </>
          }
        />
        
        <Route
          path="/messages"
          element={
            <>
              <PageTitle title="Messages" />
              <Message />
            </>
          }
        />

        <Route
          path="/forms/notice-form"
          element={
            <>
              <PageTitle title="Notice Form" />
              <NoticeForm />
            </>
          }
        />
        
        <Route
          path="/notices"
          element={
            <>
              <PageTitle title="Notices" />
              <Notice />
            </>
          }
        />

        <Route
          path="/forms/publication-form"
          element={
            <>
              <PageTitle title="Publication Form" />
              <PublicationForm />
            </>
          }
        />
        
        <Route
          path="/publications"
          element={
            <>
              <PageTitle title="Publications" />
              <Publication />
            </>
          }
        />

        <Route
          path="/forms/result-form"
          element={
            <>
              <PageTitle title="Result Form" />
              <ResultForm />
            </>
          }
        />
        
        <Route
          path="/results"
          element={
            <>
              <PageTitle title="Results" />
              <Result />
            </>
          }
        />

        <Route
          path="/forms/statute-form"
          element={
            <>
              <PageTitle title="Statute Form" />
              <StatuteForm />
            </>
          }
        />
        
        <Route
          path="/statutes"
          element={
            <>
              <PageTitle title="Statutes" />
              <Statute />
            </>
          }
        />

        <Route
          path="/forms/subscribed-form"
          element={
            <>
              <PageTitle title="Subscribed Form" />
              <SubscribedForm />
            </>
          }
        />
        
        <Route
          path="/subscribed"
          element={
            <>
              <PageTitle title="Subscribed Emails" />
              <Subscribed />
            </>
          }
        />

        <Route
          path="/forms/syllabus-form"
          element={
            <>
              <PageTitle title="Syllabus Form" />
              <SyllabusForm />
            </>
          }
        />
        
        <Route
          path="/syllabus"
          element={
            <>
              <PageTitle title="Syllabuses" />
              <Syllabus />
            </>
          }
        />
       
        </Routes>
    </>
  );
}

export default App;
