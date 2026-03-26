import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const FloatingBackground = () => {
  const containerRef = useRef(null);

  // Define floating elements matching the Manus login page style
  // Elements are distributed across the viewport with varied sizes and colors
  const floatingElements = [
    // Left side elements
    { id: 1, color: '#22c55e', size: 10, x: '8%', y: '12%', duration: 5.5, delay: 0 },
    { id: 2, color: '#ef4444', size: 8, x: '5%', y: '45%', duration: 6.2, delay: 0.4 },
    { id: 3, color: '#eab308', size: 12, x: '12%', y: '78%', duration: 5.8, delay: 0.8 },
    
    // Center-left elements
    { id: 4, color: '#22c55e', size: 9, x: '25%', y: '25%', duration: 6.5, delay: 0.2 },
    { id: 5, color: '#ef4444', size: 11, x: '30%', y: '65%', duration: 5.9, delay: 0.6 },
    
    // Center elements
    { id: 6, color: '#eab308', size: 10, x: '45%', y: '15%', duration: 6.1, delay: 0.3 },
    { id: 7, color: '#22c55e', size: 8, x: '50%', y: '80%', duration: 5.7, delay: 0.7 },
    
    // Center-right elements
    { id: 8, color: '#ef4444', size: 12, x: '68%', y: '35%', duration: 6.3, delay: 0.1 },
    { id: 9, color: '#eab308', size: 9, x: '72%', y: '70%', duration: 5.6, delay: 0.5 },
    
    // Right side elements
    { id: 10, color: '#22c55e', size: 11, x: '85%', y: '20%', duration: 6.4, delay: 0.2 },
    { id: 11, color: '#ef4444', size: 10, x: '90%', y: '55%', duration: 5.8, delay: 0.9 },
    { id: 12, color: '#eab308', size: 8, x: '88%', y: '85%', duration: 6.0, delay: 0.4 },
    
    // Additional scattered elements for fullness
    { id: 13, color: '#22c55e', size: 7, x: '18%', y: '55%', duration: 5.9, delay: 0.3 },
    { id: 14, color: '#ef4444', size: 9, x: '38%', y: '42%', duration: 6.2, delay: 0.6 },
    { id: 15, color: '#eab308', size: 10, x: '62%', y: '12%', duration: 5.7, delay: 0.1 },
    { id: 16, color: '#22c55e', size: 8, x: '75%', y: '48%', duration: 6.1, delay: 0.8 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Animate each floating element with smooth vertical bobbing motion
    floatingElements.forEach((element) => {
      const elementRef = containerRef.current?.querySelector(
        `[data-element-id="${element.id}"]`
      );

      if (!elementRef) return;

      // Create a continuous floating animation
      const tl = gsap.timeline({
        repeat: -1,
        delay: element.delay,
      });

      if (!prefersReducedMotion) {
        // Smooth up and down motion
        tl.to(
          elementRef,
          {
            y: -25,
            opacity: 0.5,
            duration: element.duration / 2,
            ease: 'sine.inOut',
          },
          0
        ).to(
          elementRef,
          {
            y: 25,
            opacity: 0.7,
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
      {/* Subtle dotted grid background pattern - matching Manus style */}
      <div
        className="absolute inset-0 w-full h-full opacity-8"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px',
          backgroundPosition: '0 0',
          pointerEvents: 'none',
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
            opacity: 0.65,
            boxShadow: `0 0 15px ${element.color}50, 0 0 30px ${element.color}25`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(0.3px)',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Optional subtle gradient overlays for depth */}
      <div
        className="absolute rounded-full opacity-5"
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: '#22c55e',
          left: '5%',
          top: '10%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="absolute rounded-full opacity-5"
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: '#ef4444',
          right: '5%',
          bottom: '10%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default FloatingBackground;
