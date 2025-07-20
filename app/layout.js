import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick-theme.css";
import { Providers } from "./providers";


export const metadata = {
  title: "Panchtatva",
  description: "Panchtatva",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Providers>{children}</Providers>
        {/* {children} */}
      </body>
    </html>
  );
}
