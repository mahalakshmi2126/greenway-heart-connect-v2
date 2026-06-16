import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ZoomIn } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import galleryBanner from "@/assets/Photos/Main10.jpg";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_BASE}/gallery/?category=${selectedCategory === "All" ? "" : selectedCategory}`);
        setImages(response.data);
      } catch (err) {
        setError("Failed to fetch gallery images. Please try again later.");
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [selectedCategory]);

  const categories = ["All", "Events", "Causes", "Volunteers", "Beneficiaries", "Community", "Environment"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="hero-section flex items-center relative"
        style={{
          backgroundImage: `url(${galleryBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="container relative z-10 text-center text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Gallery</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Witness the moments of hope, support, and positive change through our visual stories. 
              Every image represents lives touched and communities transformed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b">
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

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <motion.div 
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              layout
            >
              <AnimatePresence>
                {images.map((image, index) => (
                  <motion.div
                    key={image._id} // Changed from id to _id to match MongoDB
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.imageUrl} // Changed from url to imageUrl to match schema
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <Badge className="mb-2">{image.category}</Badge>
                        <h3 className="text-white font-semibold text-sm mb-1">
                          {image.title}
                        </h3>
                        {/* <p className="text-white/80 text-xs line-clamp-2">
                          {image.description}
                        </p> */}
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && images.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-primary mb-2">No images found</h3>
              <p className="text-muted-foreground">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-background rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img
                src={selectedImage.imageUrl} // Changed from url to imageUrl
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              <div className="p-6">
                <Badge className="mb-2">{selectedImage.category}</Badge>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {selectedImage.title}
                </h3>
                {/* <p className="text-muted-foreground">
                  {selectedImage.description}
                </p> */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;