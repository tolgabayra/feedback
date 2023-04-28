'use client'
import Leftbar from "@/components/board/leftbar"
import withAuth from "@/utils/auth"
import { appAxios } from "@/utils/axios"
import { Menu, MenuButton, MenuItem, MenuList, Toast, useToast } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"



function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const router = useRouter()
  const toast = useToast()

  const [noLogin, setNoLogin] = useState(false)
  const handleLogout = async () => {
    try {

      const res = await appAxios.post("/api/v1/auth/slogout")
      if (res.status === 200) {
        router.push("/signin")
      }
    } catch (err) {
      toast({
        title: 'Çıkış Yapılmadı',
        description: "Başarısız.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.log(err);

    }

  }

  return (
    <div className="h-screen w-screen flex">
      {
        noLogin ??
        <>
          <Leftbar />
          <div className="w-full overflow-y-auto">
            <div className="mr-4 mt-2 bg-gray-800 ml-4 text-right rounded-xs p-1">
              <Menu>
                <MenuButton>
                  <p className=" text-right mr-4 hover:text-gray-300 hover:cursor-pointer underline">Tolga BAYRAK</p>
                </MenuButton>
                <MenuList className="bg-gray-900">
                  <MenuItem onClick={() => { router.push("/board/settings") }} className="hover:text-gray-300 hover:underline bg-dark">Ayarlar</MenuItem>
                  <MenuItem onClick={handleLogout} className="hover:text-gray-300 hover:underline">Çıkış Yap</MenuItem>

                </MenuList>
              </Menu>
            </div>
            {children}
          </div>
        </>


      }


    </div>
  )
}

export default withAuth(BoardLayout)