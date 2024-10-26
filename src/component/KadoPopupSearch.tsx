// component/KadoPopupSearch.js
'use client'
import clsx from 'clsx';
import React, { useState } from 'react';
import Form from './Form';
import { MdSearch } from 'react-icons/md';

const KadoPopupSearch = () => {
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
                <p className="text-gray-500 text-base md:text-lg">Cari Kado...</p>
            </div>
            <Form isVisible={isVisible} togglePopup={togglePopup} />
        </div>
    );
};

export default KadoPopupSearch;