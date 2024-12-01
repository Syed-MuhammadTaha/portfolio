'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false); // State to track link hover
  const mouseX = useMotionValue(0); // Tracks raw mouse X position
  const mouseY = useMotionValue(0); // Tracks raw mouse Y position

  // Apply spring smoothing to mouseX and mouseY for smooth follow effect
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Handle mouse movement to track cursor position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Handle mouse hover over links or interactive elements
  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const links = document.querySelectorAll('a, button'); // Add more selectors as needed
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    // Clean up event listeners
    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <div
        className={`transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-150 ${
          isHovering ? 'w-14 h-14' : 'w-6 h-6'
        } bg-[#880808] rounded-full`}
      >
        {isHovering && (
          <ArrowUpRight className="text-black" size={30} strokeWidth={3} />
        )}
      </div>
    </motion.div>
  );
};

export default CustomCursor;
