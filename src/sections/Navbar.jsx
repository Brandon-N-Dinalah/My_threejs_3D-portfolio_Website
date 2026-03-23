import { useState, useEffect } from "react";
import {navLinks} from "../constants/index.js";
import { Link } from "react-scroll";


const NavLinks = () => {
    return (
        <ul className="nav-ul">
            {navLinks.map(({id, href, name}) => (
                <li key={id} className="nav-li">
                    <Link to={href}
                       smooth={true}
                       duration={500}
                       spy={true}
                       offset={-80}
                       className="nav-li_a cursor-pointer">
                        {name}
                    </Link>
                </li>
            ))}

        </ul>
    )
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        const handleClickOutside = (e) => {
            if (isOpen && !e.target.closest('header')) setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <header className= "fixed top-0 left-0 right-0 z-50 bg-black/90">
            
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between py-5 mx-auto c-space">
                    <a href="/" className="text-neutral-400 font-bold text-3xl hover:text-white transition-colors">
                        BND Labs
                    </a>

                    <button onClick={toggleMenu}
                            className = "text-neutral-400 hover:text-white focus:outline-none sm:hidden flex" aria-label="Toggle menu">
                        <img src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
                             alt="toggle" className="w-6 h-6" width="24" height="24"/>
                    </button>

                     <nav className="sm:flex hidden">
                         <NavLinks />
                     </nav>
                </div>
            </div>

            <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
             <nav className="p-5">
                <NavLinks />
             </nav>
             </div>

        </header>
    )
}
export default Navbar;
