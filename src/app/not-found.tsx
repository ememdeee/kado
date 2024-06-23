import Heading from '@/component/Heading';
import Popup from '@/component/Popup';
import Link from 'next/link';
import { MdError } from 'react-icons/md';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-xl m-auto">
      <div className="text-center">
        <Heading className="mb-4 text-center flex justify-center items-center"><MdError className="text-red-500 text-7xl" />404</Heading>
        <p className="text-xl mb-6 text-slate-900">Oops! Halaman yang Anda cari tidak ditemukan. Coba cari yang Anda butuhkan di sini.</p>
        <Popup/>
        <Link href="/" className='block mt-8'>
          <span className="text-yellow-400 font-bold hover:underline text-lg">Kembali ke beranda</span>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;