import {Canvas} from "@react-three/fiber";
import {workExperiences} from "../constants/index.js";
import {Suspense, useState} from "react";
import CanvasLoader from "../components/CanvasLoader.jsx";
import Developer from "../components/Developer.jsx";
import {OrbitControls} from "@react-three/drei";

const Experience = () => {
    // State to manage the developer's animation
    const [animationName, setAnimationName] = useState('idle')
    return (
        <section className="c-space my-20">
            <div className="w-full text-white-600">
                {/* Section title */}
                <h3 className='head-text'> My Work Experience</h3>
                {/* Container for work experience*/}
                <div className="work-container">
                    {/* 3D canvas for developer model*/}
                    <div className="work-canvas">
                        {/* Canvas for react-three-fiber*/}
                        <Canvas>
                            {/* Lighting*/}
                            <ambientLight intensity={4} />
                            <directionalLight position={[10, 10, 10]} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
                            <directionalLight position={[10, 10, 10]} intensity={2}/>
                            {/* Orbit controls for camera*/}
                            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2}/>
                            {/* Suspense for loading the developer model*/}
                            <Suspense fallback={<CanvasLoader/>}>
                                {/* Developer model component*/}
                                <Developer position-y={-3} scale={3} animationName={animationName}/>
                            </Suspense>
                        </Canvas>
                    </div>

                    {/* Work experience content*/}
                    <div className="work-content">
                        <div className="sm:py-10 py-5 sm:px-5 px-2.5">
                            {/* Mapping through work experiences*/}
                            {workExperiences.map(({id,name, pos, icon, duration, title, animation}) => (

                                <div key={id} className="work-content_container group" onClick={() => setAnimationName(animation.toLocaleLowerCase())}
                                     onPointerOver={() => setAnimationName(animation.toLocaleLowerCase())}
                                     onPointerOut={() => setAnimationName("idle")}>
                                    <div className="flex flex-col h-full justify-start items-center py-2">
                                        <div className="work-content_logo">
                                            <img src={icon} alt="logo" className="w-full h-full "/>
                                        </div>
                                        <div className="work-content_bar"/>
                                    </div>

                                    <div className="sm:p-5 px-2.5 py-5">
                                        <p className="font-bold text-white-800">{name}</p>
                                        <p className="text-sm mb-5">{pos} -- {duration}</p>
                                        <p className="group-hover:text-white transition ease-in-out duration-500">{title}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Experience
