import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorFollower() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // If hovering toolbar / buttons / links → hide cursor
      const target = e.target;
      if (target && target.closest("nav, button, a, input")) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-10 h-10 rounded-full outline-none border-2 border-white/30 bg-green-500 pointer-events-none z-50 flex items-center justify-center"
      animate={{
        x: mousePos.x - 20,
        y: mousePos.y - 20,
        scale: hidden ? 0 : 1, // shrink to 0 when hidden
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Center dot */}
      {/* <div className="w-1 h-1 rounded-full bg-white" /> */}
    </motion.div>
  );
}