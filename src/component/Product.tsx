'use client'
import { PrismicNextImage, PrismicNextImageProps } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import React, { useState } from 'react';
import Heading from './Heading';
import Bounded from './Bounded';
import Button from './Button';
// import ImageContainer from './ImageContainer';
// import { LinkField } from '@prismicio/client';


type ImageField = {
    image: any; // Replace 'any' with the appropriate type for the image field
  };
  
type DocumentData = {
    title: string;
    mainimage: any; // Replace 'any' with the appropriate type for the main image
    images: ImageField[];
    description: any; // Replace 'any' with the appropriate type for the description
    detail: any; // Replace 'any' with the appropriate type for the description
    price: any;
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
const [activeImg, setActiveImage] = useState(document.data.mainimage)

  return (
    <Bounded>
        <div className='flex flex-col justify-between lg:flex-row gap-10 lg:items-center mb-4 md:gap-16'>
            <div className='flex flex-col gap-6 lg:w-2/4'>
                <PrismicNextImage field={activeImg} className='w-full h-full aspect-square object-cover rounded-xl' />
                {/* <ImageContainer image={document.data.mainimage} width={500} /> */}
                <div className='flex flex-row justify-start gap-2 overflow-x-auto custom-scrollbar'>
                    <PrismicNextImage field={document.data.mainimage} className='w-24 h-24 rounded-md cursor-pointer object-cover md:w-28 md:h-28' onClick={()=> setActiveImage(document.data.mainimage)} />
                    {document.data.images.map((images, index) => (
                        <PrismicNextImage key={index} field={images.image} className='w-24 h-24 rounded-md cursor-pointer object-cover md:w-28 md:h-28' onClick={()=> setActiveImage(images.image)}/>
                        // <span key={index} className=''>
                        //     <ImageContainer image={images.image} width={400} />
                        // </span>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-4 lg:w-2/4'>
                <span className='text-yellow-400 font-bold'>{document.data.date}</span>
                <Heading>{document.data.title}</Heading>
                <PrismicRichText field={document.data.description} />
                <span className='text-3xl font-bold'>Rp. {document.data.price}</span>
                <div className='flex flex-col md:flex-row gap-2'>
                    {document.data.link_tokopedia.url && <Button linkField={document.data.link_tokopedia} label="Via Tokopedia!" />}
                    {document.data.link_shopee.url && <Button linkField={document.data.link_shopee} label="Via Shopee!" />}
                </div>
            </div>
        </div>
        <PrismicRichText field={document.data.detail} />
    </Bounded>
  );
};

export default Product;