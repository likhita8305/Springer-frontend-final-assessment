type Props = {
    value: number;
    onChange: (year: number) => void;
    years: number[];
};

export default function YearSelector({ value, onChange, years }: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
        >
            {years.map((yr) => (
                <option key={yr} value={yr}>
                    {yr}
                </option>
            ))}
        </select>
    );
}
