import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Award,
  Heart,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import wheelchairSupport from "@/assets/Photos/Main3.jpg";
import about from "@/assets/about.jpg";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const About = () => {
  const [currentVolPage, setCurrentVolPage] = useState(0);
  const [coordinatorPage, setCoordinatorPage] = useState(0);

  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 4;

  const [trustees, setTrustees] = useState([]);
  const [loadingTrustees, setLoadingTrustees] = useState(true);

  const [coordinators, setCoordinators] = useState([]);
  const [loadingCoordinators, setLoadingCoordinators] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/volunteers/get`);
        setVolunteers(response.data);
      } catch (err) {
        console.error("Error fetching volunteers:", err);
        setError("Failed to load volunteers");
      } finally {
        setLoading(false);
      }
    };

    const fetchTrustees = async () => {
      try {
        setLoadingTrustees(true);
        const response = await axios.get(`${API_BASE}/trustees`);
        setTrustees(response.data);
      } catch (err) {
        console.error("Error fetching trustees:", err);
      } finally {
        setLoadingTrustees(false);
      }
    };

    const fetchCoordinators = async () => {
      try {
        setLoadingCoordinators(true);
        const response = await axios.get(`${API_BASE}/coordinators`);
        setCoordinators(response.data);
      } catch (err) {
        console.error("Error fetching coordinators:", err);
      } finally {
        setLoadingCoordinators(false);
      }
    };

    fetchVolunteers();
    fetchTrustees();
    fetchCoordinators();
  }, []);

  const volTotalPages = Math.ceil(volunteers.length / itemsPerPage);
  const currentVols = volunteers.slice(
    currentVolPage * itemsPerPage,
    (currentVolPage + 1) * itemsPerPage,
  );



  const handleVolPageChange = (page) => {
    if (page >= 0 && page < volTotalPages) {
      setCurrentVolPage(page);
    }
  };

  const coordinatorTotalPages = Math.ceil(coordinators.length / itemsPerPage);
  const currentCoordinators = coordinators.slice(
    coordinatorPage * itemsPerPage,
    (coordinatorPage + 1) * itemsPerPage,
  );

  const handleCoordinatorPageChange = (page) => {
    if (page >= 0 && page < coordinatorTotalPages) {
      setCoordinatorPage(page);
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
        <div className="absolute inset-0 bg-primary/50"></div>
        <div className="container relative z-10 text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Learn about our mission, meet our team, and discover the impact
              we're making together
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <motion.section
        className="section-padding"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="block">
            {/* Header and First Paragraph Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 pt-2">
                Welcome to GreenWay Trust
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Founded on 27 November 2020, Greenway Trust is a registered
                non-governmental organization led by persons with
                disabilities. We work to create sustainable and inclusive
                opportunities that support the growth and well-being of
                persons with disabilities.
              </p>
            </motion.div>

            {/* Image Floated Left */}
            <motion.div
              className="lg:float-left lg:mr-10 lg:mb-6 lg:w-[45%] w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img
                src={about}
                alt="Welcome to GreenWay Trust"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>

            {/* Remaining Content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At Greenway Trust, we believe true empowerment happens when
                  individuals move beyond receiving support and begin
                  contributing to society. Our initiatives focus on building
                  skills, confidence, and leadership, enabling persons with
                  disabilities to take active roles in community life and
                  national development.
                </p>
                <p>
                  Our work spans key areas such as para sports development,
                  medical and rehabilitation support, capacity building, and
                  community engagement. We prioritize long-term independence,
                  dignity, and self-reliance over short-term assistance.
                </p>
                <p>
                  In addition to social empowerment, we are deeply committed to
                  environmental sustainability. Through tree plantation drives,
                  environmental awareness programs, and eco-friendly practices,
                  we promote responsible stewardship of the environment as part
                  of inclusive growth.
                </p>
                <p>
                  Headquartered in Vellore, Tamil Nadu, Greenway Trust works at
                  the grassroots level in collaboration with institutions,
                  associations, and local communities to create meaningful
                  impact and lasting change for persons with disabilities.
                </p>
              </div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-xl">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">
                    Volunteers
                  </div>
                </div>
                <div className="text-center p-4 bg-accent/10 border border-accent/20 rounded-xl">
                  <Award className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-accent">5</div>
                  <div className="text-sm text-muted-foreground">
                    Years Active
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Meet Our Volunteers */}
      <motion.section
        className="section-padding bg-muted/30"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Meet Our Volunteers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our dedicated team of volunteers and staff work tirelessly to make
              our mission a reality
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {loading ? (
              <div className="col-span-full py-12 text-center text-muted-foreground animate-pulse">
                Loading volunteers list...
              </div>
            ) : error ? (
              <div className="col-span-full py-12 text-center text-destructive">
                {error}
              </div>
            ) : currentVols.length === 0 ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No active volunteers at the moment.
              </div>
            ) : (
              currentVols.map((volunteer, index) => (
                <motion.div
                  key={volunteer._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="donation-card text-center h-full">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mx-auto mb-4">
                        {volunteer.avatar ||
                          volunteer.name?.substring(0, 2).toUpperCase()}
                      </div>
                      <h3 className="font-semibold text-primary mb-1">
                        {volunteer.name}
                      </h3>
                      <Badge variant="outline" className="mb-3">
                        {volunteer.volunteerType}
                      </Badge>
                      <p className="text-sm">{volunteer.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {volunteer.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Pagination for Volunteers */}
          {volTotalPages > 1 && (
            <motion.div
              className="flex justify-center items-center space-x-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVolPageChange(currentVolPage - 1)}
                disabled={currentVolPage === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <div className="flex space-x-1">
                {Array.from({ length: volTotalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentVolPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleVolPageChange(i)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVolPageChange(currentVolPage + 1)}
                disabled={currentVolPage === volTotalPages - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          )}
          <motion.p
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Page {currentVolPage + 1} of {volTotalPages} | Showing{" "}
            {currentVols.length} of {volunteers.length} volunteers
          </motion.p>
        </div>
      </motion.section>

      {/* Board of Trustees Section */}
      <motion.section
        className="section-padding bg-muted/30"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Board of Trustees / Office Bearers
            </h2>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto">
              Our trustees are practitioners and community leaders who work
              closely with beneficiaries. Rather than symbolic positions, each
              trustee plays an active role in planning and implementing Greenway
              Trust’s programmes on the ground.
            </p>
          </motion.div>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden mb-8 group">
            {/* Inline styles for the marquee animation */}
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: marquee 60s linear infinite;
              }
              .group:hover .animate-marquee {
                animation-play-state: paused;
              }
            `}</style>
            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {loadingTrustees ? (
                <div className="w-full text-center text-muted-foreground py-12 animate-pulse">
                  Loading Board of Trustees...
                </div>
              ) : trustees.length === 0 ? (
                <div className="w-full text-center text-muted-foreground py-12">
                  No Board of Trustees configured.
                </div>
              ) : (
                [...trustees, ...trustees].map((member, index) => (
                  <div
                    key={index}
                    className="w-[350px] md:w-[450px] flex-shrink-0 h-full"
                  >
                    <Card className="donation-card h-full flex flex-col hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 text-left flex-grow">
                        <div className="flex items-start gap-4 mb-4">
                          {member.imageUrl ? (
                            <img
                              src={member.imageUrl}
                              alt={member.name} 
                              className="w-28 h-28 min-w-[7rem] rounded-xl object-cover border-2 border-primary/20 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-28 h-28 min-w-[7rem] bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-primary-foreground font-bold text-3xl flex-shrink-0">
                              {member.name ? member.name.substring(0, 2).toUpperCase() : "GW"}
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-xl text-primary leading-tight">
                              {member.name}
                            </h3>
                            <div className="font-semibold text-foreground/90 mt-1">
                              {member.role}
                            </div>
                            {member.subRole && (
                              <div className="text-sm text-primary italic mt-1 leading-snug">
                                {member.subRole}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          {member.bio}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Coordinators Section */}
      <motion.section
        className="section-padding"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Meet our Team Co-ordinators
            </h2>
            <p className="text-muted-foreground text-lg max-w-4xl mx-auto">
              All coordinators of Greenway Trust serve on a voluntary basis,
              contributing their time, skills, and professional expertise
              without remuneration, and working closely with beneficiaries to
              support the planning, implementation, and delivery of the Trust’s
              programmes.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {loadingCoordinators ? (
              <div className="col-span-full py-12 text-center text-muted-foreground animate-pulse">
                Loading coordinators list...
              </div>
            ) : currentCoordinators.length === 0 ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No active coordinators at the moment.
              </div>
            ) : (
              currentCoordinators.map((coordinator, index) => (
                <motion.div
                  key={coordinator._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="donation-card text-center h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      {coordinator.imageUrl ? (
                        <img
                          src={coordinator.imageUrl}
                          alt={coordinator.name}
                          className="w-28 h-28 rounded-xl object-cover border-2 border-primary/20 mx-auto mb-4"
                        />
                      ) : (
                        <div className="w-28 h-28 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-2xl mx-auto mb-4">
                          {coordinator.name ? coordinator.name.substring(0, 2).toUpperCase() : "GW"}
                        </div>
                      )}
                      <h3 className="font-semibold text-lg text-primary mb-2">
                        {coordinator.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {coordinator.role}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Pagination for Coordinators */}
          {coordinatorTotalPages > 1 && (
            <motion.div
              className="flex justify-center items-center space-x-2 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCoordinatorPageChange(coordinatorPage - 1)}
                disabled={coordinatorPage === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <div className="flex space-x-1">
                {Array.from({ length: coordinatorTotalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={coordinatorPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCoordinatorPageChange(i)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCoordinatorPageChange(coordinatorPage + 1)}
                disabled={coordinatorPage === coordinatorTotalPages - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          )}
          <motion.p
            className="text-center text-sm text-muted-foreground mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Page {coordinatorPage + 1} of {coordinatorTotalPages} | Showing{" "}
            {currentCoordinators.length} of {coordinators.length} coordinators
          </motion.p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default About;