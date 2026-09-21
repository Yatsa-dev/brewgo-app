import { createSlice } from '@reduxjs/toolkit';

import { cartItems as seedCartItems } from '../data/products';

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 99;

// Prices arrive from the API as strings like "55 ₴", so the numeric value is
// parsed only where arithmetic is needed and never stored twice.
export const priceToNumber = (price) => Number(String(price).replace(/[^\d]/g, '')) || 0;

// The cart has no backend yet, so it opens with a small local seed.
// Replacing this with an empty array is enough to start from a clean cart.
const initialState = {
  items: seedCartItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // A repeated drink increases the quantity of the existing line instead of
    // creating a duplicate row.
    addItem: (state, action) => {
      const drink = action.payload;
      const existing = state.items.find((item) => item.drinkId === drink.id);

      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, MAX_QUANTITY);
        return;
      }

      state.items.push({
        id: `${drink.id}-${Date.now()}`,
        drinkId: drink.id,
        title: drink.title,
        options: drink.volume,
        price: drink.price,
        imageUrl: drink.imageUrl,
        quantity: MIN_QUANTITY,
      });
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((entry) => entry.id === id);
      if (!item) return;

      // Dropping to zero removes the line, which is what the stepper's minus
      // button should do at the last unit.
      if (quantity < MIN_QUANTITY) {
        state.items = state.items.filter((entry) => entry.id !== id);
        return;
      }

      item.quantity = Math.min(quantity, MAX_QUANTITY);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + priceToNumber(item.price) * item.quantity, 0);

export default cartSlice.reducer;
