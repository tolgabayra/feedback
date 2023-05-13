'use client'
import { Grid } from '@mantine/core'
import React, { useEffect, useState } from 'react'

type Counts = {
  Tebrik: number,
  Öneri: number,
  İstek: number,
  Şikayet: number
}

export default function page() {
  const [totalFeedback, setTotalFeedback] = useState(0)
  const [counts, setCounts] = useState<Counts>()


  useEffect(() => {
    const getFeedbackCounts = async () => {
      const res = await fetch("http://localhost:5000/api/v1/feedbacks/count", {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()
      console.log(data);
      if (res.ok) {
        setTotalFeedback(data.total)
        setCounts(data.counts)
      }
    }
    getFeedbackCounts()
  }, [])

  return (
    <div>
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-3">
        <div className="text-center md:border-b pb-3">
          <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl"> {totalFeedback} </h6>
          <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
            Toplam Geri Bildirim
          </p>
        </div>
        <div className="grid grid-cols-2 row-gap-8 md:grid-cols-4 mt-3">
          <div className="text-center md:border-r">
            <h6 className="text-3xl font-bold lg:text-4xl xl:text-5xl"> {counts?.Tebrik} </h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Tebrik
            </p>
          </div>
          <div className="text-center md:border-r">
            <h6 className="text-3xl font-bold lg:text-4xl xl:text-5xl"> {counts?.Öneri} </h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Öneri
            </p>
          </div>
          <div className="text-center md:border-r">
            <h6 className="text-3xl font-bold lg:text-4xl xl:text-5xl"> {counts?.İstek} </h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              İstek
            </p>
          </div>
          <div className="text-center">
            <h6 className="text-3xl font-bold lg:text-4xl xl:text-5xl"> {counts?.Şikayet} </h6>
            <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
              Şikayet
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}