import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adarsh Maurya | Full-Stack & AI Developer',
  description:
    'Passionate CS student at IIIT Bhopal building scalable full-stack and AI-powered applications. Experienced in leading teams and deploying production systems.',
  keywords: ['Adarsh Maurya', 'IIIT Bhopal', 'Full Stack Developer', 'React', 'Node.js', 'AI', 'Portfolio'],
  authors: [{ name: 'Adarsh Maurya', url: 'https://github.com/adarsh062' }],
  openGraph: {
    title: 'Adarsh Maurya | Full-Stack & AI Developer',
    description: 'Building real-world products at the intersection of code, design, and intelligence.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
