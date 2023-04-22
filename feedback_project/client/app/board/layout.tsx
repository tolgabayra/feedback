import Leftbar from "@/components/board/leftbar"


export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <div>
      <Leftbar />
      Burası Layout
      {children}

    </div>
  )
}
