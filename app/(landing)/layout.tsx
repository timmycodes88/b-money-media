import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X2 | Landing',
  description: 'A Next.js 13 Practice Project',
manifest: "/manifest.json",
  themeColor: "#121417",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: 'X2',
    startupImage: {
      url: '/X2.png',
    },
  },
  viewport: 'width=device-width, height=device-height, initial-scale:1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={`${inter.className} bg-dark-1 `}>{children}</body>
      </html>
    </ClerkProvider>
  )
}