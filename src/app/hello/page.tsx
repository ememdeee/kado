// app/hello/page.tsx 

interface HomeProps {
  searchParams: {
    q?: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  console.log(searchParams)
  const query = searchParams.q;
  return (
    <div className=''>
      <h1 className='font-bold text-center text-3xl'>Search Query:  {query}</h1>
    </div>
  );
}