'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page({ params }: any) {
    const [isOkey, setIsOkey] = useState(false);
    const [isOkey2, setIsOkey2] = useState(false)
    const router = useRouter();


    useEffect(() => {
        const checkUrl = async () => {
            const res = await fetch(`http://localhost:5000/api/v1/feedback_pages/${params.url_token}`, {
                method: "GET",
                credentials: "include"
            })
            if (res.ok) {
                setIsOkey(true)
            } else if (res.status === 400) {
                setIsOkey2(true)
            }
            else {
                router.push("/")
            }
        }
        checkUrl();
    }, [])

    return (
        <div>
            {
                isOkey && <div>Burdan Geri Bildirim Oluştur.</div>
            }
            {
                isOkey2 &&
                <div className='text-center text-red-500 text-xl'>
                    Geçersiz Link!
                    <Link className='block hover:text-blue-500 text-black hover:underline duration-300' href="/">Ana Sayfaya Dön</Link>
                </div>
            }
        </div>
    )
}