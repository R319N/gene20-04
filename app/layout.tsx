import type { Metadata } from "next";
import ClientLayout from "@/components/layouts/ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon-32x32.png",
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-body">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
