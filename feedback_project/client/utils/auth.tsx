import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner"

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
                router.push("/signin");
            } catch (err) {
                console.log(err);
            }


        };

        if (loading) {
            return (
                <div className="card flex justify-content-center">
                    <ProgressSpinner />
                </div>
            )
        }

        if (sessionExpired) {
            return (
                <div>
                    <div className="grid">


                        <div className="col-12 lg:col-12">
                            <div className="card">
                                <h5 className="">Your session time has expired.</h5>
                                <p>What do you want ?</p>
                                <div className="flex">
                                    <Button onClick={handleLogout} className="mr-2 border p-2 hover:text-gray-300" label="Çıkış Yap" />
                                    <Button className="border p-2 ml-2 hover:text-gray-300" onClick={extendAccessToken} label="Yeni Session Aç" />
                                </div>
                            </div>
                        </div>
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