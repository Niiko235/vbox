import type { Metadata } from 'next'
import {  Roboto } from 'next/font/google'
import './globals.css'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
})

const APP_NAME = 'VBox'

export const metadata: Metadata = {
  title: {
    template: '%s | ' + APP_NAME,
    default: APP_NAME,
  },
  description: 'VBox',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${roboto.variable}  h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
