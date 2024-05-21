import { PrismicNextImage, PrismicNextImageProps } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import React from 'react';
import Heading from './Heading';
import Bounded from './Bounded';
import Button from './Button';
import ImageContainer from './ImageContainer';


type ImageField = {
    image: any; // Replace 'any' with the appropriate type for the image field
  };
  
type DocumentData = {
    title: string;
    mainimage: any; // Replace 'any' with the appropriate type for the main image
    images: ImageField[];
    description: any; // Replace 'any' with the appropriate type for the description
    detail: any; // Replace 'any' with the appropriate type for the description
    link: any;
    date: any;
};
  
type ProductProps = {
    document: {
        data: DocumentData;
        tags: any[];
    };
};

const Product: React.FC<ProductProps> = ({ document }) => {
  return (
    <Bounded>
        <Heading>{document.data.title}</Heading>
        <ImageContainer image={document.data.mainimage} width={500} />
        <span>{document.data.date}</span>
        <ul>
            {document.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
            ))}
        </ul>
        <div className='flex gap-2'>
            {document.data.images.map((images, index) => (
            <span key={index} className=''>
                <ImageContainer image={images.image} width={400} />
            </span>
            ))}
        </div>
        <PrismicRichText field={document.data.description} />
        <Button linkField={document.data.link} label="Check Out Now!" />
        <PrismicRichText field={document.data.detail} />
    </Bounded>
  );
};

export default Product;