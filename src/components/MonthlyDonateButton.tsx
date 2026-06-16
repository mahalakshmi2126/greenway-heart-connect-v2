import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Heart, CreditCard, Copy, CheckCircle2, QrCode, Building2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const MonthlyDonateButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrData, setQrData] = useState(null); // ✅ holds qrImage + upiUrl
  const [paymentTab, setPaymentTab] = useState("qr");

  const [monthlySubscription, setMonthlySubscription] = useState({
    category: "",
    amount: 0,
    name: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate();
  const isAdmin = Boolean(localStorage.getItem("token"));

  const presetAmounts = [1000, 5000, 10000, 20000];
  const categories = ["Education", "Healthcare", "Food", "Mobility"];

  const isValidEmail = (email) => {
    return email.endsWith("@gmail.com") || email.endsWith(".in");
  };

  const handlePayment = async () => {
    const { name, phone, email, amount, category } = monthlySubscription;

    if (!name || !phone || !email || amount <= 0) {
      toast.error("Please fill all details and select amount");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Email must end with @gmail.com or .in");
      return;
    }

    try {
      // ✅ Call backend to generate dynamic QR
      const res = await axios.post(`${API_BASE}/qr/generate-qr`, {
        amount,
        donorName: name,
        donorEmail: email,
        donorPhone: phone,
        cause: category || "Monthly Subscription"
      });

      if (res.data.success) {
        setQrData(res.data); // {upiUrl, qrImage}
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

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed top-1/2 right-0 -translate-y-1/2 z-50"
    >
      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setShowQR(false);
          setQrData(null);
          setPaymentTab("qr");
          setMonthlySubscription({
            category: "",
            amount: 0,
            name: "",
            phone: "",
            email: "",
          });
        }
      }}>
        {isAdmin ? (
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 shadow-lg rounded-l-xl px-4 py-20 flex flex-row gap-2 items-center rotate-180 [writing-mode:vertical-rl] btn-hover"
            onClick={() => navigate("/admin/donate")}
          >
            <Heart className="w-5 h-5 mb-1 -rotate-90" />
            <span className="text-center font-semibold rotate-180">
              Donate Monthly
            </span>
          </Button>
        ) : (
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 shadow-lg rounded-l-xl px-4 py-20 flex flex-row gap-2 items-center rotate-180 [writing-mode:vertical-rl] btn-hover"
            >
              <Heart className="w-5 h-5 mb-1 -rotate-90" />
              <span className="text-center font-semibold rotate-180">
                Donate Monthly
              </span>
            </Button>
          </DialogTrigger>
        )}

        <DialogContent className={`max-w-[340px] p-0 gap-0 overflow-hidden bg-white rounded-[2rem] border-none shadow-2xl flex flex-col ${showQR ? 'max-h-[95vh]' : 'max-h-[90vh] p-6'}`}>
          {!showQR && (
            <h2 className="text-xl font-bold text-center mb-4">
              Monthly Subscription
            </h2>
          )}

          {!showQR ? (
            <>
              {/* Category Selection */}
              <div>
                <Label>Select Category</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {categories.map((cat) => (
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
                  ))}
                </div>
              </div>

              {/* Preset Amounts */}
              <div>
                <Label>Select Amount</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {presetAmounts.map((amt) => (
                    <Button
                      key={amt}
                      variant={
                        monthlySubscription.amount === amt
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setMonthlySubscription((prev) => ({
                          ...prev,
                          amount: amt,
                        }))
                      }
                    >
                      ₹{amt.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Donor Details */}
              <div className="grid grid-cols-1 gap-3 mt-3">
                <Input
                  placeholder="Your Name"
                  value={monthlySubscription.name}
                  onChange={(e) =>
                    setMonthlySubscription((prev) => ({
                      ...prev,
                      name: e.target.value.slice(0, 50),
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
                className="w-full mt-4 btn-hover"
                onClick={handlePayment}
                disabled={
                  !monthlySubscription.name ||
                  !monthlySubscription.phone ||
                  !monthlySubscription.email ||
                  !monthlySubscription.amount ||
                  monthlySubscription.phone.length !== 10 ||
                  !isValidEmail(monthlySubscription.email)
                }
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Subscribe ₹{monthlySubscription.amount || 0}/month
              </Button>
            </>
          ) : (
            <div className="flex flex-col h-full w-full">
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
              <div className="p-5 bg-white flex flex-col">
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
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500 font-medium tracking-tight whitespace-nowrap">Scan using GPay, PhonePe, or Paytm</p>
                    </div>
                    <div className="w-full">
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
                <Button
                  className="w-full bg-primary hover:bg-primary-dark text-white rounded-xl h-12 font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
                  onClick={() => {
                    setShowQR(false);
                    setIsOpen(false);
                    setQrData(null);
                    setMonthlySubscription({ category: "", amount: 0, name: "", phone: "", email: "" });
                    toast.success("Thank you! Admin will verify your subscription soon.");
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default MonthlyDonateButton;