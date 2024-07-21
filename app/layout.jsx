import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Todo List",
	description: "Todo List",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="light">
			<body className={`container mx-auto ${inter.className}`}>
				{children}
			</body>
		</html>
	);
}