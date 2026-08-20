import { motion } from "framer-motion";
import { Eye, Target, Users, Heart, Leaf, Award } from "lucide-react";

const VisionMissionSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-lighter/40 to-accent-light/20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="bg-accent/10 p-3 rounded-full mr-4">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                Our Vision
              </h2>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A society where persons with disabilities have equal opportunities
              to thrive, and where communities work together to protect the
              planet.
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                Our Mission
              </h2>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              To empower persons with disabilities to lead independent,
              dignified, and active lives through inclusive sports, livelihood
              development, and advocacy, while protecting and preserving the
              environment for a sustainable future.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 px-4 sm:px-6">
            {[
              {
                icon: Users,
                title: "Inclusion",
                desc: "Equal opportunities for everyone, regardless of ability.",
                color: "text-primary",
              },
              {
                icon: Heart,
                title: "Dignity",
                desc: "Respect for every individual’s rights and aspirations.",
                color: "text-accent",
              },
              {
                icon: Leaf,
                title: "Sustainability",
                desc: "Balancing human development with environmental responsibility.",
                color: "text-green-600",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Delivering quality training, programs, and impact.",
                color: "text-yellow-500",
              },
              {
                icon: Eye,
                title: "Community",
                desc: "Building partnerships for lasting change.",
                color: "text-primary",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: false }}
                className="bg-background rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full min-h-[200px] flex flex-col"
              >
                <value.icon
                  className={`w-8 h-8 md:w-10 md:h-10 ${value.color} mx-auto mb-4`}
                />
                <h4 className="font-semibold text-primary mb-2 text-lg">
                  {value.title}
                </h4>
                <p className="text-sm md:text-base text-muted-foreground">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
