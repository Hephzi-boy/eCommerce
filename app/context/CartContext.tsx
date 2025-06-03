import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface CartItem {
  id: string; // Unique identifier for the product (e.g., productImageIdentifier)
  name: string;
  variant: string;
  price: string;
  imageIdentifier: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  updateItemQuantity: (itemId: string, newQuantity: number) => void;
  removeItem: (itemId: string) => void;
  getCartItemCount: () => number;
  hasItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Add new item with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    setItems(prevItems =>
      prevItems
        .map(item => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
        .filter(item => item.quantity > 0) // Remove item if quantity becomes 0 or less
    );
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateItemQuantity, removeItem, getCartItemCount: () => items.reduce((sum, item) => sum + item.quantity, 0), hasItems: items.length > 0 }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
