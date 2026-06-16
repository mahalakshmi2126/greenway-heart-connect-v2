import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import CausesSection from "@/components/CausesSection";
import LatestDonationsTicker from "@/components/LatestDonationsTicker";
import BlogPreview from "@/components/BlogPreview";
import EventsPreview from "@/components/EventsPreview";
import VolunteerSection from "@/components/VolunteerSection";
import GetInTouchSection from "@/components/GetInTouchSection";
import OurCommunitySection from "@/components/OurCommunitySection";
import Footer from "@/components/Footer";
import MonthlyDonateButton from "@/components/MonthlyDonateButton";

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  console.log("Before remove:", localStorage.getItem("token"));
  localStorage.removeItem("token");
  localStorage.removeItem("adminEmail");
  console.log("After remove:", localStorage.getItem("token"));
  toast.success("Logout successful");
  navigate("/", { replace: true });
};



  return (
    <div className="min-h-screen bg-background">
      <Navigation isAdmin={true} onLogout={handleLogout} />
      <HeroSection />
      <CausesSection />
      <StatsSection />
      <VisionMissionSection />
      <LatestDonationsTicker />
      <BlogPreview />
      <EventsPreview />
      <VolunteerSection />
      <GetInTouchSection />
      <OurCommunitySection />
      <Footer />
      <MonthlyDonateButton />
    </div>
  );
};

export default AdminHome;