"use client";
import React, { useState } from 'react';
import clsx from "clsx";
import { useRouter } from 'next/navigation';
import TextHoverable from './TextHoverable';

type FormProps = {
  className?: string;
};

const Form: React.FC<FormProps> = ({ className }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    kelamin: '',
    umur: '',
    budget: '',
    profesi: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const queryArray = [];
    if (formData.kelamin) queryArray.push(formData.kelamin);
    if (formData.umur) queryArray.push(formData.umur);
    if (formData.budget) queryArray.push(formData.budget);
    if (formData.profesi) queryArray.push(formData.profesi);
    
    const query = queryArray.join('+');
    router.push(`/search?q=${query}`);
  };
  
  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className={clsx("w-full space-y-4", className)}
        >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="kelamin" className="hidden text-md font-medium text-gray-700">
              Kelamin
            </label>
            <select
              id="kelamin"
              name="kelamin"
              value={formData.kelamin}
              onChange={handleChange}
              className="w-full rounded-md focus:ring-indigo-500 text-md h-12 py-2 flex flex-row justify-between px-2 text-gray-700 bg-white border-2 border-white shadow focus:outline-none focus:border-blue-600"
            >
              <option value="">Pilih Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div>
            <label htmlFor="umur" className="hidden text-md font-medium text-gray-700">
              Umur
            </label>
            <select
              id="umur"
              name="umur"
              value={formData.umur}
              onChange={handleChange}
              className="w-full rounded-md focus:ring-indigo-500 text-md h-12 py-2 flex flex-row justify-between px-2 text-gray-700 bg-white border-2 border-white shadow focus:outline-none focus:border-blue-600"
            >
              <option value="">Pilih Umur</option>
              <option value="komputer">komputer</option>
              <option value="18-25">18-25</option>
              <option value="26-35">26-35</option>
              <option value="36-45">36-45</option>
              <option value="46-55">46-55</option>
              <option value="56-65">56-65</option>
              <option value="65+">65+</option>
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="hidden text-md font-medium text-gray-700">
              Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full rounded-md focus:ring-indigo-500 text-md h-12 py-2 flex flex-row justify-between px-2 text-gray-700 bg-white border-2 border-white shadow focus:outline-none focus:border-blue-600"
            >
              <option value="">Pilih Budget</option>
              <option value="buah">buah</option>
              <option value="0-1j">0-1j</option>
              <option value="1jt-2j">1jt-2j</option>
              <option value="3jt-4j">3jt-4j</option>
            </select>
          </div>

          <div>
            <label htmlFor="profesi" className="hidden text-md font-medium text-gray-700">
              Profesi
            </label>
            <select
              id="profesi"
              name="profesi"
              value={formData.profesi}
              onChange={handleChange}
              className="w-full rounded-md focus:ring-indigo-500 text-md h-12 py-2 flex flex-row justify-between px-2 text-gray-700 bg-white border-2 border-white shadow focus:outline-none focus:border-blue-600"
            >
              <option value="">Pilih Profesi</option>
              <option value="makanan">makanan</option>
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Pekerja">Pekerja</option>
              <option value="Pengusaha">Pengusaha</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
            <button
              type="submit"
              className="w-full"
            >
              <TextHoverable label="Submit" className='w-full'/>
            </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
