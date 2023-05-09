'use client'
import React, { useEffect, useState } from 'react';
import { Menu, Button, Text } from '@mantine/core';
import { IconSettings, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';


function Header({
  sidebarOpen,
  setSidebarOpen
}: any) {

  const [email, setEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/auth/verify", {
          method: "POST",
          credentials: "include",
        });
        let data = await res.json()
        setEmail(data.Email)
      } catch (error) {
        console.log(error);
      }

    }
    handleUser()
  }, [])

  const handleLogout = async () => {
    const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include"
    })
    if (res.ok) {
      notifications.show({
        title: 'Başarılı !',
        message: 'Çıkış yapılıyor...',
        color: 'green',
        autoClose: 1500
      })
      setTimeout(() => {
        localStorage.clear()
        router.push("/signin")
      }, 1500)
    }
  }



  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center">

            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant='outline'>      {email}   </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item onClick={() => router.push("/dashboard/settings")} icon={<IconSettings size={14} />}>Settings</Menu.Item>
                <Menu.Divider />

                <Menu.Item onClick={handleLogout} color="red" icon={<IconTrash size={14} />}>Çıkış Yap</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;