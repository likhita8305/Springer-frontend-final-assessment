import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="w-full bg-white dark:bg-gray-900 border-b 
                   dark:border-gray-700 px-8 py-4 flex justify-between">
            <h1 className="text-2xl font-bold dark:text-white">Sales Dashboard</h1>

            <div className="flex gap-6 items-center">
                <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:underline">
                    Dashboard
                </Link>
                <Link href="/" className="text-gray-700 dark:text-gray-300 hover:underline">
                    Home
                </Link>

                <ThemeToggle />
            </div>
        </nav>
    );
}
