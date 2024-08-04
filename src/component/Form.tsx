// component/Form.js
"use client";
import React, { useState } from 'react';
import clsx from "clsx";
import { useRouter } from 'next/navigation';
import TextHoverable from './TextHoverable';

type FormProps = {
  className?: string;
  isVisible: boolean;
  togglePopup: () => void;
};

const Form: React.FC<FormProps> = ({ className, isVisible, togglePopup }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    kelamin: '',
    umur: '',
    budget: '',
    budgetMin: '',
    budgetMax: '',
    profesi: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, ''); // Extract numeric value

    setFormData({ ...formData, [name]: numericValue });
  };

  const formatPriceDisplay = (value: string) => {
    if (!value) return '';
    return `Rp.${new Intl.NumberFormat('id-ID').format(Number(value))}`;
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const queryArray = [];
    if (formData.kelamin) queryArray.push(formData.kelamin);
    if (formData.umur) queryArray.push(formData.umur);
    if (formData.budget) queryArray.push(formData.budget);
    if (formData.budgetMin) queryArray.push(`Min_${formData.budgetMin}`);
    if (formData.budgetMax) queryArray.push(`Max_${formData.budgetMax}`);
    if (formData.profesi) queryArray.push(formData.profesi);
    
    const query = queryArray.join('+');
    router.push(`/search?q=${query}`);
  };
  
  const [isAdvanceVisible, setIsAdvanceVisible] = useState(false);
    
  const toggleAdvance = () => {
      setIsAdvanceVisible(prevState => !prevState);
  };

  return (
    <div className={`z-20 fixed inset-0 flex items-end justify-center px-4 bg-black bg-opacity-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white rounded-t-lg shadow-lg transform transition-transform duration-300 z-10 ${isVisible ? 'translate-y-0' : 'translate-y-full'} w-full max-w-5xl mx-auto p-4 py-8`}>
        <div className="flex flex-col justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Fill the Form</h2>
          <div className="flex justify-center items-center w-full max-w-screen-lg">
            <form onSubmit={handleSubmit} className={clsx("w-full space-y-4", className)}>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                <div className='shadow rounded-md overflow-hidden'>
                  <label htmlFor="kelamin" className="hidden text-md font-medium text-gray-700">Kelamin</label>
                  <select id="kelamin" name="kelamin" value={formData.kelamin} onChange={handleChange} className="w-full rounded-md focus:ring-indigo-500 text-md h-12 py-2 flex flex-row justify-between px-2 text-gray-700 bg-white border-2 border-white focus:outline-none focus:border-blue-600">
                    <option value="">Buat Siapa</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className='shadow rounded-md overflow-hidden'>
                  <label htmlFor="umur" className="hidden text-md font-medium text-gray-700">Umur</label>
                  <select id="umur" name="umur" value={formData.umur} onChange={handleChange} className="w-full rounded-md focus:ring-indigo-500 text-md h-12 py-2 flex flex-row justify-between px-2 text-gray-700 bg-white border-2 border-white focus:outline-none focus:border-blue-600">
                    <option value="">Usia Penerima</option>
                    <option value="New_Born">New Born</option>
                    <option value="1-5_Tahun">1-5 Tahun</option>
                    <option value="6-9_Tahun">6-9 Tahun</option>
                    <option value="10-16_Tahun">10-16 Tahun</option>
                    <option value="17-25_Tahun">17-25 Tahun</option>
                    <option value="26-32_Tahun">26-32 Tahun</option>
                    <option value="33-40_Tahun">33-40 Tahun</option>
                    <option value="40-50_Tahun">40-50 Tahun</option>
                    <option value="60+_Tahun">60+ Tahun</option>
                  </select>
                </div>
                <div className='shadow rounded-md overflow-hidden'>
                  <label htmlFor="budgetMin" className="hidden text-md font-medium text-gray-700">Budget Minimal</label>
                  <input id="budgetMin" name="budgetMin" type='text' placeholder='Budget Minmal' value={formatPriceDisplay(formData.budgetMin)} onChange={handlePriceChange} className="w-full rounded-md focus:ring-indigo-500 text-md h-12 py-2 flex flex-row justify-between px-2 text-gray-700 bg-white border-2 border-white focus:outline-none focus:border-blue-600 custom-placeholder" />
                </div>
                <div className='shadow rounded-md overflow-hidden'>
                  <label htmlFor="budgetMax" className="hidden text-md font-medium text-gray-700">Budget Maksimal</label>
                  <input id="budgetMax" type='text' name="budgetMax" placeholder='Budget Maksimal' value={formatPriceDisplay(formData.budgetMax)} onChange={handlePriceChange} className="w-full rounded-md focus:ring-indigo-500 text-md h-12 py-2 flex flex-row justify-between px-2 text-gray-700 bg-white border-2 border-white focus:outline-none focus:border-blue-600 custom-placeholder" />
                </div>
              </div>
              <div className='text-center underline cursor-pointer w-fit mx-auto' onClick={toggleAdvance}>Pilihan Tambahan</div>
              <div className={`grid grid-cols-1 sm:grid-cols-1 gap-1 transition-all duration-300 ease-in-out overflow-visible !mt-0 ${isAdvanceVisible ? 'max-h-40 opacity-100 !mt-4' : 'max-h-0 opacity-0'}`}>
                <div className='shadow rounded-md overflow-hidden'>
                  <label htmlFor="profesi" className="hidden text-md font-medium text-gray-700">Profesi</label>
                  <select id="profesi" name="profesi" value={formData.profesi} onChange={handleChange} className="w-full rounded-md focus:ring-indigo-500 text-md h-12 py-2 flex flex-row justify-between px-2 text-gray-700 bg-white border-2 border-white focus:outline-none focus:border-blue-600">
                    <option value="">Pilih Profesi</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Pekerja">Pekerja</option>
                    <option value="Pengusaha">Pengusaha</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <button onClick={togglePopup} type="submit" className="w-full">
                  <TextHoverable label="Cari Kado" className='w-full' />
                </button>
              </div>
            </form>
          </div>
          <button onClick={togglePopup} className="text-gray-500 hover:text-gray-800 transition absolute right-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className='overlay absolute w-full h-full z-0' onClick={togglePopup}></div>
    </div>
  );
};

export default Form;