// component/Popup.js
'use client'
import clsx from 'clsx';
import React, { useState } from 'react';
import Form from './Form';
import { MdSearch } from 'react-icons/md';

const Popup = () => {
    const [isVisible, setIsvisble] = useState(false);
    
    const togglePopup = () => {
        setIsvisble(prevstate => !prevstate);
    };
    return (
        <div className='text-center'>
            <div
            className="w-full max-w-3xl px-4 py-2 mx-auto bg-white rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 flex items-center space-x-2 border border-gray-200"
            onClick={togglePopup}
            >
                <MdSearch className="text-gray-500 text-xl md:text-2xl" />
                <p className="text-gray-500 text-base md:text-lg">Search...</p>
            </div>
            <div className={`z-20 fixed inset-0 flex items-end justify-center px-4 bg-black bg-opacity-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`bg-white rounded-t-lg shadow-lg transform transition-transform duration-300 z-10 ${isVisible ? 'translate-y-0' : 'translate-y-full'} w-full max-w-5xl mx-auto p-4 py-8`}>
                    <div className="flex flex-col justify-between items-center">
                        <h2 className="text-xl font-semibold mb-4">Fill the Form</h2>
                        <Form/>
                        <button onClick={togglePopup} className="text-gray-500 hover:text-gray-800 transition absolute right-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='overlay absolute w-full h-full z-0' onClick={togglePopup}></div>
            </div>
        </div>
    );
};

export default Popup;