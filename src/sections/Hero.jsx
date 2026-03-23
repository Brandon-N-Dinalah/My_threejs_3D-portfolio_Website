import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { PerspectiveCamera } from "@react-three/drei";
import Cube from "../components/Cube.jsx";
import Ring from "../components/Ring.jsx";
import Button from "../components/Button.jsx";
import Target from "../components/Target.jsx";
import { ErrorBoundary } from "react-error-boundary";
import CanvasLoader from "../components/CanvasLoader.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import { calculateSizes } from "../constants/index.js";
import  HackerRoom  from "../components/HackerRoom.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import {Link} from "react-scroll";
import FloatingBackground from "../components/FloatingBackground.jsx";


const Hero = () => {
    // Use media queries to determine screen size
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

    const sizes = useMemo(() => calculateSizes(isSmall, isMobile, isTablet), [isSmall, isMobile, isTablet]);

    return (
        <section className="min-h-screen w-full flex flex-col relative" id="home"  >
            {/* Floating background elements */}
            <FloatingBackground />
            
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 relative z-10">
                <div className="mx-auto flex items-center justify-center gap-2 rounded-full border border-black-300 bg-black-200 px-4 py-2 w-fit sm:mb-2 shadow-lg group">
                    <div className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                    </div>
                    <span className="text-sm font-medium text-white-600">Taking on clients — Q2 2026</span>
                </div>
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
                    Hi, I'm Brandon — Co-founder of BND Labs <span className="waving-hand">👋</span>
                </p>
                <p className="hero_tag text-gray_gradient">I Build Growth Systems for Zambian Businesses</p>
            </div>

            <div className="w-full h-full absolute inset-0 z-0">
                <Canvas className="w-full h-full">
                    <ErrorBoundary fallback={<CanvasLoader />}>
                         <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />

                        <HeroCamera isMobile={isMobile}>
                            <HackerRoom
                                scale={sizes.deskScale}
                                position={sizes.deskPosition}
                                rotation={[0.35, -Math.PI, 0]} />
                        </HeroCamera>

                        <group>
                            {/* Removed: tech icon decorations — brand repositioning
                            <Target position={sizes.targetPosition} />
                            <Ring position={sizes.ringPosition} />
                            <Cube position={sizes.cubePosition} />
                            <ReactLogo position={sizes.reactLogoPosition}/>
                            */}
                        </group>

                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />

                    </Suspense>
                    </ErrorBoundary>
                </Canvas>
            </div>

            <div className="absolute bottom-5 left-0 right-0 w-full z-10 c-space">
                <Link to="about" smooth duration={500} className="w-fit">
                    <Button name="See how we build growth systems" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
                </Link>
            </div>
        </section>
    );
};

export default Hero;