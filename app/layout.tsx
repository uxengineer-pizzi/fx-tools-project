import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="light" suppressHydrationWarning>
			<head>
				<Script id="theme-init" strategy="beforeInteractive">
					{`
            (() => {
              const storedTheme = localStorage.getItem('theme')
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
              const root = document.documentElement
              
              if (storedTheme === 'dark' || (!storedTheme && systemDark)) {
                root.classList.add('dark')
                root.style.colorScheme = 'dark'
              } else {
                root.classList.remove('dark')
                root.style.colorScheme = 'light'
              }
              
              // Add transition only after initial render
              setTimeout(() => {
                root.style.transition = 'color 200ms ease, background-color 200ms ease'
              }, 0)
            })()
          `}
				</Script>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider>
					<main className="pb-16">
						<Navigation />
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
