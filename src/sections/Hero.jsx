import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { PerspectiveCamera } from "@react-three/drei";
import Cube from "../components/Cube.jsx";
import Ring from "../components/Ring.jsx";
import Button from "../components/Button.jsx";
import Target from "../components/Target.jsx";
import CanvasLoader from "../components/CanvasLoader.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import { calculateSizes } from "../constants/index.js";
import  HackerRoom  from "../components/HackerRoom.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import {Link} from "react-scroll";

const Hero = () => {
    // Use media queries to determine screen size
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

    const sizes = calculateSizes(isSmall, isMobile, isTablet);

    return (
        <section className="min-h-screen w-full flex flex-col relative" >
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
                    Hi, I am Brandon <span className="waving-hand">👋</span>
                </p>
                <p className="hero_tag text-gray_gradient">I Build Websites, Products and Brands</p>
            </div>

            <div className="w-full h-full absolute inset-0">
                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader />}>
                        {/* To hide controller */}
                        {/*<Leva hidden />*/}
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />

                        <HeroCamera isMobile={isMobile}>
                            <HackerRoom
                                scale={sizes.deskScale}
                                position={sizes.deskPosition}
                                rotation={[0.35, -Math.PI, 0]} />
                        </HeroCamera>

                        <group>
                            <Target position={sizes.targetPosition} />
                            <Ring position={sizes.ringPosition} />
                            <Cube position={sizes.cubePosition} />
                            <ReactLogo position={sizes.reactLogoPosition}/>
                        </group>

                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />
                    </Suspense>
                </Canvas>
            </div>

            <div className="absolute bottom-5 left-0 right-0 w-full z-10 c-space">
                <Link to="about" smooth duration={500} className="w-fit">
                    <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
                </Link>
            </div>
        </section>
    );
};

export default Hero;