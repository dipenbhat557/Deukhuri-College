import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";

import Hero from "./pages/Dashboard/Hero";

import FaqForm from "./pages/Form/FaqForm";
import OurInfo from "./components/Tables/OurInfo";
import CoustomerReview from "./components/Tables/CustomerReview";
import Message from "./components/Tables/Message";
import Faq from "./components/Tables/Faq";
import SignIn from "./pages/Auth/Signin";
import { useRecoilValue } from "recoil";
import { isLoggedIn } from "./pages/store";
import TourForm from "./pages/Form/Tourform";
import TourTable from "./components/Tables/Tour";
import Glimpses from "./components/Tables/Glimpses";
import GlimpsesForm from "./pages/Form/GlimpsesForm";
import Gallery from "./components/Tables/Gallery";
import GalleryForm from "./pages/Form/GalleryForm";
import Images from "./components/Tables/Images";
import ImageForm from "./pages/Form/ImageForm";
import Blog from "./components/Tables/Blog";
import BlogForm from "./pages/Form/BlogForm";
import SocialLinks from "./components/Tables/SocialLinks";
import User from "./components/Tables/User";
import UserForm from "./pages/Form/UserForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import CustomerReviewForm from "./pages/Form/CustomerReviewForm";
import TeamForm from "./pages/Form/TeamForm";
import Team from "./components/Tables/Team";

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
          index
          element={
            <>
              <PageTitle title=" Dashboard" />
              <Hero />
            </>
          }
        />
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
          path="/forms/tour-form"
          element={
            <>
              <PageTitle title="Tour Form" />
              <TourForm />
            </>
          }
        />

        <Route
          path="/forms/faq-form"
          element={
            <>
              <PageTitle title="FAQ Form" />
              <FaqForm />
            </>
          }
        />
        <Route
          path="/our-info"
          element={
            <>
              <PageTitle title="Our Info" />
              <OurInfo />
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
          path="/glimpses"
          element={
            <>
              <PageTitle title="Glimpses" />
              <Glimpses />
            </>
          }
        />
        <Route
          path="/forms/glimpse-form"
          element={
            <>
              <PageTitle title="Glimpses Form" />
              <GlimpsesForm />
            </>
          }
        />
        <Route
          path="/gallery"
          element={
            <>
              <PageTitle title="Gallery" />
              <Gallery />
            </>
          }
        />
        <Route
          path="/forms/gallery-form"
          element={
            <>
              <PageTitle title="Gallery Form" />
              <GalleryForm />
            </>
          }
        />
        <Route
          path="/images"
          element={
            <>
              <PageTitle title="Images" />
              <Images />
            </>
          }
        />
        <Route
          path="/forms/image-form"
          element={
            <>
              <PageTitle title="Image Form" />
              <ImageForm />
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
          path="/forms/blog-form"
          element={
            <>
              <PageTitle title="Blog Form" />
              <BlogForm />
            </>
          }
        />
        <Route
          path="/message-from-md"
          element={
            <>
              <PageTitle title="Message From Md" />
              <Message />
            </>
          }
        />
        <Route
          path="/faq"
          element={
            <>
              <PageTitle title="FAQ" />
              <Faq />
            </>
          }
        />
        <Route
          path="/tour"
          element={
            <>
              <PageTitle title="Tour" />
              <TourTable></TourTable>
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users" />
              <User />
            </>
          }
        />
        <Route
          path="/forms/user-form"
          element={
            <>
              <PageTitle title="User Form" />
              <UserForm />
            </>
          }
        />
        <Route
          path="/links"
          element={
            <>
              <PageTitle title="Social Links" />
              <SocialLinks />
            </>
          }
        />
        <Route
          path="/reviews"
          element={
            <>
              <PageTitle title="Reviews" />
              <CoustomerReview />
            </>
          }
        />
        <Route
          path="/forms/reviews-form"
          element={
            <>
              <PageTitle title="Reviews Form" />
              <CustomerReviewForm />
            </>
          }
        />
        <Route
          path="/forms/team-form"
          element={
            <>
              <PageTitle title="Team Form" />
              <TeamForm />
            </>
          }
        />
        <Route
          path="/team"
          element={
            <>
              <PageTitle title="Team" />
              <Team />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
