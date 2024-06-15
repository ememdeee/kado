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
  const productRelation = slice.primary.product_link as ProductRelation;
  // console.log(productRelation)
  if (productRelation) {
      try {
          // Fetch the product document using the ID from productRelation
          const product = await client.getByID(productRelation.id);

          return (
              <div>
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
