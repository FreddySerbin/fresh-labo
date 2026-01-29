'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

interface BubblesProps {
  count?: number;
}

export const Bubbles: FC<BubblesProps> = ({ count = 5 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => {
        const size = 50 + Math.random() * 150;
        const delay = Math.random() * 5;
        const duration = 8 + Math.random() * 4;
        const x = Math.random() * 100;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary-cyan/30 to-accent-blue/20"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              bottom: -size,
            }}
            animate={{
              y: [`0vh`, `-110vh`],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0, 0.6, 0.4, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
};
