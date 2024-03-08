import type { Metadata } from "next";
import { Urbanist, Work_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DevTools } from "@/components/DevTools";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });
const work_sans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Grafiko",
    default: "Grafiko",
  },
  description: "A platform where you can customize your own product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${work_sans.variable} ${urbanist.variable}`}>
      <body className={`${urbanist.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <DevTools />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
