import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ECG Buddy - AI-Powered ECG Analysis Landing Page',
  description: 'Transform complex cardiac data into clear, actionable insights with our AI-powered platform trusted by healthcare professionals worldwide.',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      </head>
      <body>{children}</body>
    </html>
  )
}