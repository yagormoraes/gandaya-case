interface CardProps {
  item: {
    id: number;
    item: string;
    price: number;
    image: string;
    availableQuantity: number;
  };
  cartItem?: {
    quantity: number;
  };
  onSelectItem: (item: any) => void;
  onIncreaseQuantity: (item: any) => void;
  onDecreaseQuantity: (item: any) => void;
}

const fixEncoding = (str: string) => {
  try {
    return decodeURIComponent(escape(str));
  } catch (e) {
    return str;
  }
};

export default function Card({
  item,
  cartItem,
  onSelectItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CardProps) {
  const isUnavailable = item.availableQuantity === 0;

  return (
    <div
      onClick={() => {
        if (!isUnavailable) onSelectItem(item);
      }}
      className={`relative rounded-lg flex flex-col justify-between ${
        isUnavailable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div className="relative">
        {isUnavailable ? (
          <div className="w-28 h-28 bg-white flex flex-col items-center justify-center rounded-md">
            <h3 className="text-xs text-black font-bold text-center">
              {fixEncoding(item.item)}
            </h3>
          </div>
        ) : (
          <img
            src={`/assets/${item.image}`}
            alt={item.item}
            className={`w-28 h-28 rounded-md bg-white ${
              cartItem ? "border-secondary" : "border-transparent"
            } border-2`}
          />
        )}

        {cartItem && !isUnavailable && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white border-secondary border-2 flex items-center rounded-lg justify-between h-5 w-16">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDecreaseQuantity(item);
              }}
              className="flex flex-col items-center justify-center bg-secondary text-black px-1 py-1 rounded-l-lg h-5"
            >
              −
            </button>
            <span className="text-black text-xs font-bold mx-1">{cartItem.quantity}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onIncreaseQuantity(item);
              }}
              className="flex flex-col items-center justify-center bg-secondary text-black px-1 py-1 rounded-r-lg h-5"
            >
              +
            </button>
          </div>
        )}
      </div>

      <div className="pt-5 pb-6">
        <h3 className="text-[10px] text-white font-bold">{fixEncoding(item.item)}</h3>
        <p className="text-[10px] font-bold text-secondary">
          {isUnavailable
            ? "Indisponível" 
            : `R$ ${Number(item.price).toFixed(2).replace(".", ",")}`}
        </p>
      </div>
    </div>
  );
}
