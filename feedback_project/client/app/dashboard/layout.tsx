'use client'

import withAuth from "@/utils/auth"

function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grow">
      <p>Layout</p>
      {children}

    </main>
  )
}

export default withAuth(DashboardLayout)