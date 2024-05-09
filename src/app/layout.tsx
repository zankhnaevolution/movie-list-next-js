import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie List",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 5000,
            style: {
              background: "White",
              color: '#092C39',
            }
          }} 
        />
        {children}
      </body>
    </html>
  );
}
