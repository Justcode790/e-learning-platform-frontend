import { useState, useEffect } from "react"; // Make sure to import useState and useEffect
import { useLoading } from "../context/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from 'lucide-react';

// --- Variants for the main overlay ---
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// --- Variants for the rocket animation ---
const rocketVariants = {
  initial: { y: "100vh", opacity: 0.5, rotate: -30 },
  launch: {
    y: "-100vh",
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 2.5,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
  textFadeIn: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// --- Variants for the text message ---
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8,
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export default function GlobalLoader() {
  const { isLoading } = useLoading();

  const messages = [
    "Launching your learning journey...",
    "Igniting knowledge rockets...",
    "Preparing for liftoff!",
    "Learning in progress...",
    "Your next lesson is loading...",
    "Blasting off to new insights!",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
      }, 3000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLoading, messages.length]);


  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          // --- UPDATED LINE ---
          // Using your teal theme for the gradient
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-teal-700 dark:from-teal-800 dark:to-teal-900 z-50 text-white"
          // --- END OF UPDATE ---
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
        >
          {/* Rocket Icon */}
          <motion.div
            className="mb-8"
            variants={rocketVariants}
            initial="initial"
            animate="launch"
          >
            {/* Rocket remains white for contrast */}
            <Rocket size={80} strokeWidth={1.5} className="text-white" />
          </motion.div>

          {/* Loading Text */}
          <motion.p
            className="text-xl md:text-2xl font-semibold text-center mt-4 tracking-wide"
            key={currentMessageIndex}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Text remains white for contrast */}
            {messages[currentMessageIndex]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}