import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedLogo = ({ style }: { style?: React.CSSProperties }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [circles, setCircles] = useState<
    { color: string; size: number; x: number; y: number; key: string }[]
  >([]);

  const colors = [
    "rgba(255, 107, 107, 0.8)",
    "rgba(255, 217, 61, 0.8)",
    "rgba(107, 203, 119, 0.8)",
    "rgba(77, 150, 255, 0.8)",
    "rgba(157, 78, 221, 0.8)",
    "rgba(249, 168, 212, 0.8)",
    "rgba(255, 158, 0, 0.8)",
    "rgba(46, 196, 182, 0.8)",
  ];

  const generateCircles = () => {
    const rows = 2;
    const cols = 8;
    const circleSize = 60;
    const circleSpacing = 20;
    const grid = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid.push({
          color: colors[Math.floor(Math.random() * colors.length)],
          size: circleSize,
          x: col * (circleSize + circleSpacing) - 20,
          y: row * (circleSize + circleSpacing) - 30,
          key: `${row}-${col}`,
        });
      }
    }

    return grid.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (isHovered) {
      setCircles(generateCircles());
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: "100%",
        overflow: "hidden",
        width: "100%",
        ...style,
      }}
    >
      <motion.h1
        style={{
          color: "rgba(255, 255, 255, 0.8)",
          margin: 0,
          fontSize: "40px",
          fontWeight: "bold",
          position: "relative",
          paddingLeft: "20px",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        Code Breaker
      </motion.h1>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          maskImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      >
        {circles.map(({ color, size, x, y, key }, index) => (
          <motion.div
            key={key}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
              top: y,
              left: x,
            }}
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 1.5,
            }}
            transition={{
              delay: index * 0.05,
              duration: 0.5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedLogo;
