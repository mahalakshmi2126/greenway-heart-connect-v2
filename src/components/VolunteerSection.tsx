import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VolunteerSection = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Make a Real Difference",
      description:
        "Your time and effort directly impact lives in your community",
    },
    {
      icon: Users,
      title: "Join Amazing People",
      description:
        "Connect with like-minded individuals who share your passion for helping others",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description:
        "Choose volunteer opportunities that fit your schedule and availability",
    },
    {
      icon: Award,
      title: "Gain Experience",
      description:
        "Develop new skills and gain meaningful experience while helping others",
    },
  ];

  const navigate = useNavigate();
  const isAdmin = Boolean(localStorage.getItem("token"));

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Animated Card */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="relative"
          >
            <motion.div
              className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 sm:p-8 text-primary-foreground hover-glow hover-lift"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                {/* Title + Icon */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-80" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    Join Our Volunteer Team
                  </h3>
                  <p className="text-primary-foreground/80 text-sm sm:text-base">
                    Be the change you want to see in the world
                  </p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {[
                    { value: "150+", label: "Active Volunteers" },
                    { value: "25+", label: "Programs" },
                    { value: "5000+", label: "Hours Served" },
                    { value: "100%", label: "Impact" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-primary-foreground/10 rounded-lg p-3 sm:p-4 hover-glow cursor-pointer"
                    >
                      <motion.div
                        className="text-lg sm:text-2xl font-bold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs sm:text-sm opacity-80">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6"
            >
              Become a Volunteer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: false }}
              className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Join our passionate team of volunteers and help us create lasting
              change in our community. Whether you have an hour a week or a day
              a month, your contribution matters.
            </motion.p>

            {/* Benefits */}
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: 10 }}
                  className="flex items-start space-x-3 sm:space-x-4 hover-lift cursor-pointer p-2 rounded-lg"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-accent/10 p-2 rounded-lg"
                  >
                    <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm sm:text-base mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Button
                size="lg"
                className="btn-hover w-full sm:w-auto"
                onClick={() =>
                  navigate(isAdmin ? "/admin/volunteers" : "/volunteer")
                }
              >
                Join Our Team
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="btn-hover w-full sm:w-auto"
                onClick={() =>
                  navigate(isAdmin ? "/admin/volunteers" : "/about")
                }
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;