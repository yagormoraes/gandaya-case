interface CardProps {
  item: {
    id: number;
    item: string;
    price: number;
    image: string;
  };
  cartItem?: {
    quantity: number;
  };
  onSelectItem: (item: any) => void;
}

const fixEncoding = (str: string) => {
  try {
    return decodeURIComponent(escape(str));
  } catch (e) {
    return str;
  }
};

export default function Card({ item, cartItem, onSelectItem }: CardProps) {
  return (
    <div className="rounded-lg flex flex-col justify-between">
      <div>
        <img
          src={`/assets/${item.image}`}
          alt={item.item}
          className="w-28 h-28 rounded-md bg-white"
        />
        <div className="pt-2 pb-6">
          <h3 className="text-[10px] text-white font-bold">
            {fixEncoding(item.item)}
          </h3>
          <p className="text-[10px] font-bold text-secondary">
            R$ {Number(item.price).toFixed(2).replace('.', ',')}
          </p>
        </div>
      </div>

      <div>
        {cartItem && (
          <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
            <button className="flex items-center text-gray-500">
              <span className="text-xl font-bold">−</span>
              <span className="text-lg font-bold ml-2">{cartItem.quantity}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
