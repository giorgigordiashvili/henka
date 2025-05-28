import { i18n, type Locale } from "@/i18n-config";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";
import localFont from "next/font/local";

// Define local font
const helvetica = localFont({
  src: [
    {
      path: "../../../public/fonts/HelveticaNeueLTGEO-55Roman.woff", // Adjusted path relative to app directory
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helgeo75.ttf", // Adjusted path relative to app directory
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica", // Define CSS variable
  display: "swap", // Ensure font-display: swap is used
});

export const metadata = {
  title: "ჰენკა",
  description: "ბუნებრივი სიჯანსაღე და ენერგია ერთ ბოთლში",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Root(props: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;

  const { children } = props;

  return (
    <html lang={params.lang} className={helvetica.variable}>
      <body className={helvetica.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
