import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroBackground from "@/assets/Photos/Home.JPG";

const HeroSection = () => {
  const navigate = useNavigate();
  const isAdmin = Boolean(localStorage.getItem("token"));

  const handleDonateClick = () => {
    if (isAdmin) {
      navigate("/admin/donate"); // admin ku donate → dashboard page
    } else {
      navigate("/donate"); // normal user ku donate → public page
    }
  };

  const handleLearnMoreClick = () => {
    if (!isAdmin) {
      navigate("/about"); // normal users only
    }
    // admin irundha nothing
  };

  const handleVolunteerClick = () => {
    if (isAdmin) {
      navigate("/admin/volunteers");
    } else {
      navigate("/volunteer");
    }
  };

  return (
    <section
      className="hero-section flex items-center relative overflow-hidden min-h-screen"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  md:bg-gradient-to-r md:from-black/60"></div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-4 mb-6 drop-shadow-lg">
              Inclusion, <br />
              <span className="text-green-400 drop-shadow-md">Empowerment,</span> <br />
              Sustainability
            </h1>

            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Creating opportunities for persons with disabilities and
              safeguarding our environment for future generations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Donate Now */}
              <Button
                size="lg"
                onClick={handleDonateClick}
                className="bg-accent hover:bg-accent/90"
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </Button>

              {/* Learn More */}
              <Button
                size="lg"
                variant="outline"
                onClick={handleLearnMoreClick}
                className="border-primary-foreground text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground hover:text-primary btn-hover backdrop-blur-sm"
              >
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-background/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl mt-8 mb-2 lg:mt-8"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              Why GreenWay Trust?
            </h3>

            <ul className="list-disc list-inside space-y-3">
              <li>
                Empowering persons with disabilities to compete, excel, and lead through structured para sports opportunities.
              </li>
              <li>
                Connecting persons with disabilities to essential medical, rehabilitation, and assistive support for independent living.
              </li>
              <li>
                Building confidence, skills, and self-reliance to enable dignified and inclusive lives.
              </li>
              <li>
                Creating awareness and inclusion by engaging families, institutions, and the wider community.
              </li>
              <li>
                Promoting sustainable and responsible practices for a healthier and inclusive future.
              </li>
            </ul>

            {/* Volunteer Button */}
            <Button
              className="w-full mt-6 btn-hover hover-glow"
              onClick={handleVolunteerClick}
            >
              Volunteer
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
