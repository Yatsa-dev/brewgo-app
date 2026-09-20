const photo = (id, size = 300) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&q=80&fm=jpg`;

export const searchHints = ['latte', 'espresso', 'mocha'];

// The cart has no backend yet, so it starts from a small local seed.
// Prices follow the same rule the API mapper uses, to stay consistent with the menu.
export const cartItems = [
  {
    id: 'seed-2',
    drinkId: '2',
    title: 'Latte',
    options: '450 мл',
    price: '55 ₴',
    quantity: 1,
    imageUrl: photo('1561882468-9110e03e0f78'),
  },
  {
    id: 'seed-3',
    drinkId: '3',
    title: 'Caramel Latte',
    options: '250 мл',
    price: '60 ₴',
    quantity: 2,
    imageUrl: photo('1623334044303-241021148842'),
  },
];
