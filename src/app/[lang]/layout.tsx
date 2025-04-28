import { i18n, type Locale } from "@/i18n-config";
import StyledComponentsRegistry from "@/lib/registry";
import Script from "next/script";
import "./globals.css";

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
    <html lang={params.lang}>
      <head>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <Script id="netlify-identity-redirect">
          {`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        `}
        </Script>
      </body>
    </html>
  );
}
