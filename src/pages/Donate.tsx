import React, { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Heart,
  Users,
  GraduationCap,
  Stethoscope,
  Utensils,
  CreditCard,
  Award,
  Copy,
  CheckCircle2,
  QrCode,
  Building2,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import wheelchairSupport from "@/assets/Photos/Main4.jpg";
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
import about from "@/assets/about.jpg";
import photoParaSports from "../assets/Photos/Donation/Promotion Para Sports.jpg";
import photoHealthCare from "../assets/Photos/Donation/Health Care.jpeg";
import photoEducation from "../assets/Photos/Donation/Education & Learning.jpg";
import photoLivelihood from "../assets/Photos/Donation/Environment.jpg";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const Donate = () => {
  const navigate = useNavigate();
  const [customAmount, setCustomAmount] = useState("");
  const [customDonor, setCustomDonor] = useState({
    name: "",
    phone: "",
    email: "",
    pan: "",
    address: "",
    purpose: "",
  });

  const [monthlySubscription, setMonthlySubscription] = useState({
    category: "",
    amount: 0,
    name: "",
    phone: "",
    email: "",
  });

  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentTab, setPaymentTab] = useState("qr");
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");

  const donationCategories = [
    {
      id: 1,
      title: "Promotion of Para Sports",
      catImage: photoParaSports,
      items: [
        {
          id: 1,
          name: "Sports Wheelchair",
          price: 15000,
          image: wheelchairSupports,
          description: "Specialized wheelchair for para sports athletes",
        },
        {
          id: 2,
          name: "Sports Kit",
          price: 5000,
          image: uniformset,
          description: "Jerseys and equipment for para athletes",
        },
        {
          id: 3,
          name: "Training Support",
          price: 2000,
          image: Healthcheckup, // Using a generic health/active image placeholder
          description: "Sponsorship for one month of athletic training",
        },
      ],
      icon: Award, // Changed from canned icons - need to import Award
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Health Care & Rehabilitation",
      catImage: photoHealthCare,
      items: [
        {
          id: 4,
          name: "Electric Wheelchair",
          price: 25000,
          image: electricWheelchair,
          description: "Motorized wheelchair for enhanced mobility",
        },
        {
          id: 5,
          name: "Walking Stick",
          price: 500,
          image: walkingStick,
          description: "Adjustable walking support stick",
        },
        {
          id: 6,
          name: "Walker",
          price: 2000,
          image: walker,
          description: "Four-wheeled mobility walker",
        },
        {
          id: 7,
          name: "Surgery Support",
          price: 50000,
          image: surgerysupport,
          description: "Support for major medical procedures",
        },
        {
          id: 8,
          name: "Medicine Kit",
          price: 2000,
          image: medicinekit,
          description: "Basic medicine package for one family",
        },
      ],
      icon: Stethoscope,
      color: "bg-red-500",
    },
    {
      id: 3,
      title: "Education & Inclusive Learning",
      catImage: photoEducation,
      items: [
        {
          id: 9,
          name: "School Kit",
          price: 1500,
          image: schoolkit,
          description: "Complete school supplies for one child",
        },
        {
          id: 10,
          name: "Monthly Scholarship",
          price: 3000,
          image: monthlyScholarship,
          description: "Monthly education support for one child",
        },
        {
          id: 11,
          name: "Books & Stationery",
          price: 1200,
          image: booksStationary,
          description: "Textbooks and writing materials",
        },
      ],
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Skill Development & Livelihood Training",
      catImage: photoLivelihood,
      items: [
        {
          id: 12,
          name: "Vocational Training",
          price: 5000,
          image: communitykitchensupport, // Reusing appropriate image
          description: "Skill development course for one person",
        },
        {
          id: 13,
          name: "Self-Employment Kit",
          price: 10000,
          image: nutritionkit, // Reusing logical image
          description: "Tools and resources to start small business",
        },
      ],
      icon: Users,
      color: "bg-orange-500",
    },
    {
      id: 5,
      title: "Environmental Sustainability Initiatives",
      catImage: photoLivelihood,
      items: [
        {
          id: 14,
          name: "Tree Sapling",
          price: 100,
          image: about,
          description: "Plant a tree for a greener future",
        },
        {
          id: 15,
          name: "Green Drive Support",
          price: 1000,
          image: about,
          description: "Support our environmental awareness camps",
        },
      ],
      icon: Heart,
      color: "bg-emerald-500",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    donationCategories[0]
  );
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const presetAmounts = [1000, 5000, 10000, 20000];

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const handlePayment = async ({
    amount,
    donor,
    isMonthly = false,
    category = "",
  }) => {
    console.log("Initiating Payment:", { amount, donor });
    const amountNum = Number(amount);
    if (!amountNum || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!donor?.name || !donor?.email || !donor?.phone) {
      toast.error("Please fill all donor details");
      return;
    }
    if (!/^\d{10}$/.test(donor.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    if (!isValidEmail(donor.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      // Call backend to generate dynamic QR
      const res = await axios.post(`${API_BASE}/qr/generate-qr`, {
        amount,
        currency: "INR",
        donorName: donor?.name || "Anonymous",
        donorEmail: donor?.email || "",
        donorPhone: donor?.phone || "",
        cause: category || "General Donation"
      });

      if (res.data.success) {
        setQrData(res.data); // Inga dhaan qrImage and bankDetails varum
        setPaymentDetails({ amount, donor, isMonthly, category });
        setShowQR(true);
        toast.success("Please scan the QR to complete payment 🙏");
      } else {
        toast.error("Failed to generate QR");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error generating QR");
    }
  };

  const handleDownloadReceipt = () => {
    try {
      let currentId = parseInt(localStorage.getItem('gwt_donation_receipt_counter') || '0', 10);
      currentId += 1;
      localStorage.setItem('gwt_donation_receipt_counter', currentId.toString());

      const receiptHtml = `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Donation Receipt</title>
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
              h1 { color: #22c55e; text-align: center; margin-bottom: 5px; font-size: 28px; }
              h3 { text-align: center; color: #666; margin-top: 0; font-weight: normal; }
              .content { max-width: 600px; margin: 0 auto; border: 2px solid #eee; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
              .row { display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #f9f9f9; }
              .header-row { margin-bottom: 30px; border: none; font-size: 14px; color: #555; }
              .footer { text-align: center; margin-top: 50px; font-size: 13px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
              .bold { font-weight: bold; color: #444; }
              .amount { font-size: 22px; font-weight: bold; color: #22c55e; }
              @media print {
                @page { margin: 20mm; }
                html, body { height: max-content; overflow: hidden; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .content { border: none; box-shadow: none; padding: 0; }
              }
            </style>
          </head>
          <body>
            <div class="content">
              <h1>GreenWay Trust</h1>
              <h3>Official Donation Receipt</h3>
              
              <div class="row header-row">
                <div><span class="bold">Receipt No:</span> GWT-${currentId}</div>
                <div><span class="bold">Date:</span> ${new Date().toLocaleDateString()}</div>
              </div>

              <div class="row flex-col">
                <span style="font-size: 12px; color: #888; text-transform: uppercase; font-weight: bold; margin-bottom: 15px; display: block;">Donor Details</span>
              </div>

              <div class="row">
                <span class="bold">Donor Name:</span>
                <span>${paymentDetails?.donor?.name || 'Anonymous'}</span>
              </div>
              <div class="row">
                <span class="bold">Email ID:</span>
                <span>${paymentDetails?.donor?.email || 'N/A'}</span>
              </div>
              <div class="row">
                <span class="bold">Phone Number:</span>
                <span>${paymentDetails?.donor?.phone || 'N/A'}</span>
              </div>
              
               <div class="row flex-col" style="margin-top: 25px;">
                <span style="font-size: 12px; color: #888; text-transform: uppercase; font-weight: bold; margin-bottom: 15px; display: block;">Donation Details</span>
              </div>

              <div class="row">
                <span class="bold">Transaction Ref (UTR):</span>
                <span>${utrNumber || 'N/A'}</span>
              </div>
              <div class="row">
                <span class="bold">Purpose of Donation:</span>
                <span>${paymentDetails?.category || 'General Donation'}</span>
              </div>
              <div class="row" style="border: none; margin-top: 10px;">
                <span class="bold" style="line-height: 28px;">Amount Donated:</span>
                <span class="amount">₹${paymentDetails?.amount || 0}</span>
              </div>

              <div class="footer">
                <p>Thank you for your generous contribution!</p>
                <p>This is an auto-generated provisional receipt.</p>
              </div>
            </div>
            <script>
              window.onload = () => { 
                document.title = "Receipt_${paymentDetails?.donor?.name || 'Donation'}";
                window.print();
              }
            </script>
          </body>
        </html>
      `;

      const blob = new Blob([receiptHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      toast.success("Receipt generated successfully!");
    } catch (error) {
      console.error("Receipt generation failed:", error);
      toast.error("Failed to generate receipt");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section
        className="hero-section flex items-center relative"
        style={{
          backgroundImage: `url(${wheelchairSupport})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="container relative z-10 text-center text-primary-foreground">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Make a Donation
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose what matters most to you and help us create positive change
            in our community
          </motion.p>
        </div>
      </section>

      {/* Category Selection */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Choose Your Donation Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a category to see specific items and their impact
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10 max-w-7xl mx-auto">
            {donationCategories.map((category) => {
              const isSelected = selectedCategory.id === category.id;
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-4 h-32 md:h-40 ${isSelected ? "border-primary shadow-xl scale-100" : "border-transparent hover:scale-105 opacity-90 hover:opacity-100"
                    }`}
                >
                  <img src={category.catImage} alt={category.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className={`absolute inset-0 flex flex-col items-center justify-center p-3 text-center transition-colors duration-300 ${isSelected ? "bg-primary/70" : "bg-black/60 group-hover:bg-primary/50"}`}>
                    <span className="text-white font-bold text-sm md:text-base leading-snug drop-shadow-lg">
                      {category.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Items Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {selectedCategory.items.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {hoveredItem === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-primary/90 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button asChild variant="secondary">
                        <Link
                          to={`/cause/${item.id}?price=${item.price
                            }&name=${encodeURIComponent(item.name)}`}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          Donate Now
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <Badge className="text-lg font-semibold">
                    ₹{item.price.toLocaleString()}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Custom Donation Form */}
      <section className="section-padding bg-muted/20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Custom Amount */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Donation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="number"
                  placeholder="Enter amount (₹)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
                <Input
                  placeholder="Your Name"
                  value={customDonor.name}
                  onChange={(e) =>
                    setCustomDonor({ ...customDonor, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Phone Number"
                  value={customDonor.phone}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    if (onlyNums.length <= 10) {
                      setCustomDonor({ ...customDonor, phone: onlyNums });
                    }
                  }}
                />
                <Input
                  placeholder="Email Id"
                  type="email"
                  value={customDonor.email}
                  onChange={(e) =>
                    setCustomDonor({ ...customDonor, email: e.target.value })
                  }
                />
                <Input
                  placeholder="PAN No."
                  value={customDonor.pan}
                  onChange={(e) =>
                    setCustomDonor({ ...customDonor, pan: e.target.value.toUpperCase() })
                  }
                />
                <Input
                  placeholder="Address"
                  value={customDonor.address}
                  onChange={(e) =>
                    setCustomDonor({ ...customDonor, address: e.target.value })
                  }
                />
                <div>
                  <Label>Select Category</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {["Para Sports", "Health Care", "Livelihood", "Education", "Environment"].map(
                      (cat) => (
                        <Button
                          key={cat}
                          variant={
                            customDonor.purpose === cat
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setCustomDonor({ ...customDonor, purpose: cat })
                          }
                        >
                          {cat}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() =>
                    handlePayment({
                      amount: Number(customAmount),
                      donor: customDonor,
                      isMonthly: false,
                      category: customDonor.purpose || "Custom Donation",
                    })
                  }
                  disabled={
                    !customAmount ||
                    Number(customAmount) <= 0 ||
                    !customDonor.name ||
                    !customDonor.phone ||
                    customDonor.phone.length !== 10 ||
                    !isValidEmail(customDonor.email) ||
                    !customDonor.pan ||
                    !customDonor.address ||
                    !customDonor.purpose
                  }
                >
                  <Heart className="w-4 h-4 mr-2" /> Donate ₹
                  {customAmount || "0"}
                </Button>
              </CardContent>
            </Card>

            {/* Monthly Subscriptions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
                  Monthly Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Category</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Para Sports", "Health Care", "Livelihood", "Education", "Environment"].map(
                      (cat) => (
                        <Button
                          key={cat}
                          variant={
                            monthlySubscription.category === cat
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setMonthlySubscription((prev) => ({
                              ...prev,
                              category: cat,
                            }))
                          }
                        >
                          {cat}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <Label>Preset Amounts</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={
                          monthlySubscription.amount === amount
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setMonthlySubscription((prev) => ({
                            ...prev,
                            amount,
                          }))
                        }
                      >
                        ₹{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Input
                    placeholder="Your Name"
                    value={monthlySubscription.name}
                    onChange={(e) =>
                      setMonthlySubscription((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="Phone Number"
                    value={monthlySubscription.phone}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      if (onlyNums.length <= 10) {
                        setMonthlySubscription((prev) => ({
                          ...prev,
                          phone: onlyNums,
                        }));
                      }
                    }}
                  />
                  <Input
                    placeholder="Email Address"
                    type="email"
                    value={monthlySubscription.email}
                    onChange={(e) =>
                      setMonthlySubscription((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button
                  className="w-full btn-hover"
                  onClick={() =>
                    handlePayment({
                      amount: monthlySubscription.amount,
                      donor: monthlySubscription,
                      isMonthly: true,
                      category: monthlySubscription.category,
                    })
                  }
                  disabled={
                    !monthlySubscription.amount ||
                    !monthlySubscription.name ||
                    !monthlySubscription.phone ||
                    monthlySubscription.phone.length !== 10 ||
                    !isValidEmail(monthlySubscription.email)
                  }
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Subscribe ₹
                  {monthlySubscription.amount.toLocaleString() || "0"}/month
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* QR Payment Dialog */}
      <Dialog open={showQR} onOpenChange={(open) => {
        setShowQR(open);
        if (!open) {
          setIsPaymentVerified(false);
          setUtrNumber("");
        }
      }}>
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
          <div className="p-5 bg-white flex flex-col overflow-y-auto max-h-[50vh] min-h-[300px] flex-1">
            {paymentTab === "qr" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center w-full space-y-4"
              >
                <div className="relative p-1.5 bg-white rounded-2xl shadow-lg border border-slate-100 w-full max-w-[260px] flex items-center justify-center">
                  <img
                    src={qrData?.qrImage}
                    alt="Razorpay QR"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
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
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Account Holder</span>
                      <span className="text-sm font-bold text-slate-800">
                        {qrData?.bankDetails?.accountName || "Greenway Trust"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-200/50 pt-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Bank Name</span>
                        <span className="text-sm font-bold text-slate-700">
                          {qrData?.bankDetails?.bankName || "Bank of Baroda"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">IFSC Code</span>
                        <span className="text-sm font-mono font-bold text-primary">
                          {qrData?.bankDetails?.ifsc || "BARB0AAMBUR"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col border-t border-slate-200/50 pt-4">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Account Number</span>
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
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-6 bg-slate-50 shrink-0 border-t border-slate-100 space-y-3 pb-8">
            {!isPaymentVerified ? (
              <Button
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl shadow-md transition-all"
                onClick={() => setIsPaymentVerified(true)}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                I have completed the payment
              </Button>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-500 font-bold uppercase tracking-wider">UPI Ref / UTR Number</Label>
                  <Input
                    placeholder="Enter 12-digit Reference Number"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="border-primary focus-visible:ring-primary bg-white"
                  />
                  <p className="text-[10px] text-slate-500">Find the 12-digit number (e.g., 301234567890) in your GPay/PhonePe history.</p>
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={utrNumber.length < 10}
                  onClick={handleDownloadReceipt}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Verify & Download Receipt
                </Button>
              </div>
            )}
            <p className="text-[10px] text-center text-slate-400 font-medium italic mt-4">
              Thank you for your generous contribution 🙏
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div >
  );
};

export default Donate;
