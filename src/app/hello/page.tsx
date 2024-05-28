// src/app/hello/page.tsx 
 // Adjust the import path as needed

import GalleryIndex from "@/slices/CustomSlice";

interface HomeProps {
  searchParams: {
    q?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const query = searchParams.q;
  let tags: string[] = [];
  if (typeof query === 'string') {
    tags = query.split(' ');
  }

  return (
    <div className=''>
      <h1 className='font-bold text-center text-3xl'>Search Query: {query}</h1>
      <h2 className='font-bold text-center text-3xl'>Tags: {tags.join(", ")}</h2>
      {/* Call GalleryIndex component and pass the tags array */}
      <GalleryIndex tags={tags} />
    </div>
  );
}
