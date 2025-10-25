import { create } from "zustand";

// Helper functions for localStorage
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem("cart-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem("cart-storage", JSON.stringify(items));
  } catch {
    // Handle error silently
  }
};

const useCartStore = create((set, get) => ({
  // State
  items: loadCartFromStorage(),
  isOpen: false,

  // Actions
  addItem: (product, quantity = 1) => {
    const items = get().items || [];
    const existingItem = items.find((item) => item._id === product._id);

    let newItems;
    if (existingItem) {
      newItems = items.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...items, { ...product, quantity, selected: false }];
    }

    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  removeItem: (productId) => {
    const items = get().items || [];
    const newItems = items.filter((item) => item._id !== productId);
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    const items = get().items || [];
    const newItems = items.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    );
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  toggleSelect: (productId) => {
    const items = get().items || [];
    const newItems = items.map((item) =>
      item._id === productId ? { ...item, selected: !item.selected } : item
    );
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  selectAll: () => {
    const items = get().items || [];
    const newItems = items.map((item) => ({ ...item, selected: true }));
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  unselectAll: () => {
    const items = get().items || [];
    const newItems = items.map((item) => ({ ...item, selected: false }));
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  clearCart: () => {
    set({ items: [] });
    saveCartToStorage([]);
  },

  clearSelected: () => {
    const items = get().items || [];
    const newItems = items.filter((item) => !item.selected);
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  toggleCart: () => {
    set({ isOpen: !get().isOpen });
  },

  // Getters
  getTotalItems: () => {
    const items = get().items || [];
    return items.reduce((total, item) => total + item.quantity, 0);
  },

  getSelectedItems: () => {
    const items = get().items || [];
    return items.filter((item) => item.selected);
  },

  getTotalPrice: () => {
    const items = get().items || [];
    return items
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getTotalSelectedItems: () => {
    const items = get().items || [];
    return items
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.quantity, 0);
  },

  // Tính giảm giá cho cốc (từ 2 cốc trở lên giảm 10% tổng giá cốc)
  getCupDiscount: () => {
    const items = get().items || [];
    const selectedItems = items.filter((item) => item.selected);
    
    console.log("=== DEBUG CUP DISCOUNT ===");
    console.log("All items:", items);
    console.log("Selected items:", selectedItems);
    
    // Lọc các sản phẩm là cốc (category title chứa chữ "cốc")
    const cupItems = selectedItems.filter(item => {
      const categoryTitle = item.product_category_id?.title || "";
      console.log(`Item: ${item.name}, Category: ${categoryTitle}`);
      return categoryTitle.toLowerCase().includes("cốc");
    });

    console.log("Cup items found:", cupItems);

    // Tính tổng số lượng cốc
    const totalCups = cupItems.reduce((sum, item) => sum + item.quantity, 0);
    console.log("Total cups:", totalCups);
    
    // Nếu có ít hơn 2 cốc thì không giảm
    if (totalCups < 2) return 0;

    // Tính tổng giá của tất cả cốc
    const totalCupPrice = cupItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );

    // Giảm 10% tổng giá cốc
    const discount = totalCupPrice * 0.10;
    console.log("Discount:", discount);
    
    return Math.floor(discount);
  },

  // Tổng giá sau khi giảm
  getFinalPrice: () => {
    const totalPrice = get().getTotalPrice();
    const discount = get().getCupDiscount();
    return totalPrice - discount;
  },
}));

export default useCartStore;
