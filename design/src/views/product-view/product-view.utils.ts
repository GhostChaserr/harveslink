export const GENERATE_PRODUCTS_MOCK = () => {
  const cities = [
    'New York',
    'London',
    'Tokyo',
    'Paris',
    'Berlin',
    'Sydney',
    'Dubai',
    'Singapore',
  ];
  const countries = [
    'USA',
    'UK',
    'Japan',
    'France',
    'Germany',
    'Australia',
    'UAE',
    'Singapore',
  ];
  const statusOptions = ['active', 'inactive', 'out_of_stock', 'discontinued'];
  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];

  const products = [];

  for (let i = 1; i <= 1000; i++) {
    const cityIndex = Math.floor(Math.random() * cities.length);
    const createdAt = new Date(
      Date.now() - Math.floor(Math.random() * 31536000000)
    ); // Random date in last year
    const updatedAt = new Date(
      createdAt.getTime() + Math.floor(Math.random() * 31536000000)
    );
    const startDate = new Date(
      Date.now() + Math.floor(Math.random() * 2592000000)
    ); // Next 30 days
    const expiryDate = new Date(
      startDate.getTime() + Math.floor(Math.random() * 2592000000)
    ); // 30 days after start

    products.push({
      id: `product-${i.toString().padStart(4, '0')}`,
      productName: `Product ${i} - ${
        ['Advanced', 'Premium', 'Basic', 'Pro'][Math.floor(Math.random() * 4)]
      } ${
        ['Widget', 'Gadget', 'Tool', 'Device'][Math.floor(Math.random() * 4)]
      }`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Product ${i} description.`,
      price: parseFloat((Math.random() * 990 + 10).toFixed(2)), // Between 10 and 1000
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      quantityAvailable: Math.floor(Math.random() * 1000),
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
      address: `${Math.floor(Math.random() * 1000)} ${
        ['Main', 'Oak', 'Maple', 'Pine'][Math.floor(Math.random() * 4)]
      } St.`,
      city: cities[cityIndex],
      country: countries[cityIndex], // Matching country for city
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      startDate: startDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    });
  }

  return products;
};

