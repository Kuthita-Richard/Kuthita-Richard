import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { profile, siteUrl } from "@/data/profile";

// Self-hosted via next/font — downloaded and served from our own domain at
// build time, so there's no external request to fonts.googleapis.com
// blocking first paint. display: "swap" keeps text visible while these load.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

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
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${profile.name} — ${profile.tagline}`,
    description: profile.summary,
    url: siteUrl,
    siteName: profile.name,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.tagline}`,
    description: profile.summary,
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
              url: siteUrl,
              image: `${siteUrl}/profile.png`,
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

        {/* Schema.org structured data for the site itself — separate from
            the Person schema above, this is what lets search engines treat
            "richardkuthita.com" as a distinct, named entity. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: `${profile.name} — Portfolio`,
              url: siteUrl,
              author: { "@type": "Person", name: profile.name },
            }),
          }}
        />

      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} bg-paper dark:bg-dk-bg text-ink dark:text-dk-ink antialiased font-body`}>
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
