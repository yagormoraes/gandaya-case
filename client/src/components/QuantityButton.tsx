interface QuantityButtonProps {
    quantity: number;
    availableQuantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    height?: string;
    width?: string;
    fontSize?: string;
}

export default function QuantityButton({ 
    quantity, 
    availableQuantity, 
    onIncrease, 
    onDecrease, 
    height = "h-5", 
    width = "w-16" ,
    fontSize = "text-sm",
}: QuantityButtonProps) {
    return (
        <div className={`bg-white border-secondary border-2 flex items-center rounded-lg ${height} ${width}`}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDecrease();
                }}
                className={`flex flex-col ${fontSize} items-center justify-center bg-secondary text-black h-full  
                    ${quantity >= availableQuantity ? "w-1/2 rounded-l-xs" : "rounded-l-xs w-1/3"
                    
                }`}
            >
                {quantity > 1 ? (
                    "−"
                ) : (
                    <img src="/assets/trash.svg" alt="Remover item" className="w-2/5 h-2/3" /> 
                )}
            </button>

            <span className={`text-black font-bold text-center w-1/3  ${fontSize}`}>
                {quantity}
            </span>

            {quantity < availableQuantity && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onIncrease();
                    }}
                    className={`flex flex-col items-center justify-center bg-secondary text-black h-full rounded-r-xs w-1/3 ${fontSize}`}
                >
                    +
                </button>
            )}
        </div>
    );
}
