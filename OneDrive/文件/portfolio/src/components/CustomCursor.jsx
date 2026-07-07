import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Trailing ring coordinates (centered around the cursor)
  const ringX = useTransform(mouseX, (x) => x - 16);
  const ringY = useTransform(mouseY, (y) => y - 16);

  // Inner dot coordinates (centered around the cursor)
  const dotX = useTransform(mouseX, (x) => x - 3);
  const dotY = useTransform(mouseY, (y) => y - 3);

  // Trailing ring spring settings
  const ringSpringConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const ringXSpring = useSpring(ringX, ringSpringConfig);
  const ringYSpring = useSpring(ringY, ringSpringConfig);

  // Inner dot spring settings (faster, less damping)
  const dotSpringConfig = { damping: 50, stiffness: 800 };
  const dotXSpring = useSpring(dotX, dotSpringConfig);
  const dotYSpring = useSpring(dotY, dotSpringConfig);

  useEffect(() => {
    // Detect touch/mobile devices
    const checkDevice = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const addHoverEvents = () => {
      const hoverables = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .hover-trigger, cursor-pointer');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Track dynamic DOM changes
    const observer = new MutationObserver(addHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });
    
    addHoverEvents();

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [isMobile, isVisible]);

  // Safe early return after all hooks are evaluated
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/20 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          x: dotXSpring,
          y: dotYSpring,
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />
    </>
  );
};

export default CustomCursor;
