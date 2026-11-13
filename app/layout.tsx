import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Bricolage_Grotesque } from "next/font/google";
import { Toaster } from "sonner";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "clientfed",
  description: "A simple client delivery and project approval plateform for freelancer web developer and small agencies",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", bricolage.className)}
    >
      <body className="min-h-full flex flex-col">
      <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}