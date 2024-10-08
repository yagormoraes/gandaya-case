interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

export default function Button({ onClick, children, className }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`font-matter text-sm bg-secondary h-12 px-5 rounded-full font-bold ${className}`}
        >
            {children}
        </button>
    );
}
