import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import wheelchairSupport from "@/assets/wheelchair.jpg";
import EnvironmentalProtection from "@/assets/tree.jpg";
import foodNutrition from "@/assets/food.jpg";
import skilldevelop from "@/assets/Skill Development & Livelihood Training.jpg.jpeg"

const CausesSection = () => {
  const navigate = useNavigate();
  const isAdmin = Boolean(localStorage.getItem("token"));

  const causes = [
    {
      id: 101,
      title: "Health Care & Rehabilitation",
      description:
        "Providing wheelchairs and mobility aids to those in need, ensuring everyone has the freedom of movement.",
      image: wheelchairSupport,
    },
    {
      id: 102,
      title: "Environmental Sustainability Initiatives",
      description:
        "Promoting sustainable practices through tree plantation, clean-up drives, waste segregation, and creating eco-friendly, accessible green spaces for communities.",
      image: EnvironmentalProtection,
    },
    {
      id: 103,
      title: "Skill Development & Livelihood Support",
      description:
        "Empowering individuals with disabilities through vocational training, skill development programs, and livelihood support initiatives to promote self-reliance and economic independence.",
      image: skilldevelop,
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Causes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every donation makes a difference. Choose a cause close to your
            heart and help us create positive change in our community.
          </p>
        </motion.div>

        {/* Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {causes.map((cause, index) => (
            <motion.div
              key={cause.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="h-full"
            >
              <Card className="group donation-card overflow-hidden h-full flex flex-col min-h-[420px]">
                {/* Image + Hover Button */}
                <div className="relative h-48 sm:h-56 md:h-60 overflow-hidden">
                  <motion.img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Donate button only on hover (desktop) */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Button
                      onClick={() =>
                        isAdmin
                          ? navigate("/admin/donate")
                          : navigate(`/cause/${cause.id}`)
                      }
                      className="btn-hover"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Donate Now
                    </Button>
                  </div>
                </div>

                {/* Title */}
                <CardHeader>
                  <CardTitle className="text-xl text-primary line-clamp-2">
                    {cause.title}
                  </CardTitle>
                </CardHeader>

                {/* Content */}
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {cause.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CausesSection;