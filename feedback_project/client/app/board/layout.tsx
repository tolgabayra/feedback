'use client'
import Leftbar from "@/components/board/leftbar"


export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="h-screen w-screen flex">
      <Leftbar />
      <div className="w-full overflow-y-auto">
        {children}

      </div>

    </div>
  )
}
