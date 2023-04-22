'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { appAxios } from '@/utils/axios'
import { useToast } from '@chakra-ui/react'

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const toast = useToast()
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault()
    appAxios.post("/api/v1/auth/login", {
      email: email,
      password: password
    }, { withCredentials: true })
      .then(() => {
        toast({
          title: 'Giriş başarılı.',
          description: "Yönlendiriliyorsunuz...",
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
        setTimeout(() => {
          router.push("/")
        }, 1500)
      })
      .catch(err => {
        toast({
          title: 'Giriş Başarısız.',
          description: "Lütfen bilgilerinizi kontrol ediniz...",
          status: "warning",
          duration: 1000,
          isClosable: true,
        })
      })
  }



  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Hoşgeldiniz.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">

            <form onSubmit={handleLogin}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Parola</label>
                  <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="form-input w-full text-gray-300" placeholder="Parola (en az 6 karakter tavsiye edilir.)" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <span className="text-gray-400 ml-2" style={{ fontSize: "10px"}}>Parolanızı kimseyle paylaşmayınız.</span>
                    </label>
                    <Link href="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Parolamı Unuttum?</Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button type='submit' className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Giriş Yap</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Hesabınız yok mu ? <Link href="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Kayıt Ol</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
