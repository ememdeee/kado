import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import ProductList from "./ProductList";

interface HomeProps {
  searchParams: {
    q?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  console.log(searchParams);
  const query = searchParams.q;
  let tags: string[] = [];
  if (typeof query === 'string') {
    tags = query.split(' ');
  }
  console.log(tags);

  const client = createClient();
  let documents = [];

  // Fetch documents based on tags
  if (tags.length > 0) {
    documents = await client.getAllByEveryTag(tags);
  } else {
    documents = await client.getAllByType('product');
  }

  const products = documents.filter(doc => doc.type === "product");

  return (
    <div className=''>
      <h1 className='font-bold text-center text-3xl'>Search Query: {query}</h1>
      <h2 className='font-bold text-center text-3xl'>Tags: {tags.join(", ")}</h2>
      <ProductList products={products as Content.ProductDocument[]} className="mt-4" />
    </div>
  );
}
