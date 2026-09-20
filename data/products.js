const photo = (id, size = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&q=80&fm=jpg`;

export const products = [
  {
    id: '1',
    title: 'Капучіно',
    volume: '250 мл',
    price: '55 ₴',
    rating: '4.8',
    imageUrl: photo('1511920170033-f8396924c348'),
  },
  {
    id: '2',
    title: 'Латте',
    volume: '350 мл',
    price: '60 ₴',
    rating: '4.7',
    imageUrl: photo('1514432324607-a09d9b4aefdd'),
  },
  {
    id: '3',
    title: 'Американо',
    volume: '250 мл',
    price: '45 ₴',
    rating: '4.5',
    imageUrl: photo('1506372023823-741c83b836fe'),
  },
  {
    id: '4',
    title: 'Раф',
    volume: '350 мл',
    price: '70 ₴',
    rating: '4.9',
    imageUrl: photo('1485808191679-5f86510681a2'),
  },
  {
    id: '5',
    title: 'Флет вайт',
    volume: '250 мл',
    price: '65 ₴',
    rating: '4.6',
    imageUrl: photo('1572442388796-11668a67e53d'),
  },
  {
    id: '6',
    title: 'Круасан',
    volume: '1 шт',
    price: '45 ₴',
    rating: '4.8',
    imageUrl: photo('1623334044303-241021148842'),
  },
];

export const categories = [
  { id: 'coffee', label: 'Кава' },
  { id: 'tea', label: 'Чай' },
  { id: 'desserts', label: 'Десерти' },
  { id: 'breakfast', label: 'Сніданки' },
  { id: 'cold', label: 'Холодні напої' },
];

export const searchHints = ['капучіно', 'без лактози', 'до 60 ₴'];

export const cartItems = [
  {
    id: 'c1',
    title: 'Капучіно',
    options: '350 мл · без лактози',
    price: '65 ₴',
    quantity: 1,
    imageUrl: photo('1511920170033-f8396924c348', 200),
  },
  {
    id: 'c2',
    title: 'Круасан',
    options: 'мигдалевий · 1 шт',
    price: '45 ₴',
    quantity: 2,
    imageUrl: photo('1623334044303-241021148842', 200),
  },
];
