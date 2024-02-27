

import type { Metadata } from 'next'

import '@/public/globals.css'

import Logo from './logo'


export const metadata: Metadata = {
  title: 'Home || Risos Enterprises',
  description: "Risos Enterprises LTD"
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">

      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1" />
      <Logo />
      <body className={'h-full overflow-x-clip'}>
  
    
        {children}</body>

    </html>
  )
}
