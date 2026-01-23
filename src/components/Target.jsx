import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Target = (props) => {
  const targetRef = useRef();

  // Temporary placeholder model (simple cube)
  // Replace with a real model later
  const scene = (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );

  // Simple bounce animation without model loading
  useEffect(() => {
    if (!targetRef.current) return;

    const anim = gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => anim.kill();
  }, []);

  return (
    <group {...props} ref={targetRef} scale={1.2}>
      {scene}
    </group>
  );
};

export default Target;
