'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, notification, Space } from 'antd';

export default function SignIn() {
  const [api, contextHolder] = notification.useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      if (response.status === 200) {
        router.push("/dashboard")
      }
    } catch (err) {
      console.log(err);
      api.open({
        message: 'Opps!',
        description: 'Email veya parolanız yanlış.',
        type: 'warning',
        duration: 1.5
      });
    }

  }




  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      {contextHolder}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-16 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1">Hoşgeldiniz</h1>
          </div>
          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleLogin}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="form-input w-full text-gray-800" placeholder="Email adresinizi giriniz" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Parola</label>
                    <Link href="/reset-password" className="text-sm font-medium text-blue-600 hover:underline">Parolamı Unuttum ?</Link>
                  </div>
                  <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="form-input w-full text-gray-800" placeholder="Parolanızı giriniz" required />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Giriş Yap</button>
                </div>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div className="border-t border-gray-300 grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-600 italic">Or</div>
              <div className="border-t border-gray-300 grow ml-3" aria-hidden="true"></div>
            </div>
            <div className="text-gray-600 text-center mt-6">
              Hesabınız Yok Mu? <Link href="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
