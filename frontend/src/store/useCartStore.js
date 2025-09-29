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
  addItem: (product) => {
    const items = get().items || [];
    const existingItem = items.find(item => item.id === product.id);
    
    let newItems;
    if (existingItem) {
      newItems = items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...items, { ...product, quantity: 1, selected: false }];
    }
    
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  removeItem: (productId) => {
    const items = get().items || [];
    const newItems = items.filter(item => item.id !== productId);
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    const items = get().items || [];
    const newItems = items.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    );
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  toggleSelect: (productId) => {
    const items = get().items || [];
    const newItems = items.map(item =>
      item.id === productId
        ? { ...item, selected: !item.selected }
        : item
    );
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  selectAll: () => {
    const items = get().items || [];
    const newItems = items.map(item => ({ ...item, selected: true }));
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  unselectAll: () => {
    const items = get().items || [];
    const newItems = items.map(item => ({ ...item, selected: false }));
    set({ items: newItems });
    saveCartToStorage(newItems);
  },

  clearCart: () => {
    set({ items: [] });
    saveCartToStorage([]);
  },

  clearSelected: () => {
    const items = get().items || [];
    const newItems = items.filter(item => !item.selected);
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
    return items.filter(item => item.selected);
  },

  getTotalPrice: () => {
    const items = get().items || [];
    return items
      .filter(item => item.selected)
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getTotalSelectedItems: () => {
    const items = get().items || [];
    return items
      .filter(item => item.selected)
      .reduce((total, item) => total + item.quantity, 0);
  }
}));

export default useCartStore;
