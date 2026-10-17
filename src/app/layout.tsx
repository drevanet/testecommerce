import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: { default: "Volt — Better tech. Better everyday.", template: "%s | Volt" },
  description: "Discover beautifully designed audio, mobile, wearable, gaming, and home technology at Volt.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return <html lang="en"><body className="min-h-screen antialiased">
    <CartProvider><SiteHeader user={session.user ?? null} /><main>{children}</main><SiteFooter /></CartProvider>
  </body></html>;
}
