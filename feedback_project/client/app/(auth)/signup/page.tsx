'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type City = {
  id: number;
  name: string;
};

type BusinessType = {
  id: number;
  name: string;
};

export default function SignUp() {
  const [cities, setCities] = useState([]);
  const [district, setDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedBusinessType, setSelectedBusinessType] = useState('');
  const [businessTypes, setBusinessTypes] = useState([]);

  const handleGetDistrict = (id: any) => {
    fetch(`http://localhost:5000/api/v1/city_district/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSelectedDistrict(data.districts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const citySelected = (e: any) => {
    setSelectedCity(e.target.value);
    handleGetDistrict(e.target.value);
  };

  const businessSelected = (e: any) => {
    setSelectedBusinessType(e.target.value);
  };

  const districtSelected = (e: any) => {
    setDistrict(e.target.value);
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/city_district/')
      .then((res) => res.json())
      .then((data) => {
        setCities(data.cities);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/businesses/')
      .then((res) => res.json())
      .then((data) => {
        setBusinessTypes(data.BusinesessTypes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(cities);
  }, [cities]);

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-16 md:pb-20">
          {/* Page header */}
          <div className="max-w-5xl mx-auto text-center pb-12 md:pb-12">
            <h1 className="h1">
              Hoşgeldiniz, buradan hesap oluşturma talebinde bulunabilirsiniz.
            </h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    İşletme Adı <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input w-full text-gray-800"
                    placeholder="İşletme Adı"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="address"
                  >
                    İşletme Adresi <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    className="form-input w-full text-gray-800"
                    placeholder="İşletme Adresi"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="city"
                  >
                    İşletme Tipi <span className="text-red-600">*</span>
                  </label>
                  <select
                    className="form-input w-full text-gray-800"
                    id="business"
                    value={selectedBusinessType}
                    onChange={businessSelected}
                  >
                    <option selected>İşletme Tipi Seçin</option>
                    {businessTypes.map((businessType: BusinessType) => (
                      <option key={businessType.id} value={businessType.id}>
                        {' '}
                        {businessType.name}{' '}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input w-full text-gray-800"
                    placeholder="Email adresi"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="city"
                  >
                    Şehir <span className="text-red-600">*</span>
                  </label>
                  <select
                    className="form-input w-full text-gray-800"
                    id="cities"
                    value={selectedCity}
                    onChange={citySelected}
                  >
                    <option selected>Şehir seçin</option>
                    {cities.map((city: City) => (
                      <option key={city.id} value={city.id}>
                        {' '}
                        {city.name}{' '}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="district"
                  >
                    İlçe <span className="text-red-600">*</span>
                  </label>
                  <select
                    className="form-input w-full text-gray-800"
                    id="district"
                    value={district}
                    onChange={districtSelected}
                  >
                    <option selected>İlçe seçin</option>
                    {selectedDistrict.map((district: any) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Parola <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full text-gray-800"
                    placeholder="Parola (En az 6 karakter tavsiye edilir.)"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                    Talep Oluştur
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center mt-3">
                By creating an account, you agree to the{' '}
                <a className="underline" href="#0">
                  terms & conditions
                </a>
                , and our{' '}
                <a className="underline" href="#0">
                  privacy policy
                </a>
                .
              </div>
            </form>
            <div className="flex items-center my-6">
              <div
                className="border-t border-gray-300 grow mr-3"
                aria-hidden="true"
              ></div>
              <div className="text-gray-600 italic">Or</div>
              <div
                className="border-t border-gray-300 grow ml-3"
                aria-hidden="true"
              ></div>
            </div>

            <div className="text-gray-600 text-center mt-6">
              Zaten hesabınız var mı?{' '}
              <Link
                href="/signin"
                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
