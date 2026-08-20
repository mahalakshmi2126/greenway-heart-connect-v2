import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import communityEventImg from "../assets/community-event.jpg";
import wheelchairDistributionImg from "@/assets/wheelchair.jpg";
import sportsEventsImg from "@/assets/sports-events.jpg";
import healthcareCampImg from "@/assets/healthcare-camp.jpg";
import volunteerTrainingImg from "@/assets/volunteer-training.png";
import foodDistributionImg from "@/assets/food.jpg";

const OurCommunitySection = () => {
 const socialPhotos = [
  { url: communityEventImg, title: "Community Event" },
  { url: wheelchairDistributionImg, title: "Wheelchair Distribution" },
  { url: sportsEventsImg, title: "Sports & Events" },
  { url: healthcareCampImg, title: "Healthcare Camp" },
  { url: volunteerTrainingImg, title: "Volunteer Training" },
  { url: foodDistributionImg, title: "Food Distribution" },
];


  return (
    <section className="section-padding bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See our community in action through these moments of hope, support, and positive change.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {socialPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-lg aspect-square"
            >
              <img 
                src={photo.url} 
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-sm font-medium text-center px-2">{photo.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="btn-hover"
            onClick={() => window.open('https://www.instagram.com/greenway_trust', '_blank')}
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow @GreenWay Trust
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurCommunitySection;