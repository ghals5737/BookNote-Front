import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./authprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booknote",
  description: "Booknote",
};

const layout = ({ children }: { children: React.ReactNode }) => {  

  return (
    <html lang="en">
      <body className={inter.className}>    
        <AuthProvider>
          {children}  
        </AuthProvider>         
      </body>
    </html>
  );
};

export default layout;