interface SearchInputProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function SearchBar({
    searchTerm,
    onSearchChange,
    placeholder = "Buscar produto"
}: SearchInputProps) {
    return (
        <nav className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={onSearchChange}
                placeholder={placeholder}
                className="border-2 border-secondary text-white placeholder-white bg-primary-dark p-2 mb-4 w-full rounded-md pl-5"
            />
            <span className="absolute top-1/3 right-5 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.9-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                </svg>
            </span>
        </nav>
    );
}
