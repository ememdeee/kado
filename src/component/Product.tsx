import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import Link from 'next/link';
import React from 'react';

type ImageField = {
    image: any; // Replace 'any' with the appropriate type for the image field
  };
  
type DocumentData = {
    title: string;
    mainimage: any; // Replace 'any' with the appropriate type for the main image
    images: ImageField[];
    description: any; // Replace 'any' with the appropriate type for the description
    link: {
        url: string;
    };
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
    <div>
        <h1>{document.data.title}</h1>
        <span>{document.data.date}</span>
        <ul>
            {document.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
            ))}
        </ul>
        <PrismicNextImage field={document.data.mainimage}/>
        <ul>
            {document.data.images.map((images, index) => (
            <li key={index}>
                <PrismicNextImage field={images.image} />
            </li>
            ))}
        </ul>
        <PrismicRichText field={document.data.description} />
        <Link href={document.data.link.url}>Check Out Now!</Link>
    </div>
  );
};

export default Product;