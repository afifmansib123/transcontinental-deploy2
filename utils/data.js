import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Admin',
      email: 'afifmansib123@gmail.com',
      password: bcrypt.hashSync('Ageekis0cool!'),
      isAdmin: true,
      isExporter: false,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
      isExporter: false,
    },
    {
      name: 'Kram',
      email: 'kram@example.com',
      password: bcrypt.hashSync('Ageekis0cool!'),
      isAdmin: false,
      isExporter: true,
    },
  ],
  products: [
    {
      name: 'MITSUBISHI SR320E rollers',
      slug: 'EXC00000002',
      category: 'roller',
      image1: '/images/5.1.png',
      image2: '/images/5.2.png',
      image3: '/images/5.3.png',
      image4: '/images/5.4.png',
      image5: '/images/5.5.png',
      price: 4400000,
      brand: 'MITSUBISHI',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'MITSUBISHI SR320E, MITSUBISHI 6D24-TCE1, 315 Hp, Equivalent To 160H / Cab / Blade 4.0 Meters, 19.4 Tons',
      isFeatured: true,
      banner: '/images/featured-1.jpeg',
      
      
    },
    {
      name: '2021 Mercedes-Benz',
      slug: 'EXC00000001',
      category: 'car',
      image1: '/images/car1.png',
      image2: '/images/car2.png',
      image3: '/images/car3.png',
      image4: '/images/car4.png',
      image5: '/images/car5.png',
      price: 10900000,
      brand: 'Mercedes-Benz',
      rating: 4.5,
      numReviews: 10,
      countInStock: 2,
      description: ' E300 2.0 W238 AMG Dynamic Cabriolet 1991 CC, second hand, 35k Kilo Milate, port : Thailand',
      isFeatured: true,
      banner: '/images/featured-1.jpeg',
    },
    {
      name: 'Komatsu Excavator',
      slug: 'EXC00000003',
      category: 'excavator',
      image1: '/images/item1.3.png',
      //image2: '/images/item1.2.png',
      //image3: '/images/item1.1.png',
      image4: '/images/item1.4.png',
      image5: '/images/item1.5.png',
      price: 2832000,
      brand: 'Komatsu',
      rating: 4.5,
      numReviews: 10,
      countInStock: 9,
      description: 'Komatsu Pc50Mr-2, Engine Komatsu 4D88E-5Xac, 41.0 Hp, 5.0 Tons',
      isFeatured: true,
      banner: '/images/featured-3.gif',
      
    },
    {
      name: 'KOBELCO SK125SR (YV06)',
      slug: 'EXC00000004',
      category: 'excavator',
      image1: '/images/item2.1.png',
      image2: '/images/item2.2.png',
      image3: '/images/item2.3.png',
      image4: '/images/item2.4.png',
      image5: '/images/item2.5.png',
      price: 4320000,
      brand: 'KOBELCO',
      rating: 2.9,
      numReviews: 13,
      countInStock: 1,
      description: 'Kobelco Sk125Sr (Yv06), engine : MITSUBISHI D04FR-KDP2TAAC, working hours : 9,306 Hours, model : 2011',
     
      
    },
    {
      name: 'KOMATSU excavator',
      slug: 'EXC00000005',
      category: 'excavator',
      image1: '/images/item3.1.png',
      image2: '/images/item3.2.png',
      image3: '/images/item3.3.png',
      image4: '/images/item3.4.png',
      image5: '/images/item3.5.png',
      price: 11200000,
      brand: 'KOMATSU',
      rating: 3.5,
      numReviews: 7,
      countInStock: 20,
      description: 'KOMATSU PC200-10, Weight 19.6 Tons, Year Of Manufacture : 2015, Working Hours 4,991 HoursEngine Power 165.2 Hp',
    },
    
  ],
};

export default data;
