'use client'
import Leftbar from "@/components/board/leftbar"
import PageIllustration from "@/components/page-illustration"
import { Box, Button, ScaleFade, useDisclosure } from "@chakra-ui/react"


export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="h-screen w-screen flex">
      <Leftbar />


      {children}
      <PageIllustration />

    </div>
  )
}
