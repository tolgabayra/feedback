'use client'

import { useState } from 'react'

export default function Banner() {
  const [bannerOpen, setBannerOpen] = useState<boolean>(true)

  return (
    <>
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60">
          <div className="bg-slate-800 text-slate-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
            <div className="text-slate-500 inline-flex">
              <a
                className="font-medium hover:underline text-slate-50"
                href="https://github.com/tolgabayra/feedback"
                target="_blank"
                rel="noreferrer"
              >
                Download<span className="hidden sm:inline"> on GitHub</span>
              </a>{' '}
             -
            </div>
            
          </div>
        </div>
      )}
    </>
  )
}
