const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

// Load environment variables
dotenv.config({ path: './config.env' });

// Sample categories
const categories = [
  // 1. Electronics & Gadgets
  {
    name: 'Electronics & Gadgets',
    slug: 'electronics-gadgets',
    description: 'All types of electronic devices and gadgets'
  },
  {
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Mobile phones and accessories',
    parent_category: null
  },
  {
    name: 'Laptops & Computers',
    slug: 'laptops-computers',
    description: 'Portable computers and desktop systems',
    parent_category: null
  },
  {
    name: 'Smartwatches',
    slug: 'smartwatches',
    description: 'Smart watches and fitness trackers',
    parent_category: null
  },
  {
    name: 'Headphones & Audio',
    slug: 'headphones-audio',
    description: 'Headphones, speakers, and audio equipment',
    parent_category: null
  },
  {
    name: 'Cameras',
    slug: 'cameras',
    description: 'Digital cameras, lenses, and photography equipment',
    parent_category: null
  },

  // 2. Fashion & Apparel
  {
    name: 'Fashion & Apparel',
    slug: 'fashion-apparel',
    description: 'Clothing, shoes, and accessories'
  },
  {
    name: 'Men\'s Clothing',
    slug: 'mens-clothing',
    description: 'Clothing for men',
    parent_category: null
  },
  {
    name: 'Women\'s Clothing',
    slug: 'womens-clothing',
    description: 'Clothing for women',
    parent_category: null
  },
  {
    name: 'Kids\' Clothing',
    slug: 'kids-clothing',
    description: 'Clothing for children and toddlers',
    parent_category: null
  },
  {
    name: 'Footwear',
    slug: 'footwear',
    description: 'Shoes, sneakers, and other footwear',
    parent_category: null
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Bags, belts, wallets, and fashion accessories',
    parent_category: null
  },

  // 3. Home & Living
  {
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Home decor and living essentials'
  },
  {
    name: 'Furniture',
    slug: 'furniture',
    description: 'Home and office furniture',
    parent_category: null
  },
  {
    name: 'Home Décor',
    slug: 'home-decor',
    description: 'Home decoration items',
    parent_category: null
  },
  {
    name: 'Kitchen Essentials',
    slug: 'kitchen-essentials',
    description: 'Kitchen appliances and utensils',
    parent_category: null
  },
  {
    name: 'Bedding & Mattresses',
    slug: 'bedding-mattresses',
    description: 'Bed sheets, pillows, and mattresses',
    parent_category: null
  },
  {
    name: 'Storage & Organization',
    slug: 'storage-organization',
    description: 'Storage solutions and organization products',
    parent_category: null
  },

  // 4. Beauty & Personal Care
  {
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Beauty and personal care products'
  },
  {
    name: 'Skincare',
    slug: 'skincare',
    description: 'Facial and body skincare products',
    parent_category: null
  },
  {
    name: 'Haircare',
    slug: 'haircare',
    description: 'Hair products and accessories',
    parent_category: null
  },
  {
    name: 'Makeup',
    slug: 'makeup',
    description: 'Cosmetics and makeup products',
    parent_category: null
  },
  {
    name: 'Perfumes & Fragrances',
    slug: 'perfumes-fragrances',
    description: 'Perfumes, colognes, and fragrances',
    parent_category: null
  },
  {
    name: 'Grooming Essentials',
    slug: 'grooming-essentials',
    description: 'Personal grooming products',
    parent_category: null
  },

  // 5. Groceries & Essentials
  {
    name: 'Groceries & Essentials',
    slug: 'groceries-essentials',
    description: 'Food, beverages, and household essentials'
  },
  {
    name: 'Fresh Fruits & Vegetables',
    slug: 'fresh-fruits-vegetables',
    description: 'Fresh produce and vegetables',
    parent_category: null
  },
  {
    name: 'Packaged Food & Snacks',
    slug: 'packaged-food-snacks',
    description: 'Packaged food items and snacks',
    parent_category: null
  },
  {
    name: 'Beverages',
    slug: 'beverages',
    description: 'Soft drinks, juices, and beverages',
    parent_category: null
  },
  {
    name: 'Household Supplies',
    slug: 'household-supplies',
    description: 'Cleaning and household supplies',
    parent_category: null
  },
  {
    name: 'Personal Hygiene',
    slug: 'personal-hygiene',
    description: 'Personal hygiene products',
    parent_category: null
  },

  // 6. Sports & Fitness
  {
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    description: 'Sports equipment and fitness gear'
  },
  {
    name: 'Gym Equipment',
    slug: 'gym-equipment',
    description: 'Exercise equipment and workout gear',
    parent_category: null
  },
  {
    name: 'Activewear',
    slug: 'activewear',
    description: 'Sports and fitness clothing',
    parent_category: null
  },
  {
    name: 'Outdoor Sports Gear',
    slug: 'outdoor-sports-gear',
    description: 'Outdoor sports equipment',
    parent_category: null
  },
  {
    name: 'Yoga Mats & Accessories',
    slug: 'yoga-mats-accessories',
    description: 'Yoga equipment and accessories',
    parent_category: null
  },

  // 7. Toys & Kids Products
  {
    name: 'Toys & Kids Products',
    slug: 'toys-kids-products',
    description: 'Toys and products for children'
  },
  {
    name: 'Toys & Games',
    slug: 'toys-games',
    description: 'Toys and games for all ages',
    parent_category: null
  },
  {
    name: 'Baby Essentials',
    slug: 'baby-essentials',
    description: 'Baby food, diapers, and care products',
    parent_category: null
  },
  {
    name: 'Kids\' Stationery',
    slug: 'kids-stationery',
    description: 'Stationery for children',
    parent_category: null
  },
  {
    name: 'Learning & Educational Toys',
    slug: 'learning-educational-toys',
    description: 'Educational toys and learning materials',
    parent_category: null
  },

  // 8. Books & Stationery
  {
    name: 'Books & Stationery',
    slug: 'books-stationery',
    description: 'Books, magazines, and stationery'
  },
  {
    name: 'Novels & Literature',
    slug: 'novels-literature',
    description: 'Fiction books and literature',
    parent_category: null
  },
  {
    name: 'Academic Books',
    slug: 'academic-books',
    description: 'Educational and academic books',
    parent_category: null
  },
  {
    name: 'Office Stationery',
    slug: 'office-stationery',
    description: 'Office supplies and stationery',
    parent_category: null
  },
  {
    name: 'Art & Craft Supplies',
    slug: 'art-craft-supplies',
    description: 'Art materials and craft supplies',
    parent_category: null
  },

  // 9. Automotive
  {
    name: 'Automotive',
    slug: 'automotive',
    description: 'Car and bike accessories'
  },
  {
    name: 'Car Accessories',
    slug: 'car-accessories',
    description: 'Interior and exterior car accessories',
    parent_category: null
  },
  {
    name: 'Bike Accessories',
    slug: 'bike-accessories',
    description: 'Bicycle accessories and parts',
    parent_category: null
  },
  {
    name: 'Oils & Lubricants',
    slug: 'oils-lubricants',
    description: 'Automotive oils and lubricants',
    parent_category: null
  },
  {
    name: 'Helmets & Riding Gear',
    slug: 'helmets-riding-gear',
    description: 'Safety gear for riding',
    parent_category: null
  },

  // 10. Health & Wellness
  {
    name: 'Health & Wellness',
    slug: 'health-wellness',
    description: 'Health and wellness products'
  },
  {
    name: 'Vitamins & Supplements',
    slug: 'vitamins-supplements',
    description: 'Dietary supplements and vitamins',
    parent_category: null
  },
  {
    name: 'Medical Devices',
    slug: 'medical-devices',
    description: 'Medical devices and health monitoring',
    parent_category: null
  },
  {
    name: 'First Aid Essentials',
    slug: 'first-aid-essentials',
    description: 'First aid kits and medical supplies',
    parent_category: null
  },
  {
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Personal care and hygiene products',
    parent_category: null
  },

  // 11. Jewelry & Watches
  {
    name: 'Jewelry & Watches',
    slug: 'jewelry-watches',
    description: 'Jewelry and timepieces'
  },
  {
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Necklaces and chains',
    parent_category: null
  },
  {
    name: 'Rings',
    slug: 'rings',
    description: 'Rings and finger jewelry',
    parent_category: null
  },
  {
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Bracelets and wrist jewelry',
    parent_category: null
  },
  {
    name: 'Watches',
    slug: 'watches',
    description: 'Wristwatches and timepieces',
    parent_category: null
  },

  // 12. Pet Supplies
  {
    name: 'Pet Supplies',
    slug: 'pet-supplies',
    description: 'Pet food, toys, and accessories'
  },
  {
    name: 'Pet Food',
    slug: 'pet-food',
    description: 'Food for dogs, cats, and other pets',
    parent_category: null
  },
  {
    name: 'Grooming Products',
    slug: 'grooming-products',
    description: 'Pet grooming and care products',
    parent_category: null
  },
  {
    name: 'Pet Toys',
    slug: 'pet-toys',
    description: 'Toys for pets',
    parent_category: null
  },
  {
    name: 'Pet Beds & Accessories',
    slug: 'pet-beds-accessories',
    description: 'Pet beds and accessories',
    parent_category: null
  }
];

// Sample products
const products = [
  {
    "id": "prod_1001",
    "sku": "TSHIRT-BLK-001",
    "title": "Classic Black T-Shirt",
    "description": "A premium cotton black t-shirt with round neck. Soft, breathable and perfect for everyday wear.",
    "short_description": "Premium cotton round-neck black t-shirt.",
    "price": 599,
    "currency": "INR",
    "categories": ["Clothing", "T-Shirts"],
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop"
    ],
    "variants": [
      {
        "variant_id": "v1",
        "color": "Black",
        "size": "S",
        "stock": 25
      },
      {
        "variant_id": "v2",
        "color": "Black",
        "size": "M",
        "stock": 40
      },
      {
        "variant_id": "v3",
        "color": "Black",
        "size": "L",
        "stock": 35
      }
    ],
    "ratings": {
      "average": 4.5,
      "count": 128
    },
    "tags": ["cotton", "casual", "unisex"],
    "is_active": true
  },
  {
    "id": "prod_1002",
    "sku": "SHOES-WHT-002",
    "title": "White Sneakers",
    "description": "Minimal white sneakers with rubber sole and breathable mesh. Comfortable for daily wear and casual outings.",
    "short_description": "Minimal white sneakers for casual wear.",
    "price": 1999,
    "currency": "INR",
    "categories": ["Footwear", "Sneakers"],
    "images": [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop"
    ],
    "variants": [
      {
        "variant_id": "v1",
        "color": "White",
        "size": "UK 7",
        "stock": 15
      },
      {
        "variant_id": "v2",
        "color": "White",
        "size": "UK 8",
        "stock": 22
      },
      {
        "variant_id": "v3",
        "color": "White",
        "size": "UK 9",
        "stock": 10
      }
    ],
    "ratings": {
      "average": 4.2,
      "count": 87
    },
    "tags": ["sneakers", "casual", "unisex"],
    "is_active": true
  },
  {
    "id": "prod_1003",
    "sku": "LAPTOP-BAG-003",
    "title": "Laptop Backpack",
    "description": "Water-resistant laptop backpack with multiple compartments and ergonomic straps. Fits laptops up to 15.6 inches.",
    "short_description": "Waterproof laptop backpack with multiple compartments.",
    "price": 1499,
    "currency": "INR",
    "categories": ["Accessories", "Bags"],
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&h=500&fit=crop"
    ],
    "variants": [
      {
        "variant_id": "v1",
        "color": "Gray",
        "size": "Standard",
        "stock": 30
      },
      {
        "variant_id": "v2",
        "color": "Blue",
        "size": "Standard",
        "stock": 20
      }
    ],
    "ratings": {
      "average": 4.7,
      "count": 245
    },
    "tags": ["backpack", "waterproof", "office"],
    "is_active": true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);

    // Update parent category references
    for (let i = 0; i < createdCategories.length; i++) {
      const category = createdCategories[i];
      if (category.name === 'T-Shirts') {
        const clothingCategory = createdCategories.find(c => c.name === 'Clothing');
        if (clothingCategory) {
          category.parent_category = clothingCategory._id;
          await category.save();
        }
      } else if (category.name === 'Sneakers') {
        const footwearCategory = createdCategories.find(c => c.name === 'Footwear');
        if (footwearCategory) {
          category.parent_category = footwearCategory._id;
          await category.save();
        }
      } else if (category.name === 'Bags') {
        const accessoriesCategory = createdCategories.find(c => c.name === 'Accessories');
        if (accessoriesCategory) {
          category.parent_category = accessoriesCategory._id;
          await category.save();
        }
      }
    }

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
