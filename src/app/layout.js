"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Layouts/Navbar";
import Footer from "@/components/shared/Layouts/Footer";
import { usePathname } from "next/navigation";
import { metadata } from "@/components/shared/Metadata/metadata";
import TanstackProvider from "@/provider/TanstackProvider";
// import PrivateRoute from "@/components/shared/Route/PrivateRoute";



const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const pathName = usePathname()
  console.log(pathName)
  const isLoginPage = pathName.includes('login')

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="min-h-screen">
        <TanstackProvider>
          {isLoginPage || <Navbar></Navbar>}

          <div className="px-5">

            {children}

          </div>

          {/* <Footer></Footer> */}
        </TanstackProvider>
      </body>

    </html>
  );
}
