import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Heart, Shield, Award } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import axios from "axios"; // ✅ add axios  

const API_BASE = import.meta.env.VITE_API_BASE;

const Volunteer = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();

  const [registerForm, setRegisterForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    volunteerType: "",
    bloodGroup: ""
  });

  const handleRegister = async () => {
    const {
      name,
      phone,
      email,
      gender,
      dob,
      address,
      city,
      password,
      confirmPassword,
      volunteerType,
      bloodGroup
    } = registerForm;

    // ✅ Check required fields
    if (
      !name ||
      !phone ||
      !email ||
      !gender ||
      !dob ||
      !address ||
      !city ||
      !password ||
      !confirmPassword ||
      !volunteerType ||
      !bloodGroup
    ) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    // ✅ Password mismatch check
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      // ✅ Call backend API
      const res = await axios.post(`${API_BASE}/volunteers/register`, registerForm);

      console.log("Registered Volunteer:", res.data);

      setIsRegistered(true);

      // ✅ Reset form after success
      setRegisterForm({
        name: "",
        phone: "",
        email: "",
        gender: "",
        dob: "",
        address: "",
        city: "",
        password: "",
        confirmPassword: "",
        volunteerType: "",
        bloodGroup: "",
      });

      toast({
        title: "Registration Submitted!",
        description:
          "Your application has been sent to admin for review. You'll be notified once approved.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Become a Volunteer
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our mission to create positive change. Your time, skills, and passion can make a real difference in someone's life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Heart, title: "Make Impact", desc: "Directly help those in need" },
              { icon: Users, title: "Join Community", desc: "Connect with like-minded people" },
              { icon: Award, title: "Gain Experience", desc: "Develop skills and grow personally" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <item.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="section-padding">
        <div className="container max-w-4xl">
          {!isRegistered ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Join Our Volunteer Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={registerForm.name}
                        onChange={(e) =>
                          setRegisterForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={registerForm.phone}
                        onChange={(e) =>
                          setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={registerForm.email}
                        onChange={(e) =>
                          setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select
                        onValueChange={(value) =>
                          setRegisterForm((prev) => ({ ...prev, gender: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bloodGroup">Blood Group *</Label>
                      <Select
                        onValueChange={(value) =>
                          setRegisterForm((prev) => ({ ...prev, bloodGroup: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={registerForm.dob}
                        onChange={(e) =>
                          setRegisterForm((prev) => ({ ...prev, dob: e.target.value }))
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={registerForm.city}
                        onChange={(e) =>
                          setRegisterForm((prev) => ({ ...prev, city: e.target.value }))
                        }
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        autoComplete="off"
                        value={registerForm.address}
                        onChange={(e) =>
                          setRegisterForm((prev) => ({ ...prev, address: e.target.value }))
                        }
                        placeholder="Enter your complete address"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm((prev) => ({ ...prev, password: e.target.value }))
                        }
                        placeholder="Create a password"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={registerForm.confirmPassword}
                        onChange={(e) =>
                          setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                        }
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="volunteerType">Volunteer Type *</Label>
                      <Select
                        onValueChange={(value) =>
                          setRegisterForm((prev) => ({ ...prev, volunteerType: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select volunteer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Blood Donors">Blood Donors</SelectItem>
                          <SelectItem value="Scribes">Scribes</SelectItem>
                          <SelectItem value="Activity Volunteers">Activity Volunteers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Button onClick={handleRegister} className="w-full btn-hover">
                        <Shield className="w-4 h-4 mr-2" />
                        Register as Volunteer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="text-center">
                <CardContent className="pt-8">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Registration Submitted!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your interest in joining GreenWay Trust. Your application has been sent to our admin team for review. You'll receive a confirmation email once your registration is approved.
                  </p>
                  <Button onClick={() => setIsRegistered(false)} variant="outline">
                    Register Another Volunteer
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Volunteer;