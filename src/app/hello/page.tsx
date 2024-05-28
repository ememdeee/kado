import { Content } from "@prismicio/client";
import GalleryIndex from "./GalleryIndex";
import { createClient } from "@/prismicio";

interface HomeProps {
  searchParams: {
    q?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  console.log(searchParams)
  const query = searchParams.q;
  let tags: string[] = [];
  if (typeof query === 'string') {
    tags = query.split(' ');
  }
  console.log(tags);

  // Fetch products based on tags here if you prefer not to handle it inside GalleryIndex
  const products = await fetchProductsByTags(tags);

  return (
    <div className=''>
      <h1 className='font-bold text-center text-3xl'>Search Query: {query}</h1>
      <h2 className='font-bold text-center text-3xl'>Tags: {tags.join(", ")}</h2>
      <GalleryIndex tags={tags} products={products as Content.ProductDocument[]} />
    </div>
  );
}

async function fetchProductsByTags(tags: string[]) {
  const client = createClient();
  if (tags.length > 0) {
    return await client.getAllByEveryTag(tags);
  } else {
    return await client.getAllByType('product');
  }
}
