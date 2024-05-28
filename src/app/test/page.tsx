// app/hello/page.tsx 

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
  console.log(tags)


  return (
    <div className=''>
      <h1 className='font-bold text-center text-3xl'>Search Query:  {query}</h1>
      <h2 className='font-bold text-center text-3xl'>Tags:  {tags.join(", ")}</h2>
    </div>
  );
}