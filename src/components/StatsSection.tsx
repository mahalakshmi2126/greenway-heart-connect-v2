import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Accessibility, Leaf, BookOpen, Factory } from "lucide-react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      icon: Users,
      value: 200,
      label: "Athletes with Disabilities Trained",
      suffix: "+",
      color: "text-primary",
    },
    {
      icon: Accessibility,
      value: 300,
      label: "Mobility Aids Distributed",
      suffix: "+",
      color: "text-accent",
    },
    {
      icon: Factory,
      value: 1,
      label: "Eco-friendly Micro-businesses Established",
      suffix: "+",
      color: "text-primary-light",
    },
    {
      icon: Leaf,
      value: 2000,
      label: "Trees Planted with PwDs",
      suffix: "+",
      color: "text-accent",
    },
    {
      icon: BookOpen,
      value: 50,
      label: "Environmental Awareness Programs",
      suffix: "+",
      color: "text-primary",
    },
  ];

  // Counter animation hook
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [end, duration, isVisible]);

    return count;
  };

  // Intersection Observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("stats-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      id="stats-section"
      className="section-padding bg-primary-lighter/30"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Together, we’ve built an inclusive and sustainable community through
            these milestones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <StatCard stat={stat} isVisible={isVisible} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, isVisible }: { stat: any; isVisible: boolean }) => {
  const Icon = stat.icon;

  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, [end, duration, isVisible]);

    return count;
  };

  const count = useCounter(stat.value);

  return (
    <div className="text-center p-6 bg-background rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up h-full min-h-[220px] flex flex-col justify-center">
      <div className="mb-4">
        <Icon className={`w-10 h-10 md:w-12 md:h-12 mx-auto ${stat.color}`} />
      </div>
      <div
        className={`counter text-2xl md:text-3xl font-bold ${stat.color} mb-2`}
      >
        {count}
        {stat.suffix || ""}
      </div>
      <p className="text-muted-foreground font-medium text-sm md:text-base">
        {stat.label}
      </p>
    </div>
  );
};

export default StatsSection;