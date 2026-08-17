import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useRef } from 'react';

const Shape = ({ type, size, color, x, y, rotationSpeed, floatAmplitude, delay }) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);
  const translateY = useMotionValue(0);

  const startTime = useRef(null);

  useAnimationFrame((t) => {
    if (startTime.current === null) startTime.current = t;
    const elapsed = (t - startTime.current + delay * 1000) / 1000;

    rotateX.set(elapsed * rotationSpeed * 60);
    rotateY.set(elapsed * rotationSpeed * 45);
    rotateZ.set(elapsed * rotationSpeed * 30);
    translateY.set(Math.sin(elapsed * 0.8) * floatAmplitude);
  });

  const commonStyle = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    translateY,
    rotateX,
    rotateY,
    rotateZ,
    transformStyle: 'preserve-3d',
  };

  if (type === 'cube') {
    const face = {
      position: 'absolute',
      width: size,
      height: size,
      border: `1px solid ${color}`,
      background: `rgba(${color.replace(/[^\d,]/g, '')}, 0.05)`,
      backfaceVisibility: 'visible',
    };
    const half = size / 2;
    return (
      <motion.div style={{ ...commonStyle, width: size, height: size }}>
        <div style={{ position: 'relative', width: size, height: size, transformStyle: 'preserve-3d' }}>
          <div style={{ ...face, transform: `translateZ(${half}px)` }} />
          <div style={{ ...face, transform: `rotateY(180deg) translateZ(${half}px)` }} />
          <div style={{ ...face, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
          <div style={{ ...face, transform: `rotateY(90deg) translateZ(${half}px)` }} />
          <div style={{ ...face, transform: `rotateX(90deg) translateZ(${half}px)` }} />
          <div style={{ ...face, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
        </div>
      </motion.div>
    );
  }

  if (type === 'ring') {
    return (
      <motion.div
        style={{
          ...commonStyle,
          width: size,
          height: size,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          boxShadow: `0 0 ${size / 3}px ${color}, inset 0 0 ${size / 4}px ${color}`,
          background: 'transparent',
        }}
      />
    );
  }

  if (type === 'diamond') {
    return (
      <motion.div
        style={{
          ...commonStyle,
          width: size,
          height: size,
          border: `1px solid ${color}`,
          background: `linear-gradient(135deg, ${color}20, transparent)`,
          boxShadow: `0 0 ${size / 2}px ${color}40`,
        }}
      />
    );
  }

  return (
    <motion.div
      style={{
        ...commonStyle,
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid ${color}40`,
        filter: `drop-shadow(0 0 8px ${color})`,
      }}
    />
  );
};

const FloatingGeometry = () => {
  const shapes = [
    { type: 'cube', size: 40, color: 'rgba(124,92,255,0.6)', x: 8, y: 20, rotationSpeed: 0.3, floatAmplitude: 15, delay: 0 },
    { type: 'ring', size: 80, color: 'rgba(0,217,192,0.5)', x: 88, y: 15, rotationSpeed: 0.2, floatAmplitude: 20, delay: 1 },
    { type: 'diamond', size: 50, color: 'rgba(124,92,255,0.7)', x: 82, y: 70, rotationSpeed: 0.25, floatAmplitude: 12, delay: 0.5 },
    { type: 'cube', size: 25, color: 'rgba(0,217,192,0.6)', x: 15, y: 75, rotationSpeed: 0.4, floatAmplitude: 18, delay: 1.5 },
    { type: 'ring', size: 50, color: 'rgba(124,92,255,0.4)', x: 50, y: 5, rotationSpeed: 0.15, floatAmplitude: 10, delay: 0.8 },
    { type: 'diamond', size: 30, color: 'rgba(0,217,192,0.5)', x: 3, y: 50, rotationSpeed: 0.35, floatAmplitude: 22, delay: 2 },
    { type: 'cube', size: 20, color: 'rgba(124,92,255,0.5)', x: 93, y: 45, rotationSpeed: 0.45, floatAmplitude: 14, delay: 1.2 },
    { type: 'ring', size: 35, color: 'rgba(0,217,192,0.6)', x: 70, y: 88, rotationSpeed: 0.2, floatAmplitude: 16, delay: 0.3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '600px' }}>
      {shapes.map((shape, i) => (
        <Shape key={i} {...shape} />
      ))}
    </div>
  );
};

export default FloatingGeometry;
