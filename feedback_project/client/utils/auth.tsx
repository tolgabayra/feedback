'use client'
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function withAuth(WrappedComponent: any) {
    const Wrapper = (props: any) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [loggedIn, setLoggedIn] = useState(false);
        const [sessionExpired, setSessionExpired] = useState(false);
        const [accessDenied, setAccessDenied] = useState(false)

        useEffect(() => {
            const verifyToken = async () => {
                try {
                    const res = await fetch("http://localhost:5000/api/v1/auth/verify", {
                        method: "POST",
                        credentials: "include",
                    });
                    if (res.ok) {
                        setLoggedIn(true);
                        setLoading(false);
                    } else if (res.status === 403) {
                        router.push("/signin")
                    }
                    else {
                        setLoading(false);
                        setSessionExpired(true);
                    }
                } catch (error) {
                    setAccessDenied(true)
                    setLoading(false);
                }
            };

            verifyToken();
        }, []);

        const extendAccessToken = async () => {
            try {
                const res = await fetch(
                    "http://localhost:5000/api/v1/auth/refresh_token",
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );
                if (res.ok) {
                    setLoggedIn(true);
                    notifications.show({
                        title: 'Başarılı !',
                        message: 'İşlemleminize devam edebilirsiniz.',
                        color: 'green',
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)

                } else {
                    console.log("Error extending access token");
                }
            } catch (error) {
                console.log("Error extending access token", error);
            }
        };


        /*
        
        
        
         useEffect(() => {
             const intervalId = setInterval(() => {
                 extendAccessToken();
             }, 10 * 60 * 36000); // Call extendAccessToken function every 10 minutes
 
             return () => clearInterval(intervalId);
         }, []);
        
        */

        const handleLogout = async () => {
            try {

                const res = await fetch(
                    "http://localhost:5000/api/v1/auth/logout",
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );
                if (res.ok) {
                    localStorage.clear();
                    console.log("Çıkış Başarılı");
                    router.push("/signin")
                }
            } catch (err) {
                router.push("/signin")
                console.log(err);
            }


        };

        if (loading) {
            return (
                <div>
                    Yükleniyor...
                </div>
            )
        }

        if (accessDenied) {
            return (
                <div className="text-center text-xl">
                    Erişim Yetkiniz Yok !
                    <Link className="block hover:underline hover:text-blue-500" href="/signin">Geri Dön</Link>
                </div>
            )
        }

        if (sessionExpired) {
            return (
                <div className="mt-3">
                    <h1 className="text-center text-3xl">Üzgünüz, Oturum Süreniz Doldu!</h1>

                    <div className="flex mt-4 justify-center">
                        <Button className="mr-3" onClick={handleLogout} color="red" variant="outline"  >
                            Çıkış Yap
                        </Button>
                        <Button onClick={extendAccessToken} variant="outline" >
                            Oturum Süresini Uzat
                        </Button>



                    </div>
                </div>
            );
        }


        return (
            <div>
                <WrappedComponent loggedIn={loggedIn} {...props} />
            </div>
        );
    };

    return Wrapper;
}

export default withAuth;