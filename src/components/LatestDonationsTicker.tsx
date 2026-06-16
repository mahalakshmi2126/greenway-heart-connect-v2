import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const LatestDonationsTicker = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get(`${API_BASE}/donations/latest`);
        setDonations(res.data.donations || []);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setDonations([]);
      }
    };

    fetchDonations();
  }, []);

  // Ensure we have enough items for a smooth loop, repeat 3 times
  const duplicatedDonations = donations.length > 0
    ? [...donations, ...donations, ...donations]
    : [];

  return (
    <section className="section-padding bg-accent/5 overflow-hidden">
      <div className="container overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Latest Donations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See the generous hearts making a difference in our community
          </p>
        </motion.div>

        {donations.length > 0 ? (
          <div className="relative overflow-hidden bg-background/50 rounded-lg py-4">
            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-33.33%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: donations.length * 5, // Speed proportional to number of items
                ease: "linear",
              }}
            >
              <div className="flex space-x-4 sm:space-x-6 md:space-x-8 px-4">
                {duplicatedDonations.map((donation, index) => (
                  <div
                    key={`${donation._id}-${index}`}
                    className="flex-shrink-0 bg-background rounded-lg p-4 shadow-sm border 
                 min-w-[200px] sm:min-w-[220px] md:min-w-[250px] 
                 text-center flex flex-col items-center justify-center"
                  >
                    {/* Name */}
                    <p className="text-base font-bold text-primary mb-1 truncate w-full">
                      {donation.donorName}
                    </p>

                    {/* Cause */}
                    <p className="text-sm text-muted-foreground mb-1 line-clamp-1">
                      {donation.cause}
                    </p>

                    {/* Time (shortened format) */}
                    <p className="text-xs font-medium text-muted-foreground mb-3">
                      {(() => {
                        const d = donation.serviceDate ? new Date(donation.serviceDate) : new Date(donation.createdAt);
                        return (
                          <>
                            {d.toLocaleDateString()}{" "}
                            {d.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </>
                        );
                      })()}
                    </p>

                    {/* Amount */}
                    <div className="flex items-center justify-center space-x-2 text-accent">
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="text-base font-black">
                        ₹{donation.totalAmount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground italic">
            Waiting for more generous hearts...
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestDonationsTicker;
