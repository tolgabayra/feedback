'use client'

import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Accordion, Button, Divider } from '@mantine/core'
import Link from 'next/link'
import { notifications } from '@mantine/notifications'

type FeedbackPage = {
  id: number,
  url_token: string,
  created_at: Date,
  expire_time: any
}

function formatRemainingTime(date: any) {
  let expireTime: any = new Date(date);
  let now: any = new Date();
  let diffInMs = expireTime - now;
  const diffInSec = Math.round(diffInMs / 1000);
  const days = Math.floor(diffInSec / 86400);
  const hours = Math.floor((diffInSec % 86400) / 3600);
  const minutes = Math.floor((diffInSec % 3600) / 60);

  return `${days} gün, ${hours} saat ve ${minutes} dakika`;
}


export default function Feedbacks({ props }: any) {
  const now = new Date();
  const [qrData, setQRData] = useState('');
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbackPages, setFeedbackPages] = useState([])


  const handleGetFeedbackPage = async () => {
    const res = await fetch("http://localhost:5000/api/v1/feedback_pages", {
      method: "GET",
      credentials: "include"
    })
    const data = await res.json()
    setFeedbackPages(data.Feedbacks)
  }

  useEffect(() => {
    handleGetFeedbackPage();
  }, [])


  const handleCreateFeedbackPage = async () => {
    const res = await fetch("http://localhost:5000/api/v1/feedback_pages", {
      method: "POST",
      credentials: "include"
    })
    if (res.ok) {
      notifications.show({
        title: 'Başarılı',
        message: 'Yeni Geri Bildirim Sayfanız Oluşturuldu',
        color: 'green',
        autoClose: 1500
      })
      handleGetFeedbackPage()
    }

  }

  const generateQRCode = async (url: any) => {
    console.log(url);
    const data = `http://localhost:3000/send-feedbacks/${url}}`;
    const qrCode = await QRCode.toDataURL(data);
    setQRData(qrCode);
  };

  const downloadQRCode = async (urlToken: any) => {
    const qrCode = await QRCode.toDataURL(urlToken);
    const blob = await fetch(qrCode).then((res) => res.blob());
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };




  const handleDeleteFeedbackPage = async (id: any) => {
    const res = await fetch(`http://localhost:5000/api/v1/feedback_pages/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
    if (res.ok) {
      notifications.show({
        title: 'Silindi',
        message: 'İşlem Başarılı',
        color: 'green',
        autoClose: 1500
      })
      handleGetFeedbackPage()
    }
  }

  return (
    <div>
      <div className='bg-gray-50'>
        <div className='p-3'>
          <div className='mb-10'>
            <Button onClick={handleCreateFeedbackPage} mb="xl" ml="md" variant='outline'>Token Oluştur</Button>
            {
              feedbackPages.map((feedbackPage: FeedbackPage) => (
                <Accordion key={feedbackPage.id}>
                  <Accordion.Item value="customization">
                    <Button onClick={(e) => handleDeleteFeedbackPage(feedbackPage.id)} className='ml-4 mt-1 w-10' variant='outline' color='red' compact >Sil</Button>
                    <Accordion.Control> {feedbackPage.id}. Token | {formatRemainingTime(feedbackPage.expire_time)} </Accordion.Control>
                    <Accordion.Panel>
                      <span className='text-blue-800'>Url Adresi: </span> <Link className='hover:underline hover:text-blue-600' href={`http://localhost:3000/send-feedbacks/${feedbackPage.url_token}`}>  {`http://localhost:3000/send-feedbacks/${feedbackPage.url_token}`} </Link>
                      <Button onClick={(e) => generateQRCode(feedbackPage.url_token)} variant='outline' color='green' compact >Qr Kodunuzu Açın</Button>

                      {qrData ? (<>
                        <img src={qrData} alt="QR Code" />
                        <Button onClick={() => downloadQRCode(feedbackPage.url_token)} variant='outline' color='violet' compact>İndir</Button>

                      </>

                      ) : (
                        <>
                          <p className='text-sm text-gray-400 mb-1'>Qr kodunuz, süresi bitene kadar devam edecektir</p>

                        </>
                      )}
                    </Accordion.Panel>
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