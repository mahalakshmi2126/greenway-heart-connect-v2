import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import wheelchairSupport from "@/assets/program.jpg";
import JoinEventDialog from "@/components/JoinEventDialog";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE}/events/get`);
        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events. Please try again later.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

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

  const handleEventRegistration = (eventId) => {
    setEvents(
      events.map((event) =>
        event._id === eventId // Use _id since MongoDB uses _id
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    );
  };

  // if (loading) {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

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
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="container relative z-10 text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} 
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Events</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Join our community events and be part of the positive change we're
              creating together
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't miss out on these exciting opportunities to make a
              difference in your community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
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
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>
                        {event.attendees}/{event.maxAttendees} registered
                      </span>
                    </div>
                  </div>

                  {/* Availability indicator */}
                  <div className="space-y-1">
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
                  </div>
                </CardContent>

                <CardFooter>
                  <JoinEventDialog
                    eventId={event._id}
                    eventTitle={event.title}
                    onRegister={handleEventRegistration}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding bg-muted/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Programs
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Long-term initiatives we run to empower persons with disabilities
              and protect our environment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Inclusive Sports Academy",
                desc: "Wheelchair table tennis, sitting volleyball, wheelchair cricket, para-badminton, blind cricket, and more.",
              },
              {
                title: "Livelihood & Skills Training",
                desc: "Courses in embroidery, mehandi, tailoring, mobile servicing, eco-product making (areca plates, cloth bags).",
              },
              {
                title: "Assistive Devices & Rehabilitation",
                desc: "Distribution of wheelchairs, crutches, hearing aids, prosthetics, and other supports.",
              },
              {
                title: "Environmental Safeguard Projects",
                desc: "Tree plantation, plastic-free campaigns, waste segregation awareness, accessible green spaces.",
              },
              {
                title: "Community Advocacy",
                desc: "Accessibility audits, disability rights workshops, environmental law awareness programs.",
              },
            ].map((program, index) => (
              <Card
                key={index}
                className="p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {program.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
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
              See the impact we've made through our community events and
              celebrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
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
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attended</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;