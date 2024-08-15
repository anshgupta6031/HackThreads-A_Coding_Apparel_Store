import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "HackThreads - Hack the Code, Wear the Style",
    description: "Hack the Code, Wear the Style",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>

                <Navbar />

                {children}

                <Footer />

            </body>
        </html>
    );
}
