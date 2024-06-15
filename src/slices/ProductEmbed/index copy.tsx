import ProductBox from "@/component/ProductBox";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProductEmbed`.
 */
// Define a type for the product relation
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
  // Add more properties as needed
}

export type ProductEmbedProps = SliceComponentProps<Content.ProductsSlice>;

/**
 * Component for "ProductEmbed" Slices.
 */
const ProductEmbed = async ({ slice }: ProductEmbedProps): Promise <JSX.Element> => {
  const client = createClient();
  console.log(slice.items[0].product_links)
  const productRelation = slice.primary.product_link as ProductRelation;
//   const productsRelation = slice.primary.product_links as ProductRelation;
  // console.log(productRelation)
  if (productRelation) {
      try {
          // Fetch the product document using the ID from productRelation
          const product = await client.getByID(productRelation.id);

          return (
              <div className="w-fit mx-auto grid gap-y-4 gap-x-4 mt-10 mb-5 grid-cols-1 justify-items-center">
                  <ProductBox product={product as Content.ProductDocument} index={1} />
              </div>
          );
      } catch (error) {
          console.error("Error fetching product:", error);
          return (
              <div className="prose prose-invert text-black text-base md:text-lg">
                  Error fetching product
              </div>
          );
      }
  } else {
      return (
          <div className="prose prose-invert text-black text-base md:text-lg">
              No product selected
          </div>
      );
  }
};

export default ProductEmbed;
