'use client'

import { appAxios } from '@/utils/axios'
import { Tooltip } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Leftbar = () => {
    const router = useRouter()

    const handleLogout = async () => {
        const res = await appAxios.post("/api/v1/logout")
        if (res.status === 200) {
            router.push("/")
        } else {

        }
    }



    return (
        <div>
            <aside
                className="flex flex-col items-center bg-gray-800 text-gray-100 shadow h-full">
                <div className="h-16 flex items-center w-full">
                    <Link href="/board" className="h-6 w-6 mx-auto">
                        <img
                            className="h-6 w-6 mx-auto"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
                            alt="svelte logo" />
                    </Link>
                </div>
                <ul>
                    <li className="hover:bg-gray-400 duration-300 hover:rounded-full">
                        <Tooltip label='Board' placement='right'>
                            <Link
                                href="/board"
                                className="h-12 px-4  flex justify-center items-center w-full
					">
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline
                                        points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                                    <path
                                        d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0
							2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0
							0-1.79 1.11z"></path>
                                </svg>

                            </Link>
                        </Tooltip>

                    </li>


                    <li className="hover:bg-gray-400 duration-300 hover:rounded-full">
                        <Tooltip label='Bildirimler' placement='right'>

                            <Link
                                href="/board/notifications"
                                className="h-12 px-4 flex  mt-2 justify-center items-center w-full
					">
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                </svg>
                            </Link>
                        </Tooltip>
                    </li>

                    <li className="hover:bg-gray-400 duration-300 hover:rounded-full">
                        <Tooltip label='Ayarlar' placement='right'>
                            <Link
                                href="/board/settings"
                                className="h-12 mt-2 px-4 flex flx justify-center items-center w-full
					">
                                <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path
                                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1
							0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0
							0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2
							2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0
							0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1
							0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
							0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
							0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0
							1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0
							1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
							0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
							1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0
							2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0
							0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65
							1.65 0 0 0-1.51 1z"></path>
                                </svg>
                            </Link>
                        </Tooltip>
                    </li>


                </ul>

                <div className="mt-auto h-16 flex items-center w-full">
                    <button
                        onClick={handleLogout}
                        className="h-16 mx-auto text-xs flex justify-center items-center
                        hover:text-gray-400 duration-300 ease-in-out transition font-semibold
				        w-full 
                  ">
                        Çıkış Yap
                    </button>
                </div>

            </aside>

        </div>
    )
}

export default Leftbar