import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Donate from "./pages/Donate";
import Programs from "./pages/Programs";
import Contact from "./pages/Contact";
import TrackDonation from "./pages/TrackDonation";
import Volunteer from "./pages/Volunteer";
import BeneficiaryRegistration from "./pages/BeneficiaryRegistration";
import CauseDetails from "./pages/CauseDetails";
import Blog from "./pages/Blog";
import Financials from "./pages/Financials";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import AdminPrograms from "./pages/admin/AdminPrograms";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminVolunteers from "./pages/admin/AdminVolunteers";
import AdminDonate from "./pages/admin/AdminDonate";
import AdminFinancial from "./pages/admin/AdminFinancial";
import AdminTrustees from "./pages/admin/AdminTrustees";
// Admin Coordinators Panel
import AdminCoordinators from "./pages/admin/AdminCoordinators";
import ProtectedRoute from "./components/ProtectedRoute";
import CursorFollower from "./components/CursorFollower";

const queryClient = new QueryClient();

// ScrollToTop component to handle scroll restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop /> {/* Add ScrollToTop here */}
        <CursorFollower />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/cause/:id" element={<CauseDetails />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<Programs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track-donation" element={<TrackDonation />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/beneficiary-registration" element={<BeneficiaryRegistration />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/programs"
            element={
              <ProtectedRoute>
                <AdminPrograms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <AdminBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/volunteers"
            element={
              <ProtectedRoute>
                <AdminVolunteers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/donate"
            element={
              <ProtectedRoute>
                <AdminDonate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/financial"
            element={
              <ProtectedRoute>
                <AdminFinancial />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/trustees"
            element={
              <ProtectedRoute>
                <AdminTrustees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/coordinators"
            element={
              <ProtectedRoute>
                <AdminCoordinators />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Toastify container */}
        <ToastContainer position="top-right" autoClose={2000} />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;