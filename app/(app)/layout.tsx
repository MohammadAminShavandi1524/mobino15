import type { Metadata } from "next";

import "./globals.css";
import "./Webfonts/fontiran.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/mycomponents/Header";
import Footer from "@/components/mycomponents/Footer";

import configPromise from "@payload-config";
import { getPayload, PaginatedDocs } from "payload";
import { Category } from "@/payload-types";

export const metadata: Metadata = {
  title: "mobino15",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayload({
    config: configPromise,
  });
  const data: PaginatedDocs<Category> = await payload.find({
    collection: "categories",
    sort : "order",
    depth: 1,
    where: {
      parent: {
        exists: false,
      },
    },
    pagination: false,
  });
 

  return (
    <html dir="rtl" lang="en" suppressHydrationWarning>
      <body className="font-IRANYekanX flex flex-col items-center w-full transition-all">
        <ThemeProvider enableSystem>
          <Header data={data} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
