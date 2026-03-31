"use client";
import { useApp } from "@/app/context/appContext";
import Navbar from "@/app/components/navBar";
import LoginPage from "@/app/login/page";
import { usePathname } from "next/navigation";

export default function AppContent({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useApp();
  const pathname = usePathname();

  // Project 1: Catalogue & Detail (Public - No Navbar)
  const isPublicRoute = pathname.startsWith('/catalogue') || pathname.startsWith('/detail') || pathname === '/';

  if (isPublicRoute) {
    return <main>{children}</main>;
  }

  // Project 2: Jamu App (Private - Need Login)
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar diletakkan di sini agar tetap "Fixed" dan Active State berjalan */}
      <Navbar />
      <main>{children}</main>
    </div>
  );
}