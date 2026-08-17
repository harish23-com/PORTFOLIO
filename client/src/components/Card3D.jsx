import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Card3D = ({
  children,
  className = '',
  style = {},
  maxRotate = 12,
  glare = true,
  scale = 1.03,
  ...props
}) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxRotate, -maxRotate]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxRotate, maxRotate]), springConfig);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ['-30%', '130%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['-30%', '130%']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        ...style,
      }}
      className={className}
      {...props}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: hovered ? scale : 1,
          transformStyle: 'preserve-3d',
          transition: 'scale 0.3s ease',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {children}

        {glare && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: 10,
              background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            }}
            animate={{
              background: hovered
                ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, transparent 60%)`
                : `radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Card3D;
