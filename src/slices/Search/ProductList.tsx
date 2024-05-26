"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Content } from "@prismicio/client";
import "@/app/globals.css";
import Link from "next/link";
import TextHoverable from "@/component/TextHoverable";
import Heading from "@/component/Heading";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import Button from "@/component/Button";

type ProductListProps = {
  products: Content.ProductDocument[];
  className?: string;
};

export default function ProductList({ products, className }: ProductListProps) {

  return (
    <div className={clsx("", className)}>
      <div className="w-fit mx-auto grid gap-y-20 gap-x-14 mt-10 mb-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {products.map(product => (
            <Link href={product.uid} passHref key={product.id} className="max-w-72 w-full">
              <div className="bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                <PrismicImage field={product.data.mainimage} className="h-80 object-cover rounded-t-xl" />
                <div className="px-4 py-3">
                  <Heading as="h2" size="ss" className="mb-2">
                    {product.data.title}
                  </Heading>
                  <div className="max-h-5 overflow-hidden">
                    <PrismicRichText field={product.data.description} />
                  </div>
                  <TextHoverable label="Details" className="mt-5" />
                </div>
              </div>
            </Link>
          ))}
      </div>
      {/* show selected tag - for debugging maybe? */}
      {/* <p className="mt-4 text-center">Selected Tags:</p>
      <div className="flex flex-wrap gap-2 justify-center">
      <div className="mt-4">
       {selectedTags.map(tag => (
        <span key={tag} className="group relative inline-block overflow-hidden px-3 py-1 text-base font-bold text-slate-900 rounded-md border-2 border-slate-900 mr-1 bg-yellow-300">
          {tag}
        </span>
        ))}
      </div>
      </div> */}
    </div>
  );
}
