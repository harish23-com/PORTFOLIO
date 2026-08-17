import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(true);
    };
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) setHovering(false);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <div
      className="custom-cursor hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`,
        background: hovering ? 'rgba(124,92,255,0.15)' : 'transparent',
      }}
    />
  );
};

export default CustomCursor;
