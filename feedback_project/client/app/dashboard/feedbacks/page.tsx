'use client'

import { Accordion, Button, Divider, SimpleGrid, ThemeIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { type } from 'os'
import React, { useEffect, useState } from 'react'


type FeedbackPage = {
  id: number,
  url_token: string,
  created_at: Date,
  expire_time: Date
}

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbackPages, setFeedbackPages] = useState([])


  useEffect(() => {
    const handleGetFeedbackPage = async () => {
      const res = await fetch("http://localhost:5000/api/v1/feedback_pages", {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()
      setFeedbackPages(data.Feedbacks)
    }
    handleGetFeedbackPage();
  }, [])


  const handleCreateFeedbackPage = async () => {
    const res = await fetch("http://localhost:5000/api/v1/feedback_pages", {
      method: "POST",
      credentials: "include"
    })
    const data = await res.json()

  }


  return (
    <div>
      <div className='bg-gray-50'>
        <div className='p-3'>
          <div className='mb-10'>
            <Button mb="xl" ml="md" variant='outline'>Oluştur</Button>
            {
              feedbackPages.map((feedbackPage: FeedbackPage) => (
                <Accordion>
                  <Accordion.Item value="customization">
                    <Accordion.Control> {feedbackPage.id}. Token </Accordion.Control>
                    <Accordion.Panel><span className='text-blue-800'>Url Adresi: </span> <Link className='hover:underline hover:text-blue-600' href={`http://localhost:3000/send-feedbacks/${feedbackPage.url_token}`}>  {`http://localhost:3000/send-feedbacks/${feedbackPage.url_token}`} </Link>  </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              ))
            }
          </div>
          <h3 className='text-xl text-center mb-1 font-medium hover:text-gray-800'>Geri bildirimleriniz burda görünür</h3>
          <Divider size="xs" />
          <div className="container mt-4 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="card m-2 border border-gray-400 rounded-sm hover:shadow-md hover:border-opacity-50 transform hover:-translate-y-1 transition-all duration-200">
                <Button className='ml-1 mt-1 w-10' variant="outline" color="red" radius="xs" size="xs" compact>
                  Sil
                </Button>
                <div className="m-3">

                  <h2 className="text-lg mb-2">Harika Tatlı
                    <span className="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-sm px-3 mt-1 align-top float-right animate-pulse">Tag</span>
                  </h2>
                  <Divider mb="xs" />
                  <p className="font-light cursor-text font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds.</p>
                </div>
                <div>
                  <Divider />

                  <p className='ml-3 text-sm'>
                    2022 5 Mayıs 18:56
                  </p>
                </div>


              </div>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}