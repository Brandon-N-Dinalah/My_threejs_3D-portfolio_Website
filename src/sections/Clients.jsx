import { useEffect } from "react";
import {clientReviews} from "../constants/index.js";

const getClientTag = (name) => {
    switch(name) {
        case 'Mildred Musonda': return "Digital presence overhaul";
        case 'Victor Temba': return "E-commerce growth system";
        case 'Kasweka Kachaka': return "Custom web platform";
        case 'Ethel Phiri': return "Full-stack development";
        default: return "";
    }
};

const Clients = () => {
    useEffect(() => {
        const cards = document.querySelectorAll('.client-review');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('client-review--visible');
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        cards.forEach(card => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    return (
        <section className="c-space my-20" id="clients">
            <h3 className="head-text">What Zambian businesses say</h3>

            <div className="client-container">
                {clientReviews.map(({id, name, review, img, position}) => (
                    <div key={id} className="client-review">

                        <div>
                            <p className="text-white font-light">{review}</p>

                            <div className="client-content">
                                <div className="flex gap-3">
                                    <picture>
                                        <source srcSet={img.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
                                        <img src={img} alt={name} className="reviewer-avatar w-12 h-12 rounded-full" loading="lazy" width="48" height="48"/>
                                    </picture>
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-white-800">{name}</p>
                                        <p className="text-white-500 md:text-base text-sm">{position}</p>
                                        <div className="client-tag">{getClientTag(name)}</div>
                                    </div>
                                </div>

                                <div className="flex self-end items-center gap-2 star-row">
                                    {Array.from({length: 5}).map((_, index) => (
                                        <picture key={index}>
                                            <source srcSet="/assets/star.webp" type="image/webp" />
                                            <img src="/assets/star.png" alt="star" className="w-5 h-5" loading="lazy" width="20" height="20"/>
                                        </picture>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    )
}
export default Clients
