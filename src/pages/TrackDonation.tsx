// import React, { useState } from "react";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Search, Clock, CheckCircle, Heart, Calendar, DollarSign } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const TrackDonation = () => {
//   const [step, setStep] = useState(1); // 1: Enter details, 2: OTP, 3: Results
//   const [contact, setContact] = useState("");
//   const [otp, setOtp] = useState("");
//   const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   // Mock donation data
//   const donationHistory = [
//     {
//       id: "DN001234",
//       amount: 250,
//       date: "2024-03-15",
//       cause: "Wheelchair & Mobility Support",
//       status: "completed",
//       method: "Credit Card",
//       impact: "Helped provide mobility aid to 2 families"
//     },
//     {
//       id: "DN001189",
//       amount: 150,
//       date: "2024-02-28",
//       cause: "Children's Education Program",
//       status: "completed",
//       method: "Bank Transfer",
//       impact: "Funded school supplies for 5 children"
//     },
//     {
//       id: "DN001145",
//       amount: 100,
//       date: "2024-01-20",
//       cause: "Healthcare & Medical Aid",
//       status: "processing",
//       method: "Credit Card",
//       impact: "Processing - Medical aid distribution"
//     }
//   ];

//   const handleSendOTP = async () => {
//     if (!contact) {
//       toast({
//         title: "Please enter your contact information",
//         description: "Email or mobile number is required",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       setStep(2);
//       startTimer();
//       toast({
//         title: "OTP Sent Successfully",
//         description: `Verification code sent to ${contact}`,
//       });
//     }, 1500);
//   };

//   const startTimer = () => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           toast({
//             title: "OTP Expired",
//             description: "Please request a new OTP",
//             variant: "destructive"
//           });
//           setStep(1);
//           return 600;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const handleVerifyOTP = async () => {
//     if (!otp || otp.length !== 6) {
//       toast({
//         title: "Invalid OTP",
//         description: "Please enter the 6-digit OTP",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       setStep(3);
//       toast({
//         title: "OTP Verified Successfully",
//         description: "Loading your donation history...",
//       });

//       // Auto redirect after 15 minutes
//       setTimeout(() => {
//         setStep(1);
//         setContact("");
//         setOtp("");
//         toast({
//           title: "Session Expired",
//           description: "Redirecting to home page for security",
//         });
//         window.location.href = "/";
//       }, 15 * 60 * 1000);
//     }, 1500);
//   };

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'completed':
//         return 'bg-green-100 text-green-800';
//       case 'processing':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'failed':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />

//       <section className="section-padding">
//         <div className="container max-w-2xl mx-auto">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
//               Track Your Donation
//             </h1>
//             <p className="text-muted-foreground text-lg">
//               Enter your details to view your donation history and impact
//             </p>
//           </div>

//           {step === 1 && (
//             <Card className="donation-card">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Search className="w-6 h-6 text-primary" />
//                   <span>Enter Your Details</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div>
//                   <Label htmlFor="contact">Email</Label>
//                   <Input
//                     id="contact"
//                     type="text"
//                     placeholder="Enter your email"
//                     value={contact}
//                     onChange={(e) => setContact(e.target.value)}
//                     className="mt-2"
//                   />
//                   <p className="text-sm text-muted-foreground mt-1">
//                     We'll send you a verification code to access your donation history
//                   </p>
//                 </div>

//                 <Button
//                   className="w-full btn-hover"
//                   onClick={handleSendOTP}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Sending..." : "Send OTP"}
//                 </Button>
//               </CardContent>
//             </Card>
//           )}

//           {step === 2 && (
//             <Card className="donation-card">
//               <CardHeader>
//                 <CardTitle className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <Clock className="w-6 h-6 text-primary" />
//                     <span>Enter OTP</span>
//                   </div>
//                   <Badge variant="outline" className="text-accent border-accent">
//                     {formatTime(timeLeft)}
//                   </Badge>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div>
//                   <Label htmlFor="otp">Verification Code</Label>
//                   <Input
//                     id="otp"
//                     type="text"
//                     placeholder="Enter 6-digit OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                     className="mt-2 text-center text-lg tracking-widest"
//                     maxLength={6}
//                   />
//                   <p className="text-sm text-muted-foreground mt-1">
//                     OTP sent to {contact}. Valid for 10 minutes.
//                   </p>
//                 </div>

//                 <div className="flex space-x-4">
//                   <Button
//                     variant="outline"
//                     className="flex-1"
//                     onClick={() => setStep(1)}
//                   >
//                     Back
//                   </Button>
//                   <Button
//                     className="flex-1 btn-hover"
//                     onClick={handleVerifyOTP}
//                     disabled={isLoading || otp.length !== 6}
//                   >
//                     {isLoading ? "Verifying..." : "Verify OTP"}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {step === 3 && (
//             <div className="space-y-6">
//               <Card className="donation-card">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <CheckCircle className="w-6 h-6 text-green-600" />
//                     <span>Your Donation History</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid md:grid-cols-3 gap-4 mb-6">
//                     <div className="text-center p-4 bg-primary-lighter/20 rounded-lg">
//                       <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
//                       <div className="text-2xl font-bold text-primary">
//                         ${donationHistory.reduce((sum, d) => sum + d.amount, 0)}
//                       </div>
//                       <div className="text-sm text-muted-foreground">Total Donated</div>
//                     </div>
//                     <div className="text-center p-4 bg-accent-light/20 rounded-lg">
//                       <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
//                       <div className="text-2xl font-bold text-accent">
//                         {donationHistory.length}
//                       </div>
//                       <div className="text-sm text-muted-foreground">Donations Made</div>
//                     </div>
//                     <div className="text-center p-4 bg-green-100 rounded-lg">
//                       <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
//                       <div className="text-2xl font-bold text-green-600">
//                         {donationHistory.filter(d => d.status === 'completed').length}
//                       </div>
//                       <div className="text-sm text-muted-foreground">Completed</div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     {donationHistory.map((donation) => (
//                       <div key={donation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
//                         <div className="flex justify-between items-start mb-2">
//                           <div>
//                             <div className="font-semibold text-primary">#{donation.id}</div>
//                             <div className="text-sm text-muted-foreground">{donation.cause}</div>
//                           </div>
//                           <Badge className={getStatusColor(donation.status)}>
//                             {donation.status}
//                           </Badge>
//                         </div>

//                         <div className="grid md:grid-cols-3 gap-2 text-sm text-muted-foreground">
//                           <div className="flex items-center space-x-1">
//                             <DollarSign className="w-4 h-4" />
//                             <span>${donation.amount}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <Calendar className="w-4 h-4" />
//                             <span>{donation.date}</span>
//                           </div>
//                           <div>{donation.method}</div>
//                         </div>

//                         <div className="mt-2 text-sm text-accent italic">
//                           Impact: {donation.impact}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <p className="text-center text-sm text-muted-foreground mt-6">
//                     This session will automatically expire in 15 minutes for security
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default TrackDonation;

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Clock,
  CheckCircle,
  Heart,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const TrackDonation = () => {
  const [step, setStep] = useState(1); // 1: Enter details, 2: OTP, 3: Results
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [donationHistory, setDonationHistory] = useState<any[]>([]);

  // Send OTP
  const handleSendOTP = async () => {
    if (!contact) {
      toast({
        title: "Please enter your email",
        description: "Email is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE}/otp/send`, {
        email: contact,
      });

      if (res.data.success) {
        setStep(2);
        startTimer();
        toast({
          title: "OTP Sent Successfully",
          description: `Verification code sent to ${contact}`,
          duration: 2000,
        });
      } else {
        toast({
          title: "Failed to send OTP",
          description: res.data.message || "Try again later",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.error || err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE}/otp/verify`, {
        email: contact,
        code: otp,
      });

      if (res.data.success) {
        setDonationHistory(res.data.donations || []);
        setStep(3);
        toast({
          title: "OTP Verified Successfully",
          description: "Loading your donation history...",
        });

        // Auto logout after 15 mins
        setTimeout(() => {
          setStep(1);
          setContact("");
          setOtp("");
          setDonationHistory([]);
          toast({
            title: "Session Expired",
            description: "Redirecting to home page for security",
          });
          window.location.href = "/";
        }, 15 * 60 * 1000);
      } else {
        toast({
          title: "OTP Verification Failed",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.error || err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Timer
  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "OTP Expired",
            description: "Please request a new OTP",
            variant: "destructive",
          });
          setStep(1);
          return 600;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="section-padding">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Track Your Donation
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your email to view your donation history and impact
            </p>
          </div>

          {/* Step 1: Enter Email */}
          {step === 1 && (
            <Card className="donation-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-6 h-6 text-primary" />
                  <span>Enter Your Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="contact">Email</Label>
                  <Input
                    id="contact"
                    type="text"
                    placeholder="Enter your email"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    We'll send you a verification code to access your donation
                    history
                  </p>
                </div>

                <Button
                  className="w-full btn-hover"
                  onClick={handleSendOTP}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <Card className="donation-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-6 h-6 text-primary" />
                    <span>Enter OTP</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-accent border-accent"
                  >
                    {formatTime(timeLeft)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="mt-2 text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    OTP sent to {contact}. Valid for 10 minutes.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 btn-hover"
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Donation History */}
          {step === 3 && (
            <div className="space-y-6">
              <Card className="donation-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span>Your Donation History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {donationHistory.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      No donations found for this email.
                    </p>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-primary-lighter/20 rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            <div className="w-9 h-8 text-primary mx-auto mb-2">
                              ₹
                            </div>
                            {donationHistory.reduce(
                              (sum, d) => sum + d.totalAmount,
                              0
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total Donated
                          </div>
                        </div>
                        <div className="text-center p-4 bg-accent-light/20 rounded-lg">
                          <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
                          <div className="text-2xl font-bold text-accent">
                            {donationHistory.length}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Donations Made
                          </div>
                        </div>
                        <div className="text-center p-4 bg-green-100 rounded-lg">
                          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-green-600">
                            {
                              donationHistory.filter(
                                (d) => d.status === "completed"
                              ).length
                            }
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Completed
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {donationHistory.map((donation: any) => (
                          <div
                            key={donation.donorName}
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-semibold text-primary">
                                  {donation.donorName}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {donation.cause}
                                </div>
                              </div>
                              <Badge
                                className={getStatusColor(donation.status)}
                              >
                                {donation.status}
                              </Badge>
                            </div>

                            <div className="grid md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4" />
                                <span>₹{donation.totalAmount}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(
                                    donation.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div>{donation.method}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TrackDonation;