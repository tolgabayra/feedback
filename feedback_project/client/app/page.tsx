'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 h-screen">
        <nav className="container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
          <div className="flex items-center justify-between"></div>

          <div className="absolute inset-x-0 z-20 w-auto px-6 py-4 transition-all duration-300 ease-in-out bg-white  lg:bg-transparent lg:dark:bg-transparent lg:shadow-none dark:bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
            <Link
              href="/signin"
              className="block px-5 py-2 mt-4 w-auto text-sm text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
            >
              Giriş Yap
            </Link>
          </div>
        </nav>

        <div className="container px-6 py-16 mx-auto text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
              Geri bildirimleri takip etmek çok kolay
            </h1>
            <p className="mt-6 text-gray-500 dark:text-gray-300">
              Müşterilerinden gelen öneri,şikayet,tebrik gibi bildirimleri takip
              edip daha iyi hizmet sunmak için çalışıyoruz
            </p>
            <button className="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
              Başlayalım
            </button>
            <p className="mt-3 text-sm text-gray-400 ">
              Kısa bir süre için ücretsiz
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <img
              className="object-cover w-full h-96 rounded-xl lg:w-4/5"
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
            />
          </div>
        </div>
      </section>
    </>
  );
}
