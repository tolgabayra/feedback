'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function withAuth(WrappedComponent: any) {
    const Wrapper = (props: any) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [loggedIn, setLoggedIn] = useState(false);
        const [sessionExpired, setSessionExpired] = useState(false);

        useEffect(() => {
            const verifyToken = async () => {
                try {
                    const res = await fetch("http://localhost:5000/api/v1/auth/deneme", {
                        method: "GET",
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
                    setSessionExpired(true);
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
                    setTimeout(() => {
                        router.refresh()
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

        if (sessionExpired) {
            return (
                <div className="mt-3">
                    <h1 className="text-center text-3xl">Üzgünüz, Oturum Süreniz Doldu!</h1>
                    <div className="flex justify-center mt-3">
                        <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Çıkış Yap
                        </button>
                        <button onClick={extendAccessToken} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3">
                            Oturum Süresini Uzat
                        </button>
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