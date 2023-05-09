'use client'

import { Button, Divider, SimpleGrid, ThemeIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'


export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([])




  useEffect(() => {
    const handleGetFeedback = async () => {
      const res = await fetch("http://localhost:5000/api/v1/feedbacks", {
        method: "GET",
        credentials: "include"
      })
      console.log(res);
      
      const data = await res.json()
      setFeedbacks(data)
    }
    handleGetFeedback();
  }, [])


  return (
    <div>
      <div className='bg-gray-50'>
        <div className='p-4'>
          <h3 className='text-xl text-center mb-1'>Geri bildirimleriniz burda görünür</h3>
          <Divider size="xs" />
          <div className="container mt-4 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="card m-2 border border-gray-400 rounded-sm hover:shadow-md hover:border-opacity-50 transform hover:-translate-y-1 transition-all duration-200">
                <Button className='ml-1 mt-1 w-10' variant="outline" color="red" radius="xs" size="xs" compact>
                  Sil
                </Button>
                <div className="m-3">

                  <h2 className="text-lg mb-2">Harika Tatlı
                    <span className="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-xl px-3 mt-1 align-top float-right animate-pulse">Tag</span>
                  </h2>
                  <Divider my="xs" label="Label in the center" labelPosition="center" />
                  <p className="font-light cursor-text font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds.</p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}