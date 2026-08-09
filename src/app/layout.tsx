import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hmbot.net"),
  title: {
    default: "HMbot · 后马时代 | 务实机器人，服务真实场景",
    template: "%s | HMbot · 后马时代",
  },
  description:
    "北京后马时代科技有限责任公司 — 以视觉识别为核心，做能真正落地的机器人产品。工程车辆防撞、桥梁山体安全监测、视觉机械臂、仓储运输机器人，已为清华、北大、中科院等机构规模交付。",
  keywords: [
    "后马时代",
    "HMbot",
    "机器人",
    "视觉识别",
    "工程车辆防撞",
    "桥梁监测",
    "机械臂",
    "仓储机器人",
    "Beijing robotics",
    "vision robotics",
    "collision warning",
    "structural monitoring",
    "warehouse robot",
  ],
  authors: [{ name: "Beijing Houma Era Technology Co., Ltd." }],
  creator: "Beijing Houma Era Technology Co., Ltd.",
  publisher: "Beijing Houma Era Technology Co., Ltd.",
  icons: {
    icon: "/logo.svg",
  },
  alternates: {
    canonical: "https://hmbot.net",
    languages: {
      "zh-CN": "https://hmbot.net",
      en: "https://hmbot.net",
    },
  },
  openGraph: {
    title: "HMbot · 后马时代 | 务实机器人，服务真实场景",
    description:
      "Beijing Houma Era Technology — practical, deployable, self-sustaining robotics. Trusted by Tsinghua, PKU, and CAS.",
    url: "https://hmbot.net",
    siteName: "HMbot",
    locale: "zh_CN",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HMbot · 后马时代 | Practical Robotics",
    description:
      "Practical, deployable robotics for construction, infrastructure, labs, and logistics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </body>
    </html>
  );
}
