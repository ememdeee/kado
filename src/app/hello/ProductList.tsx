import React from "react";
import clsx from "clsx";
import { Content } from "@prismicio/client";
import "@/app/globals.css";
import ProductBox from "@/component/ProductBox";

type ProductListProps = {
  products: Content.ProductDocument[];
  className?: string;
};

export default function ProductList({ products, className }: ProductListProps) {

  return (
    <div className={clsx("", className)}>
      <div className="w-fit mx-auto grid gap-y-20 gap-x-14 mt-10 mb-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {products.map((product, index) => (
          <ProductBox product={product} index={index} key={product.id} />
          ))}
      </div>
    </div>
  );
}