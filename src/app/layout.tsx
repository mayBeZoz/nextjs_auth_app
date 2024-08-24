import type { Metadata } from "next";
import "../globals.css";
import { Children } from "@/lib/types";


export const metadata: Metadata = {
    title: "Next.js Auth App",
    description: "",
};

export default function RootLayout({children}:Children) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
