// app/hello/page.tsx

import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import ProductList from "./ProductList";

interface HomeProps {
  searchParams: {
    q?: string;
  };
}

const hello = async ({ searchParams }: HomeProps): Promise<JSX.Element> => {
  console.log(searchParams);
  const query = searchParams.q;
  let tags: string[] = [];
  if (typeof query === 'string') {
    tags = query.split(' ');
  }
  console.log(tags);

  const client = createClient();
  const documents = await client.getAllByEveryTag(tags.length > 0 ? tags : [""]);
  const products = documents.filter(doc => doc.type === "product");

  return (
    <div className=''>
      <h1 className='font-bold text-center text-3xl'>Search Query: {query}</h1>
      <h2 className='font-bold text-center text-3xl'>Tags: {tags.join(", ")}</h2>
      <ProductList products={products as Content.ProductDocument[]} className="mt-4" />
    </div>
  );
}

export default hello;