import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, ZoomIn, X } from "lucide-react";
import JoinEventDialog from "@/components/JoinEventDialog";
import axios from "axios";
import programsBanner from "@/assets/Photos/Main4.jpg";

const API_BASE = import.meta.env.VITE_API_BASE;

const Programs = () => {
  const [events, setEvents] = useState([]);
  const [corePrograms, setCorePrograms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const categories = [
    "All",
    "Para Sports Development",
    "Medical Support & Rehabilitation Linkages",
    "Vocational Training & Livelihood Support",
    "Community Engagement & Awareness",
    "Environmental Sustainability Initiatives",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, coreProgramsResponse] = await Promise.all([
          axios.get(`${API_BASE}/events/get`),
          axios.get(
            `${API_BASE}/core-programs?category=${selectedCategory === "All" ? "" : encodeURIComponent(selectedCategory)
            }`
          ),
        ]);
        setEvents(eventsResponse.data);
        setCorePrograms(coreProgramsResponse.data);
        console.log("Fetched core programs:", coreProgramsResponse.data);
        console.log("Selected category:", selectedCategory);
      } catch (err) {
        setError("Failed to fetch programs. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-accent text-accent-foreground";
      case "ongoing":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getAvailabilityPercentage = (attendees, max) => {
    return ((max - attendees) / max) * 100;
  };

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "completed");

  const filteredCorePrograms =
    selectedCategory === "All"
      ? corePrograms
      : corePrograms.filter(
        (program) =>
          program.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  const handleEventRegistration = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE}/events/${eventId}/register`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEvents(
        events.map((event) =>
          event._id === eventId
            ? { ...event, attendees: event.attendees + 1 }
            : event
        )
      );
      toast.success("Registered successfully!");
    } catch (err) {
      toast.error("Error registering for event");
      console.error("Error registering for event:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section
        className="hero-section flex items-center relative"
        style={{
          backgroundImage: `url(${programsBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="container relative z-10 text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Programs</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Join our community programs and be part of the positive change we're
              creating together
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Programs Section */}
      <section className="section-padding bg-muted/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Core Programs
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Long-term initiatives we run to empower persons with disabilities
              and protect our environment
            </p>
          </div>

          <section className="py-8 bg-background">
            <div className="container">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="btn-hover"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          <motion.div
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            layout
          >
            {selectedCategory === "Para Sports Development" && (
              <div className="col-span-full mb-8">
                <h3 className="text-2xl font-bold text-center mb-8 text-primary border-b-2 border-primary w-max mx-auto pb-2">
                  Training Locations (Temporary)
                </h3>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Gudiyatham Center */}
                  <div className="bg-card rounded-xl shadow-lg p-6 border text-center transition-transform hover:scale-[1.02] duration-300">
                    <h4 className="text-xl font-bold text-[#008080] mb-2">
                      Gudiyatham
                    </h4>
                    <p className="font-semibold mb-4 text-[17px]">
                      Sri Abiraami Arts & Science College for Women
                    </p>
                    <div className="mb-4 text-muted-foreground text-sm">
                      <p className="font-bold text-foreground text-[17px] mb-1">Address:</p>
                      <p className="text-base">Kilalathur, Gudiyatham,</p>
                      <p className="text-base">Tamil Nadu, India</p>
                    </div>
                    <div className="w-full h-48 rounded-lg overflow-hidden border">
                      <iframe
                        src="https://maps.google.com/maps?q=Sri+Abirami+Arts+and+Science+College+for+Women+Gudiyatham&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>

                  {/* Karigiri Center */}
                  <div className="bg-card rounded-xl shadow-lg p-6 border text-center transition-transform hover:scale-[1.02] duration-300">
                    <h4 className="text-xl font-bold text-[#008080] mb-2">
                      Karigiri, Vellore
                    </h4>
                    <p className="font-semibold mb-4 text-[17px]">
                      Schieffelin Institute of Health Research and Leprosy Centre
                    </p>
                    <div className="mb-4 text-muted-foreground text-sm">
                      <p className="font-bold text-foreground text-[17px] mb-1">Address:</p>
                      <p className="text-base">S.L.R. & T.C, Karigiri,</p>
                      <p className="text-base">Vellore, Tamil Nadu 632106</p>
                    </div>
                    <div className="w-full h-48 rounded-lg overflow-hidden border">
                      <iframe
                        src="https://maps.google.com/maps?q=Schieffelin+Institute+of+Health+Research+and+Leprosy+Centre+Karigiri&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>

                  {/* Katpadi Center */}
                  <div className="bg-card rounded-xl shadow-lg p-6 border text-center transition-transform hover:scale-[1.02] duration-300">
                    <h4 className="text-xl font-bold text-[#008080] mb-2">
                      Katpadi, Vellore
                    </h4>
                    <p className="font-semibold mb-4 text-[17px]">
                      Sports Development Authority of Tamil Nadu
                    </p>
                    <div className="mb-4 text-muted-foreground text-sm">
                      <p className="font-bold text-foreground text-[17px] mb-1">Address:</p>
                      <p className="text-base">Katpadi, Vellore,</p>
                      <p className="text-base">Tamil Nadu, India</p>
                    </div>
                    <div className="w-full h-48 rounded-lg overflow-hidden border">
                      <iframe
                        src="https://maps.google.com/maps?q=Sports+Development+Authority+of+Tamil+Nadu+Katpadi+Vellore&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>

                  {/* Bagayam Center */}
                  <div className="bg-card rounded-xl shadow-lg p-6 border text-center transition-transform hover:scale-[1.02] duration-300">
                    <h4 className="text-xl font-bold text-[#008080] mb-2">
                      Bagayam, Vellore
                    </h4>
                    <p className="font-semibold mb-4 text-[17px]">
                      Dr. Mary Verghese Institute of Rehabilitation
                    </p>
                    <div className="mb-4 text-muted-foreground text-sm">
                      <p className="font-bold text-foreground text-[17px] mb-1">Address:</p>
                      <p className="text-base">Bagayam, Vellore,</p>
                      <p className="text-base">Tamil Nadu 632002</p>
                    </div>
                    <div className="w-full h-48 rounded-lg overflow-hidden border">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4727711920705!2d79.1322459748396!3d12.877292987429465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad396ad9365f65%3A0x3d8b80e74bf7dd32!2sRehabilitation%20Institute!5e0!3m2!1sen!2sus!4v1770712086990!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                  <h4 className="font-bold text-primary mb-1">Disclaimer:</h4>
                  <p className="text-sm text-muted-foreground italic">
                    Training venues are utilized on a temporary and need-based basis, subject to availability and prior permission from the respective institutions.
                  </p>
                </div>
              </div>
            )}
            <AnimatePresence>
              {filteredCorePrograms.length > 0 ? (
                filteredCorePrograms.map((program, index) => (
                  <motion.div
                    key={program._id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
                    onClick={() => setSelectedProgram(program)}
                  >
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <Badge className="mb-2">{program.category}</Badge>
                        {/* <h3 className="text-white font-semibold text-sm mb-1">
                          {program.title}
                        </h3> */}
                        <p className="text-white/80 text-xs line-clamp-2">
                          {program.description}
                        </p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                !(selectedCategory === "Para Sports Development") && (
                  <div className="text-center py-12 col-span-4">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      No core programs found
                    </h3>
                    <p className="text-muted-foreground">
                      Try selecting a different category.
                    </p>
                  </div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Program Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-background rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedProgram.image}
                alt={selectedProgram.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />

              <div className="p-6">
                <Badge className="mb-2">{selectedProgram.category}</Badge>
                {/* <h3 className="text-xl font-bold text-primary mb-2">
                  {selectedProgram.title}
                </h3> */}
                <p className="text-muted-foreground">
                  {selectedProgram.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upcoming Events */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't miss out on these exciting opportunities to make a difference
              in your community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Card key={event._id} className="donation-card overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status.charAt(0).toUpperCase() +
                          event.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="outline"
                        className="bg-background/80 text-xs"
                      >
                        {event.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-primary line-clamp-2">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      {/* <div className="flex items-center space-x-2 text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>
                          {event.attendees}/{event.maxAttendees} registered
                        </span>
                      </div> */}
                    </div>

                    {/* <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Availability</span>
                        <span>
                          {Math.round(
                            getAvailabilityPercentage(
                              event.attendees,
                              event.maxAttendees
                            )
                          )}
                          % available
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-accent h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${getAvailabilityPercentage(
                              event.attendees,
                              event.maxAttendees
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div> */}
                  </CardContent>

                  {/* <CardFooter>
                    <JoinEventDialog
                      eventId={event._id}
                      eventTitle={event.title}
                      onRegister={() => handleEventRegistration(event._id)}
                    />
                  </CardFooter> */}
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground col-span-3">
                No upcoming events available.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Past Events
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See the impact we've made through our community programs and
              celebrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <Card
                  key={event._id}
                  className="donation-card overflow-hidden opacity-80"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getStatusColor(event.status)}>
                        Completed
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-primary line-clamp-2">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      {/* <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attended</span>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground col-span-3">
                No past events available.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;