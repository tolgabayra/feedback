'use client'

import { appAxios } from '@/utils/axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, CheckboxIcon, Select, useToast } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'


type City = {
  id: number,
  name: string
}


export default function SignUp() {
  const [submitted, setSubmitted] = useState(true)
  const [cityList, setCityList] = useState([])

  const [name, setName] = useState("")
  const [address, setAdress] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [district, setDistrict] = useState("")
  const [selectedCity, setSelectedCity] = useState()
  const [selectedDistrict, setSelectedDistrict] = useState([])

  const toast = useToast()

  const handleSignup = (e: any) => {
    e.preventDefault()
    appAxios.post("/api/v1/auth/register", {
      name,
      address,
      email,
      password,
      province_id: selectedCity,
      district_id: district
    }, { withCredentials: true })
      .then((res) => {
        setSubmitted(false)
        console.log(res);
      })
      .catch(err => {
        toast({
          title: 'İşlem Başarısız',
          description: "Şuan talebinizi oluşturamıyoruz.",
          status: 'error',
          duration: 3000,
          isClosable: true,
          
        })
        console.log(err);
      })
  }



  const handleGetDistrict = (id: any) => {
    appAxios.get(`/api/v1/city_district/${id}`)
      .then((res) => {

        console.log(res.data.districts);
        setSelectedDistrict(res.data.districts)

      })
      .catch(err => {
        console.log(err);

      })
  }


  const citySelected = (e: any) => {
    setSelectedCity(e.target.value)
    handleGetDistrict(e.target.value)
  }


  const districtSelected = (e: any) => {
    setDistrict(e.target.value)
  }


  useEffect(() => {
    console.log(selectedCity);

  }, [selectedCity])

  useEffect(() => {
    console.log(district);

  }, [district])



  useEffect(() => {
    appAxios.get("/api/v1/city_district/")
      .then((res) => {
        console.log(res);
        setCityList(res.data.cities)

      })
      .catch(err => {
        console.log(err);

      })
  }, [])


  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {
          submitted ? <div className="pt-32 pb-12 md:pt-10 md:pb-20">

            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">Hoşgeldiniz, buradan hesabınızı oluşturmak için talepte bulunabilirsiniz.</h1>
            </div>

            <div className="max-w-sm mx-auto">

              <form onSubmit={handleSignup}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">İşletme Adı <span className="text-red-600">*</span></label>
                    <input onChange={(e) => setName(e.target.value)} id="full-name" type="text" className="form-input w-full text-gray-300" placeholder="İşletmenizin adı" required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">İşletme Adresiniz <span className="text-red-600">*</span></label>
                    <input onChange={(e) => setAdress(e.target.value)} id="company-name" type="text" className="form-input w-full text-gray-300" placeholder="İşletme adresiniz" required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                    <input onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@example.com" required />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Parola <span className="text-red-600">*</span></label>
                    <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="form-input w-full text-gray-300" placeholder="Parola (en az 6 karakter tavsiye edilir.)" required />
                  </div>
                </div>

                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Şehir</label>
                <select value={selectedCity} onChange={citySelected} id="countries" className="bg-gray-800 border border-gray-300 text-gray-300 text-sm focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                  <option selected>Şehir seçin</option>
                  {
                    cityList.map((city: City) => <option value={city.id}> {city.name}</option>)
                  }
                </select>

                <label htmlFor="district" className="block mb-2 text-sm mt-3 font-medium text-gray-300 dark:text-white">İlçe</label>
                <select value={district} onChange={districtSelected} id="district" className="bg-gray-800 border border-gray-300 text-gray-300 text-sm focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500">
                  <option selected>İlçe seçin</option>
                  {
                    selectedDistrict.map((district: any) => <option value={district.id}> {district.name}</option>)
                  }
                </select>

                <div className="text-sm text-gray-500 text-center">
                  Hesap oluşturma talebinde bulunarak, gizlilik politikasını kabul ediyorsunuz. <Link href="#" className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button type='submit' className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Talep Oluştur</button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                Hesabınız var ise burdan giriş yapabilirsiniz <Link href="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Giriş Yap</Link>
              </div>
            </div>

          </div>
            :
            <div className='text-center'>
              <h1 className='text-center mt-4 text-4xl'>Oluşturma Talebiniz İletilmiştir</h1>
              <CheckCircleIcon textColor="green.300" w="9" h="9" />
              <p className='text-center mt-1'>Hesabınızın Onaylanması halinde sizinle iletişime geçeceğiz...</p>
              <div>
                <Link className='flex justify-center mt-6 hover:underline' href="/">Geri dön</Link>
              </div>
            </div>
        }
      </div>
    </section>
  )
}
