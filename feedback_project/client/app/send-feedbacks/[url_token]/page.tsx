'use client';
import { Alert, Notification } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IconCheck } from '@tabler/icons-react';

export default function Page({ params }: any) {
  const [isOkey, setIsOkey] = useState(false);
  const [isOkey2, setIsOkey2] = useState(false);
  const [businessId, setBusinessId] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddres] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [content, setContent] = useState('');
  const [isSend, setIsSend] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUrl = async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/feedback_pages/${params.url_token}`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      if (res.ok) {
        const data = await res.json();
        setBusinessId(data.Feedback.business_id);
        setBusinessName(data.Feedback.business_name);
        setBusinessAddres(data.Feedback.business_address);
        setIsOkey(true);
      } else if (res.status === 400) {
        setIsOkey2(true);
      } else {
        router.push('/');
      }
    };
    checkUrl();
  }, []);

  useEffect(() => {
    const getTypes = async () => {
      const res = await fetch(
        'http://localhost:5000/api/v1/feedback_pages/list_types',
        {
          method: 'GET',
        },
      );
      const data = await res.json();
      setTypeList(data.type_list);
    };
    getTypes();
  }, []);

  const typeSelected = (e: any) => {
    setSelectedType(e.target.value);
  };

  const handleSendFeedback = async (e: any) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/v1/feedbacks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        business_id: businessId,
        feedback_type_id: selectedType,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setIsSend(true);
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
    console.log(data);
  };

  return (
    <div>
      {isOkey && (
        <div>
          <section className="bg-gradient-to-b from-gray-100 to-white">
            {isSend ? (
              <div className='flex justify-center'>
                <Alert className='m-1' icon={<IconCheck size="1rem" />} title="Bildiriminiz Başarıyla İletildi" color="green" variant="outline">
                  Teşekkür ederiz.
                </Alert>
              </div>

            ) : (
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-16 md:pb-20">
                  <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                    <div>
                      <p><span className='text-blue-500'>Firma Adı: </span> {businessName} </p>
                      <p><span className='text-blue-500'>Adresi: </span> {businessAddress} </p>
                    </div>
                    <h1 className="mt-5 text-xl">
                      Merhaba, bu firma hakkında geri bildirimde
                      bulunabilirsiniz.
                    </h1>
                  </div>
                  <div className="max-w-sm mx-auto">
                    <form onSubmit={handleSendFeedback}>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="feedback"
                          >
                            Bildirim Tipi{' '}
                            <span className="text-red-600">*</span>
                          </label>
                          <select
                            className="form-input w-full text-gray-800"
                            id="feedback"
                            value={selectedType}
                            onChange={typeSelected}
                          >
                            <option>Ne türde bildirim yapıyorsunuz ?</option>
                            {typeList.map((type: any) => (
                              <option key={type.id} value={type.id}>
                                {' '}
                                {type.name}{' '}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block text-gray-800 text-sm font-medium mb-1"
                            htmlFor="content"
                          >
                            İçerik
                          </label>
                          <textarea
                            onChange={(e) => setContent(e.target.value)}
                            id="content"
                            className="form-input w-full text-gray-800"
                            placeholder="Ne söylemek istiyorsunuz ?"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                          <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                            Gönder
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
      {isOkey2 && (
        <div className="text-center text-red-500 text-xl">
          Geçersiz Link!
          <Link
            className="block hover:text-blue-500 text-black hover:underline duration-300"
            href="/"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      )}
    </div>
  );
}
