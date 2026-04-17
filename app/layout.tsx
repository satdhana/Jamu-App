import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import Provider Bahasa
import { LanguageProvider } from './context/languageContext'; 

// Import Provider App
import { AppProvider } from "@/app/context/appContext";
import AppContent from "@/app/components/appContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jamudex Ecosystem",
  description: "Traditional Javanese Herbal Medicine Encyclopedia & Personal Tracker",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {/* Urutan Pembungkusan (Wrapper):
          1. LanguageProvider paling luar agar semua logic (AppProvider/AppContent) 
             bisa ikut diterjemahkan jika perlu.
        */}
        <LanguageProvider>
          <AppProvider>
            <AppContent>
              {children}
            </AppContent>
          </AppProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}