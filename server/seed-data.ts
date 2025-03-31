import { storage } from './storage';
import { InsertProduct, InsertStore } from '@shared/schema';
import { log } from './vite';

/**
 * Seed the database with initial data
 */
export async function seedDatabase() {
  try {
    log('Starting database seeding...', 'seed');
    
    // Seed stores
    const stores = await seedStores();
    log(`Created ${stores.length} stores`, 'seed');
    
    // Seed products
    const products = await seedProducts();
    log(`Created ${products.length} products`, 'seed');
    
    log('Database seeding completed successfully', 'seed');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log(`Error seeding database: ${errorMessage}`, 'seed');
  }
}

/**
 * Seed stores data
 */
async function seedStores() {
  const storeData: InsertStore[] = [
    {
      name: 'BigBasket',
      logo: 'https://www.bigbasket.com/media/uploads/banner_images/hp_bbstar_m_250923_400.jpg',
      website: 'https://www.bigbasket.com'
    },
    {
      name: 'JioMart',
      logo: 'https://www.jiomart.com/assets/ds2web/jds-client/jds-theme/images/jiomart_beta_logo.svg',
      website: 'https://www.jiomart.com'
    },
    {
      name: 'Amazon Fresh',
      logo: 'https://m.media-amazon.com/images/G/31/misc/Amazon_Fresh._CB1198675309_.png',
      website: 'https://www.amazon.in'
    },
    {
      name: 'Flipkart Grocery',
      logo: 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png',
      website: 'https://www.flipkart.com'
    }
  ];

  const stores = [];
  
  // Check if stores already exist
  const existingStores = await storage.getStores();
  if (existingStores.length > 0) {
    log('Stores already exist, skipping store seeding', 'seed');
    return existingStores;
  }
  
  // Create stores
  for (const store of storeData) {
    const createdStore = await storage.createStore(store);
    stores.push(createdStore);
  }
  
  return stores;
}

/**
 * Seed products data
 */
async function seedProducts() {
  const productData: InsertProduct[] = [
    {
      name: 'Tata Salt',
      description: 'Iodized table salt, 1kg pack',
      category: 'Spices & Condiments',
      image: 'https://www.bigbasket.com/media/uploads/p/l/241600_7-tata-salt-iodized.jpg',
      brand: 'Tata'
    },
    {
      name: 'Aashirvaad Atta',
      description: 'Whole wheat flour, 5kg pack',
      category: 'Flours & Grains',
      image: 'https://www.bigbasket.com/media/uploads/p/l/126903_8-aashirvaad-atta-whole-wheat.jpg',
      brand: 'Aashirvaad'
    },
    {
      name: 'Saffola Gold Oil',
      description: 'Refined cooking oil, 1L pack',
      category: 'Oils & Ghee',
      image: 'https://www.bigbasket.com/media/uploads/p/l/147491_9-saffola-gold-refined-cooking-oil-blended-rice-bran-sunflower-oil-helps-keeps-heart-healthy.jpg',
      brand: 'Saffola'
    },
    {
      name: 'Maggi Noodles',
      description: 'Instant noodles, pack of 4',
      category: 'Instant Food',
      image: 'https://www.bigbasket.com/media/uploads/p/l/266160_12-maggi-2-minute-noodles-masala.jpg',
      brand: 'Nestle'
    },
    {
      name: 'Amul Butter',
      description: 'Pasteurized butter, 500g pack',
      category: 'Dairy',
      image: 'https://www.bigbasket.com/media/uploads/p/l/40004472_8-amul-butter-pasteurised.jpg',
      brand: 'Amul'
    },
    {
      name: 'MTR Turmeric Powder',
      description: 'Ground turmeric, 100g pack',
      category: 'Spices & Condiments',
      image: 'https://www.bigbasket.com/media/uploads/p/l/40029536_6-mtr-turmeric-powder-powder.jpg',
      brand: 'MTR'
    },
    {
      name: 'Parle-G Original Biscuits',
      description: 'Glucose biscuits, 800g pack',
      category: 'Snacks',
      image: 'https://www.bigbasket.com/media/uploads/p/l/302410_8-parle-glucose-biscuits-parle-g.jpg',
      brand: 'Parle'
    },
    {
      name: 'Daawat Basmati Rice',
      description: 'Premium basmati rice, 5kg pack',
      category: 'Flours & Grains',
      image: 'https://www.bigbasket.com/media/uploads/p/l/10000407_12-daawat-basmati-rice-rozana-gold.jpg',
      brand: 'Daawat'
    },
    {
      name: 'Tata Tea Premium',
      description: 'Leaf tea, 500g pack',
      category: 'Tea & Coffee',
      image: 'https://www.bigbasket.com/media/uploads/p/l/266598_14-tata-tea-premium-leaf-tea.jpg',
      brand: 'Tata'
    },
    {
      name: 'Everest Garam Masala',
      description: 'Blended spices, 100g pack',
      category: 'Spices & Condiments',
      image: 'https://www.bigbasket.com/media/uploads/p/l/271290_5-everest-garam-masala.jpg',
      brand: 'Everest'
    }
  ];

  const products = [];
  
  // Check if products already exist
  const existingProducts = await storage.getProducts();
  if (existingProducts.length > 0) {
    log('Products already exist, skipping product seeding', 'seed');
    return existingProducts;
  }
  
  // Create products
  for (const product of productData) {
    const createdProduct = await storage.createProduct(product);
    products.push(createdProduct);
  }
  
  return products;
}