'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page({ params }: any) {
    const [isOkey, setIsOkey] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const checkUrl = async () => {
            const res = await fetch(`http://localhost:5000/api/v1/feedback_pages/${params.url_token}`, {
                method: "GET",
                credentials: "include"
            })
            if (res.ok) {
                setIsOkey(true)
            } else {
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
        </div>
    )
}