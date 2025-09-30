import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({
  item,
  onQuantityChange,
  onRemove,
  onToggleSelect
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div
      className={`card bg-white border-2 transition-all duration-300 ${item.selected
        ? "shadow-lg"
        : "border-neutral-100 hover:border-neutral-300"
        }`}
      style={item.selected ? { borderColor: '#20161F' } : {}}
    >
      <div className="card-body p-6">
        <div className="flex items-center gap-4">
          <div className="w-8 flex justify-center">
            <input
              type="checkbox"
              className="checkbox"
              checked={item.selected}
              onChange={() => onToggleSelect(item.id)}
              style={item.selected ? { 
                accentColor: '#20161F',
                borderColor: '#20161F'
              } : {}}
            />
          </div>

          {/* Thumbnail */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={item.thumbnail || "/placeholder.svg"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1 text-neutral-900">{item.name}</h3>
            <p className="text-sm mb-2 text-neutral-600">{item.description}</p>
            <div className="font-bold text-lg" style={{ color: '#20161F' }}>
              {formatPrice(item.price)}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2 w-32 justify-center">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              className="btn btn-sm btn-circle btn-outline border-neutral-300 hover:border-neutral-400"
              style={{ color: '#20161F' }}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold text-neutral-900">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              className="btn btn-sm btn-circle btn-outline border-neutral-300 hover:border-neutral-400"
              style={{ color: '#20161F' }}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Total */}
          <div className="w-32 text-right font-bold text-lg" style={{ color: '#20161F' }}>
            {formatPrice(item.price * item.quantity)}
          </div>

          {/* Remove */}
          <div className="w-12 flex justify-center">
            <button
              onClick={() => onRemove(item.id)}
              className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
