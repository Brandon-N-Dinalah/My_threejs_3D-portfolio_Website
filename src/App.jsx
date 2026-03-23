import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import { lazy, Suspense } from "react";
import SectionLoader from "./components/SectionLoader.jsx";
import { SpeedInsights } from "@vercel/speed-insights/next"

const About = lazy(() => import('./sections/About.jsx'));
const Projects = lazy(() => import('./sections/Projects.jsx'));
const Clients = lazy(() => import('./sections/Clients.jsx'));
const Contact = lazy(() => import('./sections/Contact.jsx'));
const Footer = lazy(() => import('./sections/Footer.jsx'));
const Experience = lazy(() => import('./sections/Experience.jsx'));

const App = () => {
    return (
        <main className="max-w-7xl mx-auto">
            <Navbar />
            <Hero />
            <Suspense fallback={<SectionLoader />}>
                <About />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <Projects />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <Clients />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <Experience />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <Contact />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
                <Footer />
            </Suspense>
        </main>
    );
};

export default App;
