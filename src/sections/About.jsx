import Globe from "react-globe.gl";
import Button from "../components/Button.jsx";
import {useState, useEffect} from "react";
import { contactDetails } from "../constants/index.js";

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(contactDetails.email);
        setHasCopied(true);

        setTimeout(() =>{
            setHasCopied(false);
        }, 2000);
    };

    useEffect(() => {
        const cards = document.querySelectorAll('.grid-container');

        const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
        };

        const handleMouseLeave = (e) => {
            e.currentTarget.style.setProperty('--mouse-x', '50%');
            e.currentTarget.style.setProperty('--mouse-y', '50%');
        };

        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <section className="c-space my-20" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container grid-container--profile">
                        <picture className="profile-img-container flex justify-center h-full">
                            <source srcSet="/assets/grid1.webp" type="image/webp" />
                            <img src="/assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" loading="lazy" width="276" height="276" />
                        </picture>

                        <div>
                            <p className="grid-headtext">Hi, I&apos;m Brandon</p>
                            <p className="grid-subtext">I co-founded BND Labs to solve a problem I kept seeing — Zambian businesses spending on marketing that never compounds. We build the systems that change that: consistent leads, clear processes, and measurable growth.</p>
                        </div>
                    </div>
                </div>

               <div className="col-span-1 xl:row-span-3">
                   <div className="grid-container grid-container--tech">
                       <img src="/assets/grid2.0.webp" alt="grid-2.0" className="w-full sm:w-[276px] h-fit object-contain" loading="lazy" width="276" height="276" />

                       <div>
                           <p className="grid-headtext">How We Build</p>
                           <p className="grid-subtext">We combine strategy, design, automation, and development into one integrated system. Every tool we use serves a single goal: making your business easier to find, trust, and contact.</p>
                       </div>
                   </div>
               </div>

                <div className="col-span-1 xl:row-span-4">
                    <div className="grid-container grid-container--globe">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center globe-wrapper">
                        <Globe
                        height={326}
                        width={326}
                        backgroundColor="rgba(0,0,0,0)"
                        backgroundImageOpacity={0.5}
                        showAtmosphere
                        showGraticules
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                        labelsData={[{
                           lat: -15.3875, lng: 28.3228,
                           text: ' Am Here!',
                            color: 'white',
                            size: 35,
                        }]}
                        />
                        </div>
                            <div>
                                <p className="grid-headtext">Based in Lusaka. Built for Zambia.</p>
                                <p className="grid-subtext">We're a Zambian-built agency working with businesses across Lusaka and beyond. Every system we build is designed for the local market — and engineered to scale.</p>
                                <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
                            </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                    <picture>
                        <source srcSet="/assets/grid3.webp" type="image/webp" />
                        <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" loading="lazy" width="266" height="266"/>
                    </picture>
                        <div>
                            <p className="grid-headtext"> My passion for programming and technology</p>
                            <p className="grid-subtext"> I love solving problems, being innovative, and building things through code. Programming and technology aren&apos;t just my profession,but my passion too. I enjoy exploring new technologies, and enhancing my skills.</p>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <picture>
                            <source srcSet="/assets/grid4.webp" type="image/webp" />
                            <img src="/assets/grid4.png" alt="grid-4" className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top " loading="lazy" width="276" height="126" />
                        </picture>

                        <div className="space-y-2">
                            <p className="grid-subtext text-center">Contact me</p>
                            <div className="copy-container" onClick={handleCopy}>
                                 <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" loading="lazy" width="24" height="24"/>
                                    <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">{contactDetails.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default About;
