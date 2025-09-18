import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Jost, Geist_Mono } from "next/font/google";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const jost = Jost({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-jost" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "Mindlyst AI Learning",
  description: "AI learning platform powered by Mindlyst",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${jost.variable} ${geistMono.variable} antialiased`}>
        {/* 👇 The appearance prop has been removed from here */}
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Provider>
              <main>{children}</main>
            </Provider>
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}