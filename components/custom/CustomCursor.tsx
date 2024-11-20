'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false); // State to track link hover
  const mouseX = useMotionValue(0); // Tracks raw mouse X position
  const mouseY = useMotionValue(0); // Tracks raw mouse Y position

  // Apply spring smoothing to mouseX and mouseY for smooth follow effect
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

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
      className={`fixed z-[99999] pointer-events-none transition-all duration-150 flex items-center justify-center ${
        isHovering ? 'w-14 h-14' : 'w-6 h-6'
      } bg-[#850000] rounded-full`}
      style={{
        translateX: smoothX, // Smoothly follow mouse X position
        translateY: smoothY, // Smoothly follow mouse Y position
        transform: 'translate(-50%, -50%)', // Center the circle at the cursor
      }}
    >
      {isHovering && (
        <ArrowUpRight className="text-black" size={30} strokeWidth={3} /> // Increased size and weight
      )}
    </motion.div>
  );
};

export default CustomCursor;
