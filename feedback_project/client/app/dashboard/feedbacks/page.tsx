'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  Accordion,
  ActionIcon,
  Button,
  Divider,
  LoadingOverlay,
  Popover,
  ScrollArea,
} from '@mantine/core';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import { IconAdjustmentsPlus } from '@tabler/icons-react';
import { IconAdjustmentsMinus } from '@tabler/icons-react';

type FeedbackPage = {
  id: number;
  url_token: string;
  created_at: Date;
  expire_time: any;
};

interface Feedback {
  id: number;
  content: string;
  created_at: string;
  feedback_type_id: number;
  feedback_type_name: string;
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
  const [qrData, setQRData] = useState('');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [feedbackPages, setFeedbackPages] = useState([]);
  const [newlyLoadedFeedbacks, setNewlyLoadedFeedbacks] = useState([]);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [currentFeedbackCount, setCurrentFeedbackCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [popOverD, setPopOverD] = useState(false);

  const handleGetFeedbackPage = async () => {
    const res = await fetch('http://localhost:5000/api/v1/feedback_pages', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();
    setFeedbackPages(data.Feedbacks);
  };

  useEffect(() => {
    handleGetFeedbackPage();
  }, []);

  const handleCreateFeedbackPage = async () => {
    const res = await fetch('http://localhost:5000/api/v1/feedback_pages', {
      method: 'POST',
      credentials: 'include',
    });
    if (res.ok) {
      notifications.show({
        title: 'İşlem Başarılı',
        message: 'Yeni Geri Bildirim Sayfanız Oluşturuldu',
        color: 'green',
        autoClose: 1500,
      });
      handleGetFeedbackPage();
    }
    if (res.status === 400) {
      notifications.show({
        title: 'İşlem Başarısız',
        message: 'Token Oluşturma Hakkınız Bitmiştir',
        color: 'red',
        autoClose: 1500,
      });
    }
  };

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

    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDeleteFeedbackPage = async (id: any) => {
    const res = await fetch(
      `http://localhost:5000/api/v1/feedback_pages/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );
    if (res.ok) {
      notifications.show({
        title: 'Silindi',
        message: 'İşlem Başarılı',
        color: 'green',
        autoClose: 1500,
      });
      handleGetFeedbackPage();
    }
  };
  const getFeedbacks = async () => {
    const res = await fetch('http://localhost:5000/api/v1/feedbacks', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();
    const { Feedbacks, total } = data;
    setTotalFeedbacks(total);
    setCurrentFeedbackCount(Feedbacks.length);
    console.log(data);

    setFeedbacks(data.Feedbacks);
  };
  useEffect(() => {
    getFeedbacks();
  }, []);

  const handleDeleteFeedback = async (id: number) => {
    const res = await fetch(`http://localhost:5000/api/v1/feedbacks/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) {
      setLoading(false);
      notifications.show({
        title: 'Silindi',
        message: 'İşlem Başarılı',
        color: 'green',
        autoClose: 1500,
      });
      setTimeout(() => {
        setLoading(true);
        getFeedbacks();
      }, 1000);
    }
  };

  const handleDeleteAllFeedback = async () => {
    setPopOverD(true);
    const res = await fetch(
      'http://localhost:5000/api/v1/feedbacks/delete_all',
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );
    if (res.ok) {
      notifications.show({
        title: 'Tüm Feedbacklar Silindi',
        message: 'İşlem Başarılı',
        color: 'green',
        autoClose: 1500,
      });
      setPopOverD(false);
    } else {
      notifications.show({
        title: 'Üzgünüz bu işlemi şuan gerçekleştiremiyoruz.',
        message: 'İşlem Başarısız.',
        color: 'red',
        autoClose: 1500,
      });
    }
    getFeedbacks();
  };

  useEffect(() => {
    console.log(zoomLevel);
  }, [zoomLevel]);

  const handleGetMoreFeedbacks = async () => {
    setLoading(false);
    const res = await fetch(
      `http://localhost:5000/api/v1/feedbacks?offset=${currentFeedbackCount}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    if (res.ok) {
      const data = await res.json();
      const newFeedbacks = data.Feedbacks;
      setNewlyLoadedFeedbacks(newFeedbacks);
      setFeedbacks((prevFeedbacks) => [...prevFeedbacks, ...newFeedbacks]);
      setCurrentFeedbackCount((prevCount) => prevCount + newFeedbacks.length);
      setTotalFeedbacks(data.totalFeedbacks);
      setTimeout(() => {
        setLoading(true);
      }, 1500);
    }
  };

  useEffect(() => {
    // İlk yükleme için feedbackleri getir
    handleGetMoreFeedbacks();
    window.addEventListener('scroll', handleScroll); // Scroll olayını dinle
    return () => {
      window.removeEventListener('scroll', handleScroll); // Scroll olayını temizle
    };
  }, []);

  useEffect(() => {
    console.log(feedbacks);
  }, [feedbacks]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      handleGetMoreFeedbacks();
    }
  };

  return (
    <div>
      <div className="bg-gray-50">
        <div className="p-3">
          <div className="mb-10">
            <Button
              onClick={handleCreateFeedbackPage}
              mb="xl"
              ml="md"
              variant="outline"
            >
              Token Oluştur
            </Button>
            {feedbackPages.map((feedbackPage: FeedbackPage) => (
              <Accordion key={feedbackPage.id}>
                <Accordion.Item value="customization">
                  <Button
                    onClick={(e) => handleDeleteFeedbackPage(feedbackPage.id)}
                    className="ml-4 mt-1 w-10"
                    variant="outline"
                    color="red"
                    compact
                  >
                    Sil
                  </Button>
                  <Accordion.Control>
                    {' '}
                    {feedbackPage.id}. Token |{' '}
                    {formatRemainingTime(feedbackPage.expire_time)}{' '}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <span className="text-blue-800">Url Adresi: </span>{' '}
                    <Link
                      className="hover:underline hover:text-blue-600"
                      href={`http://localhost:3000/send-feedbacks/${feedbackPage.url_token}`}
                    >
                      {' '}
                      {`http://localhost:3000/send-feedbacks/${feedbackPage.url_token}`}{' '}
                    </Link>
                    <Button
                      onClick={(e) => generateQRCode(feedbackPage.url_token)}
                      variant="outline"
                      color="green"
                      compact
                    >
                      Qr Kodunuzu Açın
                    </Button>
                    {qrData ? (
                      <>
                        <img src={qrData} alt="QR Code" />
                        <Button
                          onClick={() => downloadQRCode(feedbackPage.url_token)}
                          variant="outline"
                          color="violet"
                          compact
                        >
                          İndir
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-400 mb-1">
                          Qr kodunuz, süresi bitene kadar devam edecektir
                        </p>
                      </>
                    )}
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            ))}
          </div>
          <h3 className="text-xl text-center mb-1 font-medium hover:text-gray-800">
            Geri bildirimler
          </h3>
          <Divider size="xs" mb="xl" />
          <div className="flex mb-1 justify-end">
            <ActionIcon
              onClick={() => setZoomLevel(100)}
              className=" mr-1"
              color="indigo"
              variant="outline"
              radius="xl"
            >
              <IconAdjustmentsPlus size="1.125rem" />
            </ActionIcon>
            <ActionIcon
              onClick={() => setZoomLevel(90)}
              color="indigo"
              variant="outline"
              radius="xl"
            >
              <IconAdjustmentsMinus size="1.125rem" />
            </ActionIcon>
          </div>
          <Button
            variant="outline"
            compact
            mb="md"
            onClick={handleGetMoreFeedbacks}
          >
            Daha fazla yükle
          </Button>
          <Popover opened={popOverD} position="bottom-start">
            <Popover.Target>
              <Button
                variant="outline"
                color="red"
                ml="xs"
                compact
                mb="md"
                onClick={() => setPopOverD(true)}
              >
                Toplu Sil
              </Button>
            </Popover.Target>
            <Popover.Dropdown className=" text-xs">
              <p>Bu işlemi yapmak istediğinizden emin misiniz ?</p>
              <Button
                onClick={handleDeleteAllFeedback}
                variant="outline"
                compact
                mt="xs"
              >
                İşlemi Onayla
              </Button>
            </Popover.Dropdown>
          </Popover>

          <p className="text-xs opacity-60">
            Yüklenen Toplam Bildirim Sayısı: {feedbacks.length}{' '}
          </p>
          <ScrollArea
            className={`transform scale-${zoomLevel}`}
            type="auto"
            h={500}
            scrollHideDelay={400}
            onScroll={handleScroll}
          >
            {loading ? (
              <div className="container mt-1 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {feedbacks
                    .sort(
                      (a: any, b: any) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime(),
                    )
                    .map((feedback: any) => {
                      let createdDate = new Date(
                        feedback.created_at,
                      ).toLocaleDateString();
                      const colorClasses: any = {
                        1: 'bg-yellow-600',
                        2: 'bg-blue-600',
                        3: 'bg-red-600',
                        4: 'bg-green-600',
                      };

                      return (
                        <div
                          key={feedback.id}
                          className="card m-2 p-1 border border-gray-400 rounded-sm hover:shadow-md hover:border-opacity-50 transform hover:-translate-y-1 transition-all duration-200"
                        >
                          <Button
                            onClick={(e) => handleDeleteFeedback(feedback.id)}
                            className="ml-1 mt-1 w-10"
                            variant="outline"
                            color="red"
                            radius="xs"
                            size="xs"
                            compact
                          >
                            Sil
                          </Button>
                          <div className="m-3">
                            <h2 className="text-lg mb-2">
                              {' '}
                              Geri bildirim
                              <span
                                className={`text-sm text-gray-100 font-mono ${
                                  colorClasses[feedback.feedback_type_id]
                                } inline rounded-sm px-3 mt-1 align-top float-right animate-pulse`}
                              >
                                {' '}
                                {feedback.feedback_type_name}{' '}
                              </span>
                            </h2>
                            <Divider mb="xs" />
                            <p className="font-light cursor-text font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                              {' '}
                              {feedback.content}{' '}
                            </p>
                          </div>
                          <div>
                            <Divider />
                            <p className="ml-3 text-sm mt-1">{createdDate}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <LoadingOverlay
                loaderProps={{ size: 'sm', color: 'blue', variant: 'bars' }}
                overlayOpacity={0.3}
                overlayColor="#c5c5c5"
                visible
              />
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
