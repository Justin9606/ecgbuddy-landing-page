import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ECG Buddy - Revolutionize ECG Analysis",
  description:
    "AI-powered ECG analysis platform for healthcare professionals. Get comprehensive ECG analysis results in under 30 seconds with our advanced machine learning algorithms.",
  keywords:
    "ECG analysis, AI, healthcare, cardiology, medical diagnosis, machine learning",
  authors: [{ name: "ARPI" }],
  creator: "ARPI",
  publisher: "ARPI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ecgbuddy.com",
    title: "ECG Buddy - Revolutionize ECG Analysis",
    description:
      "AI-powered ECG analysis platform for healthcare professionals",
    siteName: "ECG Buddy",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECG Buddy - Revolutionize ECG Analysis",
    description:
      "AI-powered ECG analysis platform for healthcare professionals",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
