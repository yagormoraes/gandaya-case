interface HeaderProps {
    headerName: string;
}

export default function Header({headerName}: HeaderProps) {
    return (
        <div className="flex items-center h-28 justify-end text-white font-inter text-2xl pr-6 font-bold">
            {headerName}
        </div>
    );
}
