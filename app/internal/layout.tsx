
import type { Metadata } from 'next'

import '@/public/globals.css'

import Logo from '../logo'

export const metadata: Metadata = {
    title: 'Internal || Risos Enterprises',
    description: "Risos Enterprises LTD"
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>

            {children}


        </section >
    )
}
