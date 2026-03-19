import {myProjects} from "../constants/index.js";
import {Suspense} from "react";
import CanvasLoader from "../components/CanvasLoader.jsx";
import {Center, OrbitControls} from "@react-three/drei";
import DemoComputer from "../components/DemoComputer.jsx";
import {Canvas} from "@react-three/fiber";
import {useState} from "react";


const projectCount = myProjects.length;

const Projects = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

    const currentProject = myProjects[selectedProjectIndex];

    const handleNavigation = (direction) => {
        setSelectedProjectIndex((prevIndex) => {
            if (direction === 'previous') {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
            } else {
                return prevIndex === projectCount -1 ? 0: prevIndex + 1
            }
        })
    }
    return (
        <section className="c-space my-20" id="projects">
            <p className="head-text">My Work</p>

            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">

               <div className="flex flex-col gap-5  relative sm:p-10
               py-10 px-5 shadow-2xl shadow-black-200">

                <div className="absolute top-0 right-0">
                    <picture>
                        <source srcSet={currentProject.spotlight.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
                        <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" loading="lazy" width="800" height="384"/>
                    </picture>
                </div>

                   <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
                   style={currentProject.logoStyle}>
                    <picture>
                        <source srcSet={currentProject.logo.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
                        <img src={currentProject.logo} alt="logo" className="w-10 h-10 shadow-sm" loading="lazy" width="40" height="40"/>
                    </picture>
                   </div>

                   <div className="flex flex-col gap-5 text-white-600 my my-5">
                        <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>
                       <p className="animatedText">{currentProject.desc}</p>
                       <p className="animatedText">{currentProject.subdesc}</p>
                   </div>

                   <div className="flex items-center  justify-center gap-5">
                    <div className="flex items-center gap-3">
                        {currentProject.tags.map(
                            (tag, index) => (
                                <div key={index} className="tech-logo">
                                    <picture>
                                        {tag.path.match(/\.(png|jpe?g)$/i) && <source srcSet={tag.path.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />}
                                        <img src={tag.path} alt={tag.name} loading="lazy" width="30" height="30"/>
                                    </picture>
                                </div>

                            ))}
                    </div>

                       <a className="flex items-center gap-2 cursor-pointer text-white-600" href={currentProject.href} target="_blank" rel="noreferrer">
                           <p>Check Out Project</p>
                           <picture>
                               <source srcSet="/assets/arrow-up.webp" type="image/webp" />
                               <img src="/assets/arrow-up.png" className="w-3 h-3" alt="arrow" loading="lazy" width="12" height="12"/>
                           </picture>
                       </a>

                   </div>

                   <div className="flex justify-between items-center mt-7">
                        <button className="arrow-btn"
                        onClick={() => handleNavigation('previous')}>
                            <picture>
                                <source srcSet="/assets/left-arrow.webp" type="image/webp" />
                                <img src="/assets/left-arrow.png" alt="left arrow" className="w-4 h-4" loading="lazy" width="16" height="16" />
                            </picture>
                        </button>
                       <button className="arrow-btn"
                        onClick={() => handleNavigation('next')}>
                            <picture>
                                <source srcSet="/assets/right-arrow.webp" type="image/webp" />
                                <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" loading="lazy" width="16" height="16" />
                            </picture>
                        </button>
                   </div>
               </div  >

                <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
                    <Canvas>
                       <ambientLight intensity ={Math.PI / 2} />
                        <directionalLight position={[10,10,5]} />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={1.65} position={[-0.3, -2, 0]} rotation={[0, -0.1, 0]}>
                                    <DemoComputer texture={currentProject.texture}/>
                                </group>
                            </Suspense>
                        </Center>
                        <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false}/>
                    </Canvas>
                </div>
            </div>
        </section>
    )
}
export default Projects
