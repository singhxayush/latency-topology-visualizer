import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "Latency Topology Visualizer",
  description: "Latency Topology Visualizer Dasboard Simulation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
