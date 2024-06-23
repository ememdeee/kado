'use client'
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import React, { useState, useRef, useEffect } from 'react';
import Heading from './Heading';
import Bounded from './Bounded';
import Button from './Button';
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import FormatPrice from './FormatPrice';

import { MdSend } from "react-icons/md";
import { MdLink } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdForward } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import TextHoverable from './TextHoverable';
import PopupText from './PopupText';

type ImageField = {
    image: any; // Replace 'any' with the appropriate type for the image field
};

type DocumentData = {
    title: string;
    images: ImageField[];
    description: any; // Replace 'any' with the appropriate type for the description
    detail: any; // Replace 'any' with the appropriate type for the description
    price_new: any;
    link_tokopedia: any;
    link_shopee: any;
    date: any;
};

type ProductProps = {
    document: {
        data: DocumentData;
        tags: any[];
    };
};

const Product: React.FC<ProductProps> = ({ document }) => {
    const [activeImg, setActiveImage] = useState(document.data.images[0].image);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // State to control the read more functionality
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Function to handle scrolling to the right
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                top: 0,
                left: 150,
                behavior: 'smooth'
            });
        }
    };

    // Function to handle scrolling to the left
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                top: 0,
                left: -150,
                behavior: 'smooth'
            });
        }
    };

    // Function to check scroll position
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
        }
    };

    useEffect(() => {
        // Check the initial position
        checkScrollPosition();

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            // Add scroll event listener
            scrollContainer.addEventListener('scroll', checkScrollPosition);
            return () => {
                // Clean up the event listener
                scrollContainer.removeEventListener('scroll', checkScrollPosition);
            };
        }
    }, []);

    // Function to handle Read More toggle
    const handleReadMoreToggle = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handlePopupTextClick = () => {
        // Trigger the popup to show and reset it
        setShowPopup(false);  // Reset the state
        setTimeout(() => setShowPopup(true), 0); // Set it to true in the next tick to ensure the state change is noticed
        navigator.clipboard.writeText(window.location.href);
      };

    return (
        <Bounded>
            <div className='flex flex-col justify-between lg:flex-row gap-10 lg:items-start mb-4 md:gap-16'>
                <div className='flex flex-col gap-6 lg:w-1/3 lg:top-20 lg:sticky'>
                    <PrismicNextImage field={activeImg} className='w-full h-full aspect-square object-cover rounded-xl' />
                    <div className='relative'>
                        <div ref={scrollContainerRef} className='flex flex-row justify-start gap-2 overflow-x-auto custom-scrollbar lg:overflow-hidden'>
                            {document.data.images.map((images, index) => (
                                <PrismicNextImage key={index} field={images.image} className='w-24 h-24 rounded-md cursor-pointer object-cover md:w-28 md:h-28' onClick={() => setActiveImage(images.image)} />
                            ))}
                        </div>
                        {/* Left Scroll Button, only show if not at start */}
                        {document.data.images.length > 3 && !isAtStart && (
                            <button 
                                className='absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-yellow-300 text-black rounded-md shadow-lg hidden lg:flex items-center justify-center'
                                onClick={scrollLeft}
                            >
                                <MdArrowBack />
                            </button>
                        )}
                        {/* Right Scroll Button, only show if not at end */}
                        {document.data.images.length > 3 && !isAtEnd && (
                            <button 
                                className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-yellow-300 text-black rounded-md shadow-lg hidden lg:flex items-center justify-center'
                                onClick={scrollRight}
                            >
                                <MdArrowForward />
                            </button>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-4 lg:w-2/3'>
                    <Heading size="md" >{document.data.title}</Heading>
                    {/* <PrismicRichText field={document.data.description} /> */}
                    <div>
                        <PrismicRichText field={showFullDescription ? document.data.description : document.data.description.slice(0, 4)} />
                        {document.data.description.length > 4 && (
                            <span onClick={handleReadMoreToggle} className="block cursor-pointer underline">
                                {showFullDescription ? "Read Less" : "Read More"}
                            </span>
                        )}
                    </div>
                    <div className=''>
                        <span className='text-yellow-400 font-bold block mb-2'>Start From</span>
                        <span className='text-3xl font-bold block'><FormatPrice value={document.data.price_new} /></span>
                    </div>
                    <div className='flex flex-col md:items-center md:flex-row gap-2'>
                        {document.data.link_tokopedia.url && <Button linkField={document.data.link_tokopedia} label="Via Tokopedia!" />}
                        {document.data.link_shopee.url && <Button linkField={document.data.link_shopee} label="Via Shopee!" />}
                        {/* <span onClick={handlePopupTextClick}><TextHoverable className='px-4 py-2 cursor-pointer'>Minta Beli-in! <MdLink /></TextHoverable></span> */}
                        <span onClick={handlePopupTextClick} className='cursor-pointer underline text-base font-bold text-slate-900 flex gap-1 items-center'>Minta Beli-in! <MdLink /></span>
                    </div>
                </div>
            </div>
            <PrismicRichText field={document.data.detail} />
            <PopupText message="Link Copied" show={showPopup} />
        </Bounded>
    );
};

export default Product;
