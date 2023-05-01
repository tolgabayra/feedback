'use client'

import withAuth from "@/utils/auth"
import { Suspense } from "react"
import Loading from "./loading"

function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grow">
      <p>Layout</p>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>

    </main>
  )
}

export default DashboardLayout