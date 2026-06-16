import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import wheelchairSupport from "@/assets/Photos/Main8.JPG";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Message Sent Successfully! 🎉",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      } else {
        toast({
          title: "Failed to send",
          description: data.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong while sending the message.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section
        className="hero-section flex items-center relative h-[40vh] md:h-[60vh] px-4"
        style={{
          backgroundImage: `url(${wheelchairSupport})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="relative z-10 text-center text-primary-foreground w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl">
              Get in touch with us – we'd love to hear from you and answer any
              questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6 md:space-y-8">
                {[
                  {
                    icon: <MapPin className="w-6 h-6 text-primary" />,
                    title: "Address",
                    text: (
                      <>
                        NO.10, MUNICIPAL COMPLEX
                        <br />
                        NEW BUS STAND, AMBUR
                        <br />
                        THIRUPATTUR DIST - 635 802
                      </>
                    ),
                  },
                  {
                    icon: <Phone className="w-6 h-6 text-primary" />,
                    title: "Phone",
                    text: (
                      <>
                        8317368676
                        <br />
                        9626445845
                      </>
                    ),
                  },
                  {
                    icon: <Mail className="w-6 h-6 text-primary" />,
                    title: "Email",
                    text: (
                      <>
                        General: info@greenwaytrust.org.in
                        <br />
                        Volunteers: volunteer@greenwaytrust.org
                      </>
                    ),
                  },
                  {
                    icon: <Clock className="w-6 h-6 text-primary" />,
                    title: "Office Hours",
                    text: (
                      <>
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </>
                    ),
                  },
                ].map((item, i) => (
                  <Card className="donation-card" key={i}>
                    <CardContent className="p-5 flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base">
                          {item.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <div className="rounded-lg overflow-hidden shadow-md h-48 md:h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14793.126153691494!2d78.71295144522558!3d12.791826050114008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sNO.10%2C%20Municipal%20Complex%2C%20New%20Bus%20Stand%2C%20Ambur%2C%20Tirupattur%2C%20Tamil%20Nadu%20635802!5e1!3m2!1sen!2sin!4v1758282396862!5m2!1sen!2sin"
                    width="600"
                    height="450"
                    style={{ border: 0 }} // ✅ Correct way
                    allowFullScreen // ✅ no need quotes
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-md w-full mx-auto lg:mx-0">
              <Card className="donation-card">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-primary">
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full btn-hover"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
