import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Clients from "./sections/Clients.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";
import {BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate} from "react-router-dom";
import {useEffect} from "react";
import {navLinks} from "./constants/index.js";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const currentPath = location.pathname;

        const matchingNavLink = navLinks.find((link) => link.href === currentPath);

        if (matchingNavLink) {
            const element = document.getElementById(matchingNavLink.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else if (currentPath === '/') {
                navigate("/home")
            }
        }
    }, [location]);

    return (
    <>
        {children}
        <About />
        <Projects />
        <Clients />
        <Experience />
        <Contact />
        <Footer />
    </>
)
}
const App = () => {
return (

    <BrowserRouter>
        <main className="max-w-7xl mx-auto">
            <Navbar />
            <Routes>
                <Route path="/home" element={<Layout><Hero /></Layout>} />
                    <Route path="/about" element={<Layout><About /></Layout>} />
                    <Route path="/work" element={<Layout><Experience /></Layout>} />
                    <Route path="/contact" element={<Layout><Contact /></Layout>} />
                    <Route path="/*" element={<Navigate to="/home"/>} />
            </Routes>


        </main>
    </BrowserRouter>


)
}
export default App;
