import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  stores, type Store, type InsertStore,
  prices, type Price, type InsertPrice,
  shoppingLists, type ShoppingList, type InsertShoppingList,
  listItems, type ListItem, type InsertListItem,
  favorites, type Favorite, type InsertFavorite
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPgSimple from "connect-pg-simple";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import { pool } from "./db";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPgSimple(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Store methods
  getStores(): Promise<Store[]>;
  getStoreById(id: number): Promise<Store | undefined>;
  createStore(store: InsertStore): Promise<Store>;

  // Price methods
  getPrices(): Promise<Price[]>;
  getPriceById(id: number): Promise<Price | undefined>;
  getPricesByProductId(productId: number): Promise<Price[]>;
  createPrice(price: InsertPrice): Promise<Price>;
  deletePrice(id: number): Promise<boolean>;

  // Shopping list methods
  getShoppingLists(userId: number): Promise<ShoppingList[]>;
  getShoppingListById(id: number): Promise<ShoppingList | undefined>;
  createShoppingList(list: InsertShoppingList): Promise<ShoppingList>;
  updateShoppingList(id: number, list: Partial<ShoppingList>): Promise<ShoppingList | undefined>;
  deleteShoppingList(id: number): Promise<boolean>;

  // List item methods
  getListItems(listId: number): Promise<ListItem[]>;
  getListItemById(id: number): Promise<ListItem | undefined>;
  createListItem(item: InsertListItem): Promise<ListItem>;
  updateListItem(id: number, item: Partial<ListItem>): Promise<ListItem | undefined>;
  deleteListItem(id: number): Promise<boolean>;

  // Favorite methods
  getFavorites(userId: number): Promise<Favorite[]>;
  createFavorite(favorite: InsertFavorite): Promise<Favorite>;
  deleteFavorite(id: number): Promise<boolean>;
  
  // Session store
  sessionStore: any; // Using any as a workaround for session.Store typing issues
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private stores: Map<number, Store>;
  private prices: Map<number, Price>;
  private shoppingLists: Map<number, ShoppingList>;
  private listItems: Map<number, ListItem>;
  private favorites: Map<number, Favorite>;
  
  private userIdCounter: number;
  private productIdCounter: number;
  private storeIdCounter: number;
  private priceIdCounter: number;
  private shoppingListIdCounter: number;
  private listItemIdCounter: number;
  private favoriteIdCounter: number;
  
  sessionStore: any; // Using any as a workaround for session.Store typing issues

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.stores = new Map();
    this.prices = new Map();
    this.shoppingLists = new Map();
    this.listItems = new Map();
    this.favorites = new Map();
    
    this.userIdCounter = 1;
    this.productIdCounter = 1;
    this.storeIdCounter = 1;
    this.priceIdCounter = 1;
    this.shoppingListIdCounter = 1;
    this.listItemIdCounter = 1;
    this.favoriteIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // Prune expired entries every 24h
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...userData, 
      id,
      createdAt: now,
      fullName: userData.fullName || null
    };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async createProduct(productData: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const now = new Date();
    const product: Product = {
      ...productData,
      id,
      createdAt: now,
      description: productData.description || null,
      image: productData.image || null,
      brand: productData.brand || null
    };
    this.products.set(id, product);
    return product;
  }

  // Store methods
  async getStores(): Promise<Store[]> {
    return Array.from(this.stores.values());
  }

  async getStoreById(id: number): Promise<Store | undefined> {
    return this.stores.get(id);
  }

  async createStore(storeData: InsertStore): Promise<Store> {
    const id = this.storeIdCounter++;
    const now = new Date();
    const store: Store = {
      ...storeData,
      id,
      createdAt: now,
      logo: storeData.logo || null,
      website: storeData.website || null
    };
    this.stores.set(id, store);
    return store;
  }

  // Price methods
  async getPrices(): Promise<Price[]> {
    return Array.from(this.prices.values());
  }

  async getPriceById(id: number): Promise<Price | undefined> {
    return this.prices.get(id);
  }

  async getPricesByProductId(productId: number): Promise<Price[]> {
    return Array.from(this.prices.values()).filter(
      (price) => price.productId === productId
    );
  }

  async createPrice(priceData: InsertPrice): Promise<Price> {
    const id = this.priceIdCounter++;
    const now = new Date();
    const price: Price = {
      ...priceData,
      id,
      createdAt: now,
      onSale: priceData.onSale || null,
      salePrice: priceData.salePrice || null
    };
    this.prices.set(id, price);
    return price;
  }
  
  async deletePrice(id: number): Promise<boolean> {
    return this.prices.delete(id);
  }

  // Shopping list methods
  async getShoppingLists(userId: number): Promise<ShoppingList[]> {
    return Array.from(this.shoppingLists.values()).filter(
      (list) => list.userId === userId
    );
  }

  async getShoppingListById(id: number): Promise<ShoppingList | undefined> {
    return this.shoppingLists.get(id);
  }

  async createShoppingList(listData: InsertShoppingList): Promise<ShoppingList> {
    const id = this.shoppingListIdCounter++;
    const now = new Date();
    const list: ShoppingList = {
      ...listData,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.shoppingLists.set(id, list);
    return list;
  }

  async updateShoppingList(id: number, listData: Partial<ShoppingList>): Promise<ShoppingList | undefined> {
    const list = this.shoppingLists.get(id);
    if (!list) return undefined;
    
    const updatedList: ShoppingList = {
      ...list,
      ...listData,
      updatedAt: new Date()
    };
    this.shoppingLists.set(id, updatedList);
    return updatedList;
  }

  async deleteShoppingList(id: number): Promise<boolean> {
    return this.shoppingLists.delete(id);
  }

  // List item methods
  async getListItems(listId: number): Promise<ListItem[]> {
    return Array.from(this.listItems.values()).filter(
      (item) => item.listId === listId
    );
  }

  async getListItemById(id: number): Promise<ListItem | undefined> {
    return this.listItems.get(id);
  }

  async createListItem(itemData: InsertListItem): Promise<ListItem> {
    const id = this.listItemIdCounter++;
    const now = new Date();
    const item: ListItem = {
      ...itemData,
      id,
      createdAt: now,
      quantity: itemData.quantity || null,
      completed: itemData.completed || null
    };
    this.listItems.set(id, item);
    return item;
  }

  async updateListItem(id: number, itemData: Partial<ListItem>): Promise<ListItem | undefined> {
    const item = this.listItems.get(id);
    if (!item) return undefined;
    
    const updatedItem: ListItem = {
      ...item,
      ...itemData
    };
    this.listItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteListItem(id: number): Promise<boolean> {
    return this.listItems.delete(id);
  }

  // Favorite methods
  async getFavorites(userId: number): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(
      (favorite) => favorite.userId === userId
    );
  }

  async createFavorite(favoriteData: InsertFavorite): Promise<Favorite> {
    const id = this.favoriteIdCounter++;
    const now = new Date();
    const favorite: Favorite = {
      ...favoriteData,
      id,
      createdAt: now
    };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async deleteFavorite(id: number): Promise<boolean> {
    return this.favorites.delete(id);
  }
}

export class DatabaseStorage implements IStorage {
  sessionStore: any; // Using any as a workaround for session.Store typing issues

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      conObject: {
        connectionString: process.env.DATABASE_URL,
      },
      createTableIfMissing: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async createProduct(productData: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values(productData).returning();
    return product;
  }

  // Store methods
  async getStores(): Promise<Store[]> {
    return await db.select().from(stores);
  }

  async getStoreById(id: number): Promise<Store | undefined> {
    const [store] = await db.select().from(stores).where(eq(stores.id, id));
    return store;
  }

  async createStore(storeData: InsertStore): Promise<Store> {
    const [store] = await db.insert(stores).values(storeData).returning();
    return store;
  }

  // Price methods
  async getPrices(): Promise<Price[]> {
    return await db.select().from(prices);
  }

  async getPriceById(id: number): Promise<Price | undefined> {
    const [price] = await db.select().from(prices).where(eq(prices.id, id));
    return price;
  }

  async getPricesByProductId(productId: number): Promise<Price[]> {
    return await db.select().from(prices).where(eq(prices.productId, productId));
  }

  async createPrice(priceData: InsertPrice): Promise<Price> {
    const [price] = await db.insert(prices).values(priceData).returning();
    return price;
  }
  
  async deletePrice(id: number): Promise<boolean> {
    const [deletedPrice] = await db
      .delete(prices)
      .where(eq(prices.id, id))
      .returning();
    
    return !!deletedPrice;
  }

  // Shopping list methods
  async getShoppingLists(userId: number): Promise<ShoppingList[]> {
    return await db.select().from(shoppingLists).where(eq(shoppingLists.userId, userId));
  }

  async getShoppingListById(id: number): Promise<ShoppingList | undefined> {
    const [list] = await db.select().from(shoppingLists).where(eq(shoppingLists.id, id));
    return list;
  }

  async createShoppingList(listData: InsertShoppingList): Promise<ShoppingList> {
    const [list] = await db.insert(shoppingLists).values(listData).returning();
    return list;
  }

  async updateShoppingList(id: number, listData: Partial<ShoppingList>): Promise<ShoppingList | undefined> {
    const [updatedList] = await db
      .update(shoppingLists)
      .set({ ...listData, updatedAt: new Date() })
      .where(eq(shoppingLists.id, id))
      .returning();
    return updatedList;
  }

  async deleteShoppingList(id: number): Promise<boolean> {
    // First, delete all list items associated with this list
    await db.delete(listItems).where(eq(listItems.listId, id));
    
    // Then delete the list itself
    const [deletedList] = await db
      .delete(shoppingLists)
      .where(eq(shoppingLists.id, id))
      .returning();
    
    return !!deletedList;
  }

  // List item methods
  async getListItems(listId: number): Promise<ListItem[]> {
    return await db.select().from(listItems).where(eq(listItems.listId, listId));
  }

  async getListItemById(id: number): Promise<ListItem | undefined> {
    const [item] = await db.select().from(listItems).where(eq(listItems.id, id));
    return item;
  }

  async createListItem(itemData: InsertListItem): Promise<ListItem> {
    const [item] = await db.insert(listItems).values(itemData).returning();
    return item;
  }

  async updateListItem(id: number, itemData: Partial<ListItem>): Promise<ListItem | undefined> {
    const [updatedItem] = await db
      .update(listItems)
      .set(itemData)
      .where(eq(listItems.id, id))
      .returning();
    return updatedItem;
  }

  async deleteListItem(id: number): Promise<boolean> {
    const [deletedItem] = await db
      .delete(listItems)
      .where(eq(listItems.id, id))
      .returning();
    
    return !!deletedItem;
  }

  // Favorite methods
  async getFavorites(userId: number): Promise<Favorite[]> {
    return await db.select().from(favorites).where(eq(favorites.userId, userId));
  }

  async createFavorite(favoriteData: InsertFavorite): Promise<Favorite> {
    const [favorite] = await db.insert(favorites).values(favoriteData).returning();
    return favorite;
  }

  async deleteFavorite(id: number): Promise<boolean> {
    const [deletedFavorite] = await db
      .delete(favorites)
      .where(eq(favorites.id, id))
      .returning();
    
    return !!deletedFavorite;
  }
}

// Use DatabaseStorage for persistent storage
export const storage = new DatabaseStorage();
