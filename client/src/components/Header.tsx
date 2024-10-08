import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title: string;
    showBackArrow?: boolean;
    onClick?: () => void;
}

export default function Header({ title, showBackArrow, onClick }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <div className={`flex items-center h-28 ${showBackArrow ? "justify-between" : "justify-end"} text-white font-inter text-2xl px-6 font-bold`}>
            {showBackArrow && (
                <button
                    onClick={() => {
                        if (onClick) onClick(); 
                        navigate(-1);
                    }}
                    className="mr-4 bg-white p-2 rounded-full"
                >
                    <img src="/assets/left-arrow.png" alt="Voltar" className="w-5 h-5" />
                </button>
            )}
            <span>{title}</span>
        </div>
    );
}
