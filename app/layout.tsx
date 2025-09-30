import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "WoodCrest Designs",
  description: "WoodCrest Designs - Crafting Comfort and Style in Every Piece",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
        <ToastContainer
          position="top-right"   // You can choose: "top-center", "bottom-left" etc.
          autoClose={3000}       // Closes automatically after 3s
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"        // You can try: "light", "dark", "colored"
        />
      </body>
    </html>
  );
}
