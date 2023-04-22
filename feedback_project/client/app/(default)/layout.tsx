'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

import PageIllustration from '@/components/page-illustration'
import Footer from '@/components/ui/footer'
import Header from '@/components/ui/header'
import Banner from '@/components/banner'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  return (
    <>
      <main className="grow">

        <PageIllustration />

        <div className="flex flex-col min-h-screen overflow-hidden">
          <Header />
          {children}
          <Banner />
        </div>
      </main>

      <Footer />
    </>
  )
}
