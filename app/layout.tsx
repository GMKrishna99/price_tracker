import type { Metadata } from 'next'
import { Nunito, Space_Grotesk } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'

const nunito = Nunito({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Price Wise',
  description: 'Track product prices and save your money on your online shopping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <main className='max-w-10xl mx-auto'>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  )
}
