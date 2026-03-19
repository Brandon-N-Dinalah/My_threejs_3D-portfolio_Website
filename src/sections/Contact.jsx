import  {useRef, useState} from 'react'
import emailjs from '@emailjs/browser';
import { contactDetails } from "../constants/index.js";

const Contact = () => {
    const formRef = useRef();

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = ({ target: {name, value}}) => {
        setForm({...form, [name]: value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: 'Brandon',
                    from_email: form.email,
                    to_email: contactDetails.personalEmail,
                    message: form.message
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                )

            setLoading(false);
            alert('Thank you for your message!😃')

           setForm({
               name: '',
               email:'',
               message:''
           })
        } catch (error){
            setLoading(false);
            console.error(error);
            alert('I did not receive your message!😢')
        }
    }

    return (
        <section className="c-space my-20" id="contact">
            <div className="relative min-h-screen flex items-center justify-center flex-col">
            <picture>
                <source srcSet="/assets/terminal.webp" type="image/webp" />
                <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 min-h-screen" loading="lazy" width="1024" height="768"/>
            </picture>
                <div className="contact-container">
                    <h3 className="head-text">Let&apos;s Talk</h3>
                    <p className="text-lg text-white-600 mt-3">Whether you&apos;re looking to build a new website, improve your existing platform, or bring a unique project to life, I&apos;m here to help.</p>

                    <div className="flex gap-4 mt-8 flex-col sm:flex-row">
                        <a href={contactDetails.whatsappUrl} target="_blank" rel="noreferrer" className="field-btn flex-1 !bg-green-600 hover:!bg-green-700 transition-[background-color]">
                            WhatsApp Me
                        </a>
                        <a href={`mailto:${contactDetails.email}`} className="field-btn flex-1 hover:bg-black-600 transition-[background-color]">
                            Email Me
                        </a>
                    </div>

                    <div className="flex items-center my-8">
                        <div className="flex-grow border-t border-black-300"></div>
                        <span className="flex-shrink-0 mx-4 text-white-500">Or send a message</span>
                        <div className="flex-grow border-t border-black-300"></div>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className='space-y-3'>
                            <span className="field-label">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="John Doe"
                            />
                        </label>
                        <label className='space-y-3'>
                            <span className="field-label">Email</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="johndoe@gmail.com"
                            />
                        </label>
                        <label className='space-y-3'>
                            <span className="field-label">Your Message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input"
                                placeholder="Hi, I&apos;m intrested in..."
                            />
                        </label>

                        <button className="field-btn" type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                            <picture>
                                <source srcSet="/assets/arrow-up.webp" type="image/webp" />
                                <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" loading="lazy" width="12" height="12"/>
                            </picture>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Contact;
