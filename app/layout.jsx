import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Todo List",
	description: "Todo List",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="light">
			<body className={`container mx-auto ${inter.className}`}>
				<ToastContainer />
				{children}
			</body>
		</html>
	);
}
