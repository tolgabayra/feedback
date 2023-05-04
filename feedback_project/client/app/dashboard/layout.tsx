'use client'

import { useState } from "react"
import Header from "../partials/Header"
import Sidebar from "../partials/Sidebar"
import WelcomeBanner from "../partials/dashboard/WelcomeBanner"


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <WelcomeBanner />
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
