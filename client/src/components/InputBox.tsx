interface InputBoxProps {
    title: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({ title, type, placeholder, value, onChange }: InputBoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "number" && Number(e.target.value) < 1) {
            e.target.value = "1";
        }
        onChange(e);
    };

    return (
        <div className="mb-4">
            <label className="block text-white font-bold mb-1">{title}</label>
            <input
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                min={type === "number" ? 1 : undefined}
            />
        </div>
    );
}
