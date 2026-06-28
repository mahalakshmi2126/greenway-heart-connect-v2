import React from "react";
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
import OurPartners from "@/components/OurPartners";

import MonthlyDonateButton from "@/components/MonthlyDonateButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
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
      <OurPartners />
      <Footer />
      <MonthlyDonateButton />
    </div>
  );
};

export default Index;