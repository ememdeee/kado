// ImageContainer.tsx
import { PrismicNextImage } from '@prismicio/next';
import React from 'react';
import clsx from 'clsx';

interface ImageContainerProps {
  image: any;
  width?: number;
  height?: number;
  className?: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ image, width = '100%', height, className }) => {
const finalHeight = height ?? width;
  return (
    <div
      className={clsx('relative rounded-lg overflow-hidden shadow-md', className)}
      style={{ width, height: finalHeight  }}
    >
      <PrismicNextImage
        field={image}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageContainer;