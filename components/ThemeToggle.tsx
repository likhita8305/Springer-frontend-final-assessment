import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { dark, setDark } = useTheme();

    return (
        <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded border text-sm 
                 dark:bg-gray-800 dark:text-white
                 bg-gray-100 text-gray-800
                 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
            {dark ? "Light Mode" : "Dark Mode"}
        </button>
    );
}
