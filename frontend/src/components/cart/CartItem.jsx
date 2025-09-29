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
        ? "border-green-500 shadow-lg"
        : "border-green-100 hover:border-green-300"
        }`}
    >
      <div className="card-body p-6">
        <div className="flex items-center gap-4">
          <div className="w-8 flex justify-center">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={item.selected}
              onChange={() => onToggleSelect(item.id)}
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
            <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
            <p className="text-sm mb-2">{item.description}</p>
            <div className="text-green-600 font-bold text-lg">
              {formatPrice(item.price)}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2 w-32 justify-center">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              className="btn btn-sm btn-circle btn-outline"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              className="btn btn-sm btn-circle btn-outline"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Total */}
          <div className="w-32 text-right font-bold text-green-600 text-lg">
            {formatPrice(item.price * item.quantity)}
          </div>

          {/* Remove */}
          <div className="w-12 flex justify-center">
            <button
              onClick={() => onRemove(item.id)}
              className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
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
