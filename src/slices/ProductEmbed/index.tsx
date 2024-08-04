import React from "react";
import ProductBox from "@/component/ProductBox";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProductEmbed`.
 */
interface ProductRelation {
  id: string;
  type: string;
  tags: string[];
  lang: string;
  slug: string;
  first_publication_date: string;
  last_publication_date: string;
  uid: string;
  link_type: string;
  isBroken: boolean;
}

export type ProductEmbedProps = SliceComponentProps<Content.ProductsSlice>;

// Memoize client creation
const client = createClient();

const ProductEmbed = async ({ slice }: ProductEmbedProps): Promise<JSX.Element> => {
  // Check if product links exist and are not empty
  const items = slice?.items || [];
  if (items.length === 0) {
    return (
      <div className="prose prose-invert text-black text-base md:text-lg">
        No product selected
      </div>
    );
  }

  const products = await Promise.all(
    items.map(async (item, index) => {
      const productRelation = item.product_links as ProductRelation;

      try {
        const product = await client.getByID(productRelation.id);
        return (
          <ProductBox as="h5" key={product.id} product={product as Content.ProductDocument} index={index} />
        );
      } catch (error) {
        console.error("Error fetching product:", error);
        return (
          <div key={index} className="prose prose-invert text-black text-base md:text-lg">
            Error fetching product {productRelation.id}
          </div>
        );
      }
    })
  );

  const gridClasses = [
    "grid-cols-1 sm:grid-cols-1 lg:grid-cols-1",
    "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2",
    "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3",
    "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4",
    "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5",
  ];

  const gridColsClass = gridClasses[Math.min(products.length, 5) - 1];

  return (
    <div className={`w-fit mx-auto grid gap-y-4 gap-x-4 mt-10 mb-5 ${gridColsClass} justify-items-center`}>
      {products}
    </div>
  );
};

export default ProductEmbed;