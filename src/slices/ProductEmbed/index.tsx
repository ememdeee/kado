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

const ProductEmbed = async ({ slice }: ProductEmbedProps): Promise<JSX.Element> => {
  const client = createClient();

  // Check if product links exist and are not empty
  if (slice.items && slice.items.length > 0) {
    const products = await Promise.all(
      slice.items.map(async (item, index) => {
        const productRelation = item.product_links as ProductRelation;

        // Fetch the product document using the ID from productRelation
        try {
          const product = await client.getByID(productRelation.id);
          return (
            <ProductBox key={product.id} product={product as Content.ProductDocument} index={index} />
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

    const numberOfProducts = products.length;
    let gridColsClass;

    if (numberOfProducts === 1) {
      gridColsClass = "grid-cols-1 sm:grid-cols-1 lg:grid-cols-1"; {/* if product 1 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 */}
    } else if (numberOfProducts === 2) {
      gridColsClass = "grid-cols-2 sm:grid-cols-2 lg:grid-cols-2"; {/* if product 2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 */}
    } else if (numberOfProducts === 3) {
      gridColsClass = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"; {/* if product 3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 */}
    } else if (numberOfProducts === 4) {
      gridColsClass = "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4"; {/* if product 4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 */}
    } else if (numberOfProducts >= 5) {
      gridColsClass = "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5"; {/* if product 5 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 */}
    }

    return (
        <div className={`w-fit mx-auto grid gap-y-4 gap-x-4 mt-10 mb-5 ${gridColsClass} justify-items-center`}>        
        {products}
      </div>
    );
  } else {
    return (
      <div className="prose prose-invert text-black text-base md:text-lg">
        No product selected
      </div>
    );
  }
};

export default ProductEmbed;
