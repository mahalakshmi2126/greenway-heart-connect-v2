import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  MessageCircle,
  Twitter,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Youtube,
} from "lucide-react";
import logo from "@/assets/New Greenway Trust Logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container section-padding">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1: Logo & About */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <motion.img
                src={logo}
                alt="GreenWay Trust"
                className="h-10 w-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              />
              <span className="text-xl font-bold">GreenWay Trust</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Dedicated to creating positive change in our community by
              supporting those in need, promoting accessibility, and fostering
              hope for a better tomorrow.
            </p>
          </motion.div>

          {/* Column 2: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              {[
                {
                  icon: MapPin,
                  text: "NO.10, MUNICIPAL COMPLEX, NEW BUS STAND, AMBUR, THIRUPATTUR DIST - 635 802",
                  size: "w-14 h-14",
                },
                {
                  icon: Phone,
                  text: "8317368676, 9626445845",
                  size: "w-5 h-5",
                },
                {
                  icon: Mail,
                  text: "info@greenwaytrust.org.in",
                  size: "w-5 h-5",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-2 hover:translate-x-1 transition-transform duration-300"
                >
                  <item.icon
                    className={`${item.size} mt-0.5 text-primary-foreground/60`}
                  />
                  <span className="text-primary-foreground/80">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                // { name: "Causes", path: "/causes" },
                { name: "Programs", path: "/programs" },
                { name: "Blog", path: "/blog" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact", path: "/contact" },
              ].map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 hover:translate-x-1 hover:scale-105 inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Column 4: Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                {
                  icon: Instagram,
                  url: "https://www.instagram.com/greenway_trust",
                },
                {
                  icon: Facebook,
                  url: "https://www.facebook.com/greenwaytrust10",
                },
                { icon: MessageCircle, url: "https://wa.me/919626445845" }, // WhatsApp
                {
                  icon: Linkedin,
                  url: "https://www.linkedin.com/company/greenway-trust/ ",
                },
                {
                  icon: Youtube,
                  url: "https://www.youtube.com/@greenway-trust",
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank" // 🔑 new tab la open agum
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="bg-primary-foreground/10 p-2 rounded-full hover:bg-primary-foreground/20"
                >
                  <item.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60"
        >
          <p className="hover:scale-105 transition-transform duration-300">
            © 2024 Corp Wings. All rights reserved. Making a difference
            together.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
