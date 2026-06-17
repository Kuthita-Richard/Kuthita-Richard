import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.tagline}`,
  description: profile.summary,
  keywords: [
    "Richard Kuthita",
    "Richard",
    "Java Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Web3.0 / Blockchain",
    "Learning Decentralized Reasoning Systems",
    'Kuthita / kuthita',
    "Full Stack Developer",
    "Maseno",
    "Kenya",
    "Software Engineer",
    "Web Developer",
  ],
  authors: [{ name: profile.name, url: "https://richardkuthita.vercel.app" }],
  creator: profile.name,
  metadataBase: new URL("https://richardkuthita.vercel.app"),
  alternates: {
    canonical: "https://richardkuthita.vercel.app",
  },
  openGraph: {
    title: `${profile.name} — ${profile.tagline}`,
    description: profile.summary,
    url: "https://richardkuthita.vercel.app",
    siteName: profile.name,
    images: [
      {
        url: "https://richardkuthita.vercel.app/profile.png",
        width: 400,
        height: 400,
        alt: profile.name,
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.tagline}`,
    description: profile.summary,
    images: ["https://richardkuthita.vercel.app/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            const t = localStorage.getItem('rk-theme') ||
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', t === 'dark');
          } catch(e){}
        `}} />
        
        {/* Schema.org structured data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.tagline,
              url: "https://richardkuthita.vercel.app",
              image: "https://richardkuthita.vercel.app/profile.png",
              description: profile.summary,
              location: {
                "@type": "Place",
                name: profile.location,
              },
              sameAs: [
                `https://github.com/${profile.githubUsername}`,
                `https://${profile.linkedin}`,
              ],
              email: profile.email,
            }),
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper dark:bg-dk-bg text-ink dark:text-dk-ink antialiased font-body">
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
