import React, { useEffect, useRef } from "react";
import styles from "./win.module.css";

// Confetti configuration
const confettiCount = 200;
const gravityConfetti = 0.05; // Reduced gravity for slower falling speed
const dragConfetti = 0.08; // Increased drag for more gradual movement
const terminalVelocity = 2; // Lower terminal velocity to cap falling speed

// Updated color palette with more colors
const colors = [
  { front: "#7b5cff", back: "#6245e0" }, // Purple
  { front: "#b3c7ff", back: "#8fa5e5" }, // Light Blue
  { front: "#5c86ff", back: "#345dd1" }, // Darker Blue
  { front: "#ffb3b3", back: "#e08585" }, // Light Red
  { front: "#ff8c5c", back: "#e07345" }, // Orange
  { front: "#ffeb5c", back: "#e0c345" }, // Yellow
  { front: "#8cff5c", back: "#73e045" }, // Light Green
  { front: "#5cffb3", back: "#45e085" }, // Mint Green
  { front: "#5c8cff", back: "#456de0" }, // Royal Blue
  { front: "#d85cff", back: "#b845e0" }, // Magenta
];

// Helper function to pick a random number within a range
const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// Helper function to get initial velocities for confetti
const initConfettiVelocity = (
  xRange: [number, number],
  yRange: [number, number],
  strength: number
) => {
  const x = randomRange(xRange[0], xRange[1]) * strength;
  const range = yRange[1] - yRange[0] + 1;
  let y =
    (yRange[1] -
      Math.abs(randomRange(0, range) + randomRange(0, range) - range)) *
    strength;
  if (y >= yRange[1] - 1) {
    y += Math.random() < 0.25 ? randomRange(1, 2) * strength : 0;
  }
  return { x, y: -y };
};

// Confetti Class (represents a single piece of confetti)
class Confetti {
  randomModifier: number;
  color: { front: string; back: string };
  dimensions: { x: number; y: number };
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  velocity: { x: number; y: number };
  delay: number;
  startTime: number;

  constructor(canvasWidth: number, canvasHeight: number, strength: number) {
    this.randomModifier = randomRange(0, 99);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.dimensions = {
      x: randomRange(5, 12), // More variation in size
      y: randomRange(8, 18),
    };
    this.position = {
      x: canvasWidth / 2,
      y: canvasHeight / 2,
    };
    this.rotation = randomRange(0, 2 * Math.PI);
    this.scale = { x: 1, y: 1 };
    this.velocity = initConfettiVelocity([-10, 10], [8, 14], strength); // Use strength to control initial velocity
    this.delay = randomRange(0, 2000); // Random delay between 0 and 2000 ms (2 seconds)
    this.startTime = Date.now();
  }

  update() {
    const currentTime = Date.now();
    if (currentTime - this.startTime < this.delay) {
      // If the delay hasn't passed yet, do nothing
      return;
    }

    this.velocity.x -= this.velocity.x * dragConfetti;
    this.velocity.y = Math.min(
      this.velocity.y + gravityConfetti,
      terminalVelocity
    );
    this.velocity.x +=
      Math.random() > 0.5 ? Math.random() * 1.5 : -Math.random() * 1.5;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
    this.rotation += Math.random() * 0.05; // Add random rotation
  }

  isVisible() {
    const currentTime = Date.now();
    return currentTime - this.startTime >= this.delay;
  }
}

// React Component
const Win: React.FC<{ explosionStrength?: number }> = ({
  explosionStrength = 0.75,
}) => {
  const confettiArray = useRef<Confetti[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiArray.current.forEach((confettiPiece, index) => {
        confettiPiece.update();
        if (confettiPiece.isVisible()) {
          drawConfetti(ctx, confettiPiece);
        }
        if (confettiPiece.position.y >= canvas.height)
          confettiArray.current.splice(index, 1);
      });

      window.requestAnimationFrame(render);
    };

    const drawConfetti = (
      ctx: CanvasRenderingContext2D,
      confettiPiece: Confetti
    ) => {
      const width = confettiPiece.dimensions.x * confettiPiece.scale.x;
      const height = confettiPiece.dimensions.y * confettiPiece.scale.y;

      ctx.translate(confettiPiece.position.x, confettiPiece.position.y);
      ctx.rotate(confettiPiece.rotation);

      ctx.fillStyle =
        confettiPiece.scale.y > 0
          ? confettiPiece.color.front
          : confettiPiece.color.back;
      ctx.fillRect(-width / 2, -height / 2, width, height);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    render();

    // Trigger the confetti burst when the component mounts
    initBurst();

    return () => window.removeEventListener("resize", resizeCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explosionStrength]);

  const initBurst = () => {
    if (!canvasRef.current) return;

    for (let i = 0; i < confettiCount; i++) {
      confettiArray.current.push(
        new Confetti(
          canvasRef.current.width,
          canvasRef.current.height,
          explosionStrength
        )
      );
    }
  };

  return <canvas ref={canvasRef} className={styles.canvas}></canvas>;
};

export default Win;

// import React, { useEffect } from "react";
// import styles from "./win.module.css";

// const Win: React.FC = () => {
//   useEffect(() => {
//     const canvas = document.getElementById("canvas") as HTMLCanvasElement;
//     const ctx = canvas.getContext("2d");

//     if (!canvas || !ctx) return;

//     let W = window.innerWidth;
//     let H = window.innerHeight;
//     canvas.width = W;
//     canvas.height = H;

//     const mp = 400;
//     const particles: any[] = [];
//     let angle = 0;

//     const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

//     for (let i = 0; i < mp; i++) {
//       particles.push({
//         x: Math.random() * W,
//         y: Math.random() * H,
//         r: Math.random() * 15 + 1,
//         d: Math.random() * mp,
//         color: colors[Math.floor(Math.random() * colors.length)],
//         tilt: Math.floor(Math.random() * 10) - 10,
//         tiltAngleIncremental: Math.random() * 0.07 + 0.05,
//         tiltAngle: Math.random() * Math.PI, // Initial tilt angle
//       });
//     }

//     const draw = () => {
//       ctx.clearRect(0, 0, W, H);

//       particles.forEach((p) => {
//         ctx.beginPath();
//         ctx.lineWidth = p.r;
//         ctx.strokeStyle = p.color;
//         ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
//         ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
//         ctx.stroke();
//       });

//       update();
//     };

//     const update = () => {
//       angle += 0.01;

//       particles.forEach((p) => {
//         p.tiltAngle += p.tiltAngleIncremental;
//         p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
//         p.x += Math.sin(angle);
//         p.tilt = Math.sin(p.tiltAngle) * 15;

//         if (p.y > H) {
//           p.y = -10;
//           p.x = Math.random() * W;
//           p.tilt = Math.floor(Math.random() * 10) - 10;
//         }
//       });

//       requestAnimationFrame(draw);
//     };

//     draw();

//     window.addEventListener("resize", () => {
//       W = window.innerWidth;
//       H = window.innerHeight;
//       canvas.width = W;
//       canvas.height = H;
//     });
//   }, []);

//   return <canvas id="canvas" className={styles.canvas}></canvas>;
// };

// export default Win;
