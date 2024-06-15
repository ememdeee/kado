// component/ProductBox.tsx

import React from "react";
import Link from "next/link";
import { PrismicImage } from "@prismicio/react";
import Heading from "@/component/Heading";
import TextHoverable from "@/component/TextHoverable";
import FormatPrice from "@/component/FormatPrice";
import { Content } from "@prismicio/client";  // Assuming Content.ProductDocument comes from @prismicio/client

type ProductBoxProps = {
  product: Content.ProductDocument;
  index: number;
};

const ProductBox: React.FC<ProductBoxProps> = ({ product, index }) => {
  return (
    <Link
      href={`/${product.uid || '#'}`}
      passHref
      key={product.id}
      className="max-w-60 w-full zoomOut"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="h-full flex flex-col bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        {product.data.images?.[0] && (
          <PrismicImage
            field={product.data.images[0].image}
            className="w-full max-w-60 h-auto aspect-square object-cover rounded-t-xl"
          />
        )}
        <div className="px-2 md:px-4 py-3 flex flex-col h-full">
          <Heading as="h2" size="ssss" className="mb-auto heading-limit-2-lines">
            {product.data.title}
          </Heading>
          <span className="mt-2 text-lg md:text-xl font-bold">
            <FormatPrice value={product.data.price_new} />
          </span>
          <TextHoverable label="Details" className="mt-5" />
        </div>
      </div>
    </Link>
  );
};

export default ProductBox;