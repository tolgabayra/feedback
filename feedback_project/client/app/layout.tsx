'use client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <body>{children}</body>
      </MantineProvider>
    </html>
  )
}
