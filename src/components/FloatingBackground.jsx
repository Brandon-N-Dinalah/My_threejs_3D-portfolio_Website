import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const FloatingBackground = () => {
  const containerRef = useRef(null);

  // Define floating elements with different positions, sizes, colors, and animation durations
  const floatingElements = [
    { id: 1, color: '#22c55e', size: 16, x: '10%', y: '15%', duration: 6, delay: 0 },
    { id: 2, color: '#eab308', size: 20, x: '85%', y: '25%', duration: 7, delay: 0.5 },
    { id: 3, color: '#ef4444', size: 14, x: '75%', y: '70%', duration: 8, delay: 1 },
    { id: 4, color: '#22c55e', size: 18, x: '15%', y: '60%', duration: 6.5, delay: 0.3 },
    { id: 5, color: '#eab308', size: 12, x: '50%', y: '10%', duration: 7.5, delay: 0.8 },
    { id: 6, color: '#ef4444', size: 16, x: '80%', y: '50%', duration: 6.8, delay: 0.2 },
    { id: 7, color: '#22c55e', size: 14, x: '25%', y: '80%', duration: 7.2, delay: 0.6 },
    { id: 8, color: '#eab308', size: 18, x: '60%', y: '65%', duration: 6.3, delay: 0.4 },
    { id: 9, color: '#ef4444', size: 15, x: '45%', y: '35%', duration: 7.8, delay: 0.9 },
    { id: 10, color: '#22c55e', size: 17, x: '70%', y: '15%', duration: 6.5, delay: 0.1 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Animate each floating element
    floatingElements.forEach((element) => {
      const elementRef = containerRef.current?.querySelector(
        `[data-element-id="${element.id}"]`
      );

      if (!elementRef) return;

      // Create a timeline for continuous floating animation
      const tl = gsap.timeline({
        repeat: -1,
        delay: element.delay,
      });

      if (!prefersReducedMotion) {
        tl.to(
          elementRef,
          {
            y: -30,
            opacity: 0.3,
            duration: element.duration / 2,
            ease: 'sine.inOut',
          },
          0
        ).to(
          elementRef,
          {
            y: 30,
            opacity: 0.8,
            duration: element.duration / 2,
            ease: 'sine.inOut',
          }
        );
      }

      return () => tl.kill();
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{
        background: 'transparent',
      }}
    >
      {/* Subtle grid background pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          data-element-id={element.id}
          className="absolute rounded-sm transition-all"
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            backgroundColor: element.color,
            left: element.x,
            top: element.y,
            opacity: 0.6,
            boxShadow: `0 0 20px ${element.color}40, 0 0 40px ${element.color}20`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Optional: Add some larger blurred circles for depth */}
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: '300px',
          height: '300px',
          backgroundColor: '#22c55e',
          left: '10%',
          top: '20%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: '300px',
          height: '300px',
          backgroundColor: '#ef4444',
          right: '10%',
          bottom: '20%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default FloatingBackground;
