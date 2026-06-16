import React, { useState, useEffect } from "react";
import {
  useParams,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, Heart, Share2, CreditCard, Copy, CheckCircle2, QrCode, Building2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import wheelchairSupport from "@/assets/wheelchair.jpg";
import EnvironmentalProtection from "@/assets/tree.jpg";
import foodNutrition from "@/assets/food.jpg";
import wheelchairSupports from "@/assets/Donate/wc.jpg";
import electricWheelchair from "@/assets/Donate/Ewc.png";
import walkingStick from "@/assets/Donate/WS.webp";
import walker from "@/assets/Donate/Walker.jpg";
import schoolkit from "@/assets/Donate/Scl kit.jpg";
import uniformset from "@/assets/Donate/uniform-set.webp";
import booksStationary from "@/assets/Donate/b & s.png";
import monthlyScholarship from "@/assets/Donate/monthly scholar.png";
import medicinekit from "@/assets/Donate/medicine kit.png";
import Healthcheckup from "@/assets/Donate/health checkup.jpg";
import surgerysupport from "@/assets/Donate/sur sup.webp";
import emergencykit from "@/assets/Donate/Emergency.png";
import monthlyfood from "@/assets/Donate/monthly-food-package.png";
import dailymeal from "@/assets/Donate/Daily meal.webp";
import nutritionkit from "@/assets/Donate/nutrition kit.jpg";
import communitykitchensupport from "@/assets/Donate/cks.jpg";

// Mock API base
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// Unified causes data combining broad causes and donation items
const allCauses = [
  // Broad causes from CausesSection
  {
    id: 101, // Offset IDs to avoid conflict with donation items
    title: "Wheelchair Accessibility Support",
    description:
      "Providing wheelchairs and mobility aids to those in need, ensuring everyone has the freedom of movement.",
    image: wheelchairSupport,
    raised: 45000,
    goal: 60000,
    donors: 234,
    details:
      "Our wheelchair accessibility program provides wheelchairs, training on usage, and home accessibility modifications.",
    category: "Mobility",
  },
  {
    id: 102,
    title: "Environmental Protection",
    description:
      "Promoting sustainable practices through tree plantation, clean-up drives, waste segregation, and creating eco-friendly, accessible green spaces for communities.",
    image: EnvironmentalProtection,
    raised: 32000,
    goal: 50000,
    donors: 178,
    details:
      "Our environmental program supports tree plantation, clean-up drives, and eco-friendly community spaces.",
    category: "Environment",
  },
  {
    id: 103,
    title: "Food & Nutrition Support",
    description:
      "Providing nutritious meals, ration kits, and food assistance to underprivileged families, children, and persons with disabilities.",
    image: foodNutrition,
    raised: 28000,
    goal: 40000,
    donors: 156,
    details:
      "Our food program provides free meals and ration kits to support underprivileged communities.",
    category: "Food",
  },
  // Donation items from Donate
  {
    id: 1,
    title: "Standard Wheelchair",
    description: "Basic mobility wheelchair for daily use",
    image: wheelchairSupports,
    price: 8000,
    raised: 30000,
    goal: 50000,
    donors: 150,
    details:
      "Provides a durable wheelchair for individuals with mobility challenges.",
    category: "Mobility",
  },
  {
    id: 2,
    title: "Electric Wheelchair",
    description: "Motorized wheelchair for enhanced mobility",
    image: electricWheelchair,
    price: 25000,
    raised: 20000,
    goal: 40000,
    donors: 80,
    details: "Offers advanced mobility for those with limited strength.",
    category: "Mobility",
  },
  {
    id: 3,
    title: "Walking Stick",
    description: "Adjustable walking support stick",
    image: walkingStick,
    price: 500,
    raised: 10000,
    goal: 20000,
    donors: 50,
    details: "Lightweight support for safe walking.",
    category: "Mobility",
  },
  {
    id: 4,
    title: "Walker",
    description: "Four-wheeled mobility walker",
    image: walker,
    price: 2000,
    raised: 15000,
    goal: 25000,
    donors: 75,
    details: "Stable support for independent movement.",
    category: "Mobility",
  },
  {
    id: 5,
    title: "School Kit",
    description: "Complete school supplies for one child",
    image: schoolkit,
    price: 1500,
    raised: 20000,
    goal: 30000,
    donors: 100,
    details: "Includes essential supplies to support children's education.",
    category: "Education",
  },
  {
    id: 6,
    title: "Uniform Set",
    description: "School uniform and shoes",
    image: uniformset,
    price: 800,
    raised: 18000,
    goal: 25000,
    donors: 90,
    details: "Ensures children can attend school with dignity.",
    category: "Education",
  },
  {
    id: 7,
    title: "Books & Stationery",
    description: "Textbooks and writing materials",
    image: booksStationary,
    price: 1200,
    raised: 22000,
    goal: 35000,
    donors: 110,
    details: "Provides essential learning resources for students.",
    category: "Education",
  },
  {
    id: 8,
    title: "Monthly Scholarship",
    description: "Monthly education support for one child",
    image: monthlyScholarship,
    price: 3000,
    raised: 25000,
    goal: 40000,
    donors: 130,
    details: "Supports ongoing education for underprivileged children.",
    category: "Education",
  },
  {
    id: 9,
    title: "Medicine Kit",
    description: "Basic medicine package for one family",
    image: medicinekit,
    price: 2000,
    raised: 28000,
    goal: 45000,
    donors: 140,
    details: "Provides essential healthcare supplies for families in need.",
    category: "Healthcare",
  },
  {
    id: 10,
    title: "Health Checkup",
    description: "Comprehensive health examination",
    image: Healthcheckup,
    price: 1500,
    raised: 20000,
    goal: 30000,
    donors: 100,
    details: "Promotes early detection and prevention of medical issues.",
    category: "Healthcare",
  },
  {
    id: 11,
    title: "Surgery Support",
    description: "Support for major medical procedures",
    image: surgerysupport,
    price: 50000,
    raised: 40000,
    goal: 60000,
    donors: 200,
    details: "Funds critical medical procedures for those in need.",
    category: "Healthcare",
  },
  {
    id: 12,
    title: "Emergency Medical Aid",
    description: "Emergency medical assistance",
    image: emergencykit,
    price: 10000,
    raised: 30000,
    goal: 50000,
    donors: 160,
    details: "Provides urgent care in critical situations.",
    category: "Healthcare",
  },
  {
    id: 13,
    title: "Monthly Food Package",
    description: "Monthly food supplies for one family",
    image: monthlyfood,
    price: 2500,
    raised: 28000,
    goal: 40000,
    donors: 156,
    details: "Ensures families have access to nutritious food.",
    category: "Food",
  },
  {
    id: 14,
    title: "Daily Meal",
    description: "One nutritious meal",
    image: dailymeal,
    price: 100,
    raised: 15000,
    goal: 20000,
    donors: 80,
    details: "Provides immediate food assistance to those in need.",
    category: "Food",
  },
  {
    id: 15,
    title: "Nutrition Kit",
    description: "Special nutrition supplements",
    image: nutritionkit,
    price: 800,
    raised: 18000,
    goal: 25000,
    donors: 90,
    details: "Provides specialized supplements for health and growth.",
    category: "Food",
  },
  {
    id: 16,
    title: "Community Kitchen Support",
    description: "Support community cooking facility",
    image: communitykitchensupport,
    price: 5000,
    raised: 32000,
    goal: 50000,
    donors: 178,
    details: "Funds meals for entire communities.",
    category: "Food",
  },
];

const CauseDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const causeId = id || searchParams.get("cause") || "101";
  const initialPrice = Number(searchParams.get("price")) || 1000;
  const initialName = searchParams.get("name") || "";

  const [donationForm, setDonationForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceDate: "",
    instagram: "",
    parcelName: initialName || "",
    count: 1,
    amount: initialPrice,
  });

  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentTab, setPaymentTab] = useState("qr");

  // Find the selected cause/item
  const cause = allCauses.find((c) => c.id === parseInt(causeId)) || {
    id: 101,
    title: "Default Cause",
    image: wheelchairSupport,
    description: "No description available.",
    raised: 0,
    goal: 0,
    donors: 0,
    details: "No details available.",
    category: "General",
  };

  // Set parcelName to cause.title if empty
  useEffect(() => {
    if (!donationForm.parcelName && cause.title) {
      setDonationForm((prev) => ({ ...prev, parcelName: cause.title }));
    }
  }, [cause]);

  // Filter recommended causes (same category, exclude current)
  const recommendedCauses = allCauses
    .filter((c) => c.category === cause.category && c.id !== cause.id)
    .slice(0, 3);

  const [recentDonors, setRecentDonors] = useState([]);

  useEffect(() => {
    const fetchRecentDonors = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/donations/latest`);
        // Check if data.donors exists (based on your backend response structure)
        const donorsList = data.success ? data.donations : [];
        setRecentDonors(donorsList);
      } catch (err) {
        console.error("Error fetching recent donors:", err);
        // Toast remove pannidunga, user-ku disturbance-ah irukkum
      }
    };
    fetchRecentDonors();
  }, []);

  const handleFormChange = (field, value) => {
    setDonationForm((prev) => ({
      ...prev,
      [field]: field === "count" || field === "amount" ? Number(value) : value,
    }));
  };

  const handleDonate = async () => {
    console.log("Initiating Donation:", { donationForm, cause });

    const totalAmount = donationForm.count * donationForm.amount;

    // Validation
    if (!donationForm.name.trim()) {
      toast.error("Donor name is required");
      return;
    }
    if (donationForm.name.length > 50) {
      toast.error("Donor name cannot exceed 50 characters");
      return;
    }
    if (!donationForm.email.trim()) {
      toast.error("Email is required");
      return;
    }
    const emailRegex = /^[\w.-]+@(gmail\.com|[\w.-]+\.in)$/;
    if (!emailRegex.test(donationForm.email)) {
      toast.error("Email must end with @gmail.com or .in");
      return;
    }
    if (!donationForm.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(donationForm.phone)) {
      toast.error("Phone number must be 10 digits only");
      return;
    }
    if (!donationForm.serviceDate) {
      toast.error("Service date is required");
      return;
    }
    if (!donationForm.parcelName.trim()) {
      toast.error("Parcel name is required");
      return;
    }
    if (donationForm.count < 1) {
      toast.error("Count must be at least 1");
      return;
    }
    if (donationForm.amount < 100) {
      toast.error("Amount per item must be at least ₹100");
      return;
    }
    if (!cause?.title) {
      toast.error("Cause title is required");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/qr/generate-qr`, {
        amount: totalAmount,
        donorName: donationForm.name,
        cause: cause.title,
        donorEmail: donationForm.email
      });

      if (res.data.success) {
        setQrData(res.data); // Inga dhaan qrImage and bankDetails varum
        setPaymentDetails({ totalAmount, donationForm, cause });
        setShowQR(true);
        toast.success("Please scan the QR to complete payment 🙏");
      }
    } catch (err) {
      toast.error("Error generating QR");
    }
  };

  const handleShareCause = async () => {
    const shareUrl = `${window.location.origin}/cause/${cause.id}`;
    const shareText = `Support ${cause.title}! ${cause.description} Donate now at ${shareUrl}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: cause.title,
          text: shareText,
          url: shareUrl,
        });
        toast.success("Cause shared successfully!");
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard! Share it with your friends.");
      }
    } catch (err) {
      console.error("Share Error:", err);
      toast.error("Failed to share cause. Please try again.");
    }
  };

  const progressPercentage = Math.min((cause.raised / cause.goal) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/donate"
              className="inline-flex items-center text-primary hover:text-primary-light mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Donate
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Side - Cause Details */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">
                      {cause.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Category: {cause.category}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                      <img
                        src={cause.image}
                        alt={`Image representing ${cause.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Raised
                        </span>
                        <span className="font-semibold">
                          ₹{cause.raised.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Goal
                        </span>
                        <span className="font-semibold">
                          ₹{cause.goal.toLocaleString()}
                        </span>
                      </div>
                      <div
                        className="w-full bg-muted rounded-full h-3"
                        role="progressbar"
                        aria-valuenow={progressPercentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="bg-accent h-3 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {cause.donors} donors
                        </span>
                        <span className="text-sm font-medium">
                          {progressPercentage.toFixed(0)}% funded
                        </span>
                      </div>
                      <Button
                        onClick={handleShareCause}
                        className="w-full btn-hover mt-4"
                        variant="outline"
                        aria-label={`Share ${cause.title}`}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share This Cause
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{cause.details}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Center - Donation Form */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-center">
                      <Heart className="w-6 h-6 mx-auto mb-2 text-accent" />
                      Donate For {cause.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Donor Name *</Label>
                      <Input
                        id="name"
                        value={donationForm.name}
                        onChange={(e) =>
                          handleFormChange("name", e.target.value)
                        }
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={donationForm.email}
                        onChange={(e) =>
                          handleFormChange("email", e.target.value)
                        }
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={donationForm.phone}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^[0-9]*$/.test(value) && value.length <= 10) {
                            handleFormChange("phone", value);
                          }
                        }}
                        placeholder="Enter your phone number"
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceDate">Service Date *</Label>
                      <Input
                        id="serviceDate"
                        type="date"
                        value={donationForm.serviceDate}
                        onChange={(e) =>
                          handleFormChange("serviceDate", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram ID (Optional)</Label>
                      <Input
                        id="instagram"
                        value={donationForm.instagram}
                        onChange={(e) =>
                          handleFormChange("instagram", e.target.value)
                        }
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parcelName">Name of Parcel *</Label>
                      <Input
                        id="parcelName"
                        value={donationForm.parcelName}
                        onChange={(e) =>
                          handleFormChange("parcelName", e.target.value)
                        }
                        placeholder="e.g., Wheelchair, Ration Kit"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="count">Count *</Label>
                        <Input
                          id="count"
                          type="number"
                          min="1"
                          value={donationForm.count}
                          onChange={(e) =>
                            handleFormChange("count", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="amount">Amount per item (₹) *</Label>
                        <Input
                          id="amount"
                          type="number"
                          min="100"
                          value={donationForm.amount}
                          onChange={(e) =>
                            handleFormChange("amount", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <div className="text-sm text-muted-foreground">
                        Total Donation
                      </div>
                      <div className="text-2xl font-bold text-accent">
                        ₹
                        {(
                          donationForm.count * donationForm.amount
                        ).toLocaleString()}
                      </div>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDonate();
                      }}
                      className="w-full btn-hover"
                      disabled={
                        !donationForm.name.trim() ||
                        donationForm.name.length > 50 ||
                        !donationForm.email.trim() ||
                        !/^[\w.-]+@(gmail\.com|[\w.-]+\.in)$/.test(donationForm.email) ||
                        !donationForm.phone.trim() ||
                        !/^[0-9]{10}$/.test(donationForm.phone) ||
                        !donationForm.serviceDate ||
                        !donationForm.parcelName.trim() ||
                        donationForm.count < 1 ||
                        donationForm.amount < 100 ||
                        !cause?.title
                      }
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Donate Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right Side - Recommended & Recent */}
              <motion.div
                className="lg:col-span-1 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Recommended Causes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {recommendedCauses.map((recCause) => (
                        <Link
                          key={recCause.id}
                          to={`/cause/${recCause.id}`}
                          className="block"
                        >
                          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <img
                              src={recCause.image}
                              alt={`Image representing ${recCause.title}`}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm line-clamp-2">
                                {recCause.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                ₹{recCause.raised.toLocaleString()} raised
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="text-center mt-4">
                      <Link
                        to="/donate"
                        className="text-primary hover:text-primary-light text-sm"
                      >
                        View All Causes →
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Donors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {recentDonors.map((donor, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm font-medium">
                            {donor.donorName}
                          </span>
                          <span className="text-sm text-accent font-semibold">
                            ₹{donor.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* QR Payment Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="max-w-[340px] p-0 gap-0 overflow-hidden bg-white rounded-[2rem] border-none shadow-2xl flex flex-col max-h-[95vh]">

          {/* Navigation Tabs */}
          <div className="flex w-full bg-slate-50 p-1.5 shrink-0 border-b border-slate-100">
            <button
              onClick={() => setPaymentTab("qr")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${paymentTab === 'qr' ? 'bg-white shadow-md text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <QrCode className="w-3.5 h-3.5" />
              Scan QR
            </button>
            <button
              onClick={() => setPaymentTab("bank")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${paymentTab === 'bank' ? 'bg-white shadow-md text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Bank Transfer
            </button>
          </div>

          {/* Content Area */}
          <div className="p-5 bg-gray-50 flex flex-col">
            {paymentTab === "qr" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center w-full space-y-4"
              >
                <div className="relative p-1.5 bg-gray-100 rounded-2xl shadow-lg border border-slate-100 w-full max-w-[260px] flex items-center justify-center">
                  <img
                    src={qrData?.qrImage}
                    alt="Razorpay QR"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>

                {/* <div className="w-full">
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">UPI ID</span>
                      <span className="text-[11px] font-bold text-slate-700">{qrData?.bankDetails?.upiId || "greenwaytrust50.rzp@icici"}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-primary hover:bg-primary/5"
                      onClick={() => {
                        navigator.clipboard.writeText(qrData?.bankDetails?.upiId || "greenwaytrust50.rzp@icici");
                        toast.success("UPI ID copied!");
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div> */}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full space-y-4 pt-4"
              >
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Account Holder</span>
                      <span className="text-sm font-bold text-slate-800">
                        {qrData?.bankDetails?.accountName || "Greenway Trust"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-200/50 pt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Bank Name</span>
                        <span className="text-xs font-bold text-slate-700">
                          {qrData?.bankDetails?.bankName || "Bank of Baroda"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">IFSC Code</span>
                        <span className="text-xs font-mono font-bold text-primary">
                          {qrData?.bankDetails?.ifsc || "BARB0AAMBUR"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col border-t border-slate-200/50 pt-4">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Account Number</span>
                      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                        <span className="text-lg font-mono font-bold text-slate-800 tracking-wider">
                          {qrData?.bankDetails?.accountNumber || "51680200001365"}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-primary hover:bg-primary/5 rounded-full"
                          onClick={() => {
                            const accNum = qrData?.bankDetails?.accountNumber || "51680200001365";
                            navigator.clipboard.writeText(accNum);
                            toast.success("Account number copied!");
                          }}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                    <p className="text-[10px] text-blue-600 font-medium leading-relaxed italic">
                      Please share the screenshot of your payment to +91 93450 78809 or Instagram for official receipt.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-6 bg-slate-50 shrink-0 border-t border-slate-100 space-y-3 pb-8">
            <Button
              className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl h-12 font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
              onClick={() => {
                setShowQR(false);
                setQrData(null);
                setPaymentDetails(null);
                toast.success("Thank you! Admin will verify your payment soon.");
                navigate("/");
              }}
            >
              <CheckCircle2 className="w-4 h-4" />
              I Have Paid Successfully
            </Button>
            <p className="text-[10px] text-center text-slate-400 font-medium italic">
              Thank you for your generous contribution 🙏
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CauseDetails;