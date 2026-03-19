import {clientReviews} from "../constants/index.js";

const Clients = () => {
    return (
        <section className="c-space my-20" id="clients">
            <h3 className="head-text">Here from my clients</h3>

            <div className="client-container">
                {clientReviews.map(({id, name, review, img, position}) => (
                    <div key={id} className="client-reviews">

                        <div>
                            <p className="text-white font-light">{review}</p>

                            <div className="client-content">
                                <div className="flex gap-3">
                                    <picture>
                                        <source srcSet={img.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
                                        <img src={img} alt={name} className="w-12 h-12 rounded-full" loading="lazy" width="48" height="48"/>
                                    </picture>
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-white-800">{name}</p>
                                        <p className="text-white-500 md:text-base text-sm">{position}</p>
                                    </div>
                                </div>

                                <div className="flex self-end items-center gap-2">
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
