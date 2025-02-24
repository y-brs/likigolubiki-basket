import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const AnimatedNumber = ({ number }) => {
  const [displayNumber, setDisplayNumber] = useState(number);

  useEffect(() => {
    if (displayNumber === number) return;

    let frame;

    const step = () => {
      setDisplayNumber(prev => {
        const next = prev + (number - prev) * 0.2;
        return Math.abs(number - next) < 1 ? number : next;
      });
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [number]);

  return (
    <motion.span animate={{ opacity: [0.5, 1] }} transition={{ duration: 0.3 }}>
      {Math.round(displayNumber)}
    </motion.span>
  );
};

export default AnimatedNumber;
