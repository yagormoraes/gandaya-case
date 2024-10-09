interface TotalFooterProps {
    total: number;
    buttonText: string;
    onButtonClick: () => void;
    isProcessing?: boolean;
    isButtonDisabled: boolean; 
}

export default function TotalFooter({ total, buttonText, onButtonClick, isProcessing = false, isButtonDisabled }: TotalFooterProps) {
    return (
      <div className="fixed bottom-0 w-full bg-primary-dark p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm text-primary-lightest">Valor total:</h3>
            <p className="font-bold text-3xl text-white">
              R$ {total.toFixed(2).replace(".", ",")}
            </p>
          </div>
  
          <button
            onClick={onButtonClick}
            disabled={isProcessing || isButtonDisabled}  
            className={`bg-secondary text-black px-10 py-3 rounded-full font-bold ${isProcessing || isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
}
