export const getDefaultBuyList = (extra?: number) => [
    { title: 'Banana', price: '20' },
    { title: 'Mango', price: '35' },
    { title: 'Banana', price: '20' },
    { title: 'Peach', price: '40' },
    { title: 'Apple', price: '15' },
    { title: 'Orange', price: '15' },
    { title: 'Watermelon', price: '45' },
    { title: 'Papaya', price: '30' },
    { title: 'Tomato', price: '' },
    ...Array(extra ?? 0).fill({ title: 'NewItem', price: '' }),
];
