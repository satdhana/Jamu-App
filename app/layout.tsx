import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Perbaikan Import: Pastikan path sesuai dengan folder tempat kamu menyimpan file
// Menggunakan @/ untuk merujuk ke folder src atau root (tergantung config)
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

// Metadata untuk Branding Project
export const metadata: Metadata = {
  title: "Jamudex Ecosystem",
  description: "Traditional Javanese Herbal Medicine Encyclopedia & Personal Tracker",
  // Menambahkan viewport agar responsif di HP lebih mantap
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
        {/* AppProvider: Menyediakan data (isLoggedIn, myCourses) ke seluruh ekosistem.
          AppContent: Mengatur logic gatekeeper (Mode Katalog vs Mode App + Login).
        */}
        <AppProvider>
          <AppContent>
            {children}
          </AppContent>
        </AppProvider>
      </body>
    </html>
  );
}