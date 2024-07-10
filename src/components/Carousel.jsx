import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        "https://res.cloudinary.com/dkpq8jrtn/image/upload/v1720563180/ilbmhoasm6hxndg3gyx9.jpg",
        "https://res.cloudinary.com/dkpq8jrtn/image/upload/v1720563180/ilbmhoasm6hxndg3gyx9.jpg",
        "https://res.cloudinary.com/dkpq8jrtn/image/upload/v1720563180/ilbmhoasm6hxndg3gyx9.jpg",
        "https://res.cloudinary.com/dkpq8jrtn/image/upload/v1720563180/ilbmhoasm6hxndg3gyx9.jpg",
        "https://res.cloudinary.com/dkpq8jrtn/image/upload/v1720563180/ilbmhoasm6hxndg3gyx9.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [items.length]);

    const goToSlide = (index) => {
        setActiveIndex(index);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    return (
        <div id="default-carousel" className="relative w-full p-2" data-carousel="slide">
            <div className="relative min-h-96 overflow-hidden rounded-lg md:h-96">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                        data-carousel-item
                    >
                        <img src={item} className="absolute block w-96 h-96 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {items.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-gray-400'}`}
                        aria-current={index === activeIndex ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                        data-carousel-slide-to={index}
                    ></button>
                ))}
            </div>
            <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={prevSlide}
                data-carousel-prev
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={nextSlide}
                data-carousel-next
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default Carousel;
