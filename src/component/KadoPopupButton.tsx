// component/KadoPopupButton.js
'use client'
import React, { useState } from 'react';
import Form from './Form';
import Button from './Button';
import { KeyTextField } from '@prismicio/client';

type KadoPopupButtonProps = {
  label: KeyTextField;
  className?: string;
  showIcon?: boolean;
};

const KadoPopupButton = ({ label, className, showIcon = true }: KadoPopupButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const togglePopup = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <div className='text-center'>
      <div className="" onClick={togglePopup}>
        <Button
          label={label}
          className={className}
          showIcon={showIcon}
        />
      </div>
      <Form isVisible={isVisible} togglePopup={togglePopup} />
    </div>
  );
};

export default KadoPopupButton;