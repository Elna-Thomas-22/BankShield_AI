import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ finishLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            finishLoading();
          }, 600);
          return 100;
        }
        // Speed up near the end for fluid feel
        const increment = Math.max(1, Math.floor((100 - prev) * 0.15));
        return prev + increment;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] z-[9999] flex flex-col items-center justify-center select-none">
      {/* Noise background overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-20"></div>

      <div className="relative flex flex-col items-center">
        {/* Animated logo/initials */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          {/* Circular border progress */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              className="stroke-white/5"
              strokeWidth="2"
              fill="transparent"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="60"
              className="stroke-white"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 60}
              strokeDashoffset={2 * Math.PI * 60 * (1 - progress / 100)}
              transition={{ ease: "easeInOut" }}
            />
          </svg>

          {/* Initials Text */}
          <span className="text-white text-3xl font-light tracking-widest font-mono">
            ET
          </span>
        </motion.div>

        {/* Text indicators */}
        <div className="mt-8 flex flex-col items-center gap-1 overflow-hidden h-12">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-textMuted text-xs font-mono tracking-widest uppercase"
          >
            System Loading
          </motion.p>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.6 }}
            transition={{ delay: 0.3 }}
            className="text-white text-sm font-mono font-medium"
          >
            {progress}%
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
