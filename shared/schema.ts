import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ many }) => ({
  shoppingLists: many(shoppingLists),
  favorites: many(favorites),
}));

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  category: text("category").notNull(),
  brand: text("brand"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  image: true,
  category: true,
  brand: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
  listItems: many(listItems),
  favorites: many(favorites),
}));

export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertStoreSchema = createInsertSchema(stores).pick({
  name: true,
  logo: true,
  website: true,
});

export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Store = typeof stores.$inferSelect;

export const storesRelations = relations(stores, ({ many }) => ({
  prices: many(prices),
}));

export const prices = pgTable("prices", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  storeId: integer("store_id").notNull(),
  price: text("price").notNull(),
  onSale: boolean("on_sale").default(false),
  salePrice: text("sale_price"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPriceSchema = createInsertSchema(prices).pick({
  productId: true,
  storeId: true,
  price: true,
  onSale: true,
  salePrice: true,
});

export type InsertPrice = z.infer<typeof insertPriceSchema>;
export type Price = typeof prices.$inferSelect;

export const pricesRelations = relations(prices, ({ one }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.id],
  }),
  store: one(stores, {
    fields: [prices.storeId],
    references: [stores.id],
  }),
}));

export const shoppingLists = pgTable("shopping_lists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertShoppingListSchema = createInsertSchema(shoppingLists).pick({
  userId: true,
  name: true,
});

export type InsertShoppingList = z.infer<typeof insertShoppingListSchema>;
export type ShoppingList = typeof shoppingLists.$inferSelect;

export const shoppingListsRelations = relations(shoppingLists, ({ one, many }) => ({
  user: one(users, {
    fields: [shoppingLists.userId],
    references: [users.id],
  }),
  items: many(listItems),
}));

export const listItems = pgTable("list_items", {
  id: serial("id").primaryKey(),
  listId: integer("list_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").default(1),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertListItemSchema = createInsertSchema(listItems).pick({
  listId: true,
  productId: true,
  quantity: true,
  completed: true,
});

export type InsertListItem = z.infer<typeof insertListItemSchema>;
export type ListItem = typeof listItems.$inferSelect;

export const listItemsRelations = relations(listItems, ({ one }) => ({
  list: one(shoppingLists, {
    fields: [listItems.listId],
    references: [shoppingLists.id],
  }),
  product: one(products, {
    fields: [listItems.productId],
    references: [products.id],
  }),
}));

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  productId: integer("product_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFavoriteSchema = createInsertSchema(favorites).pick({
  userId: true,
  productId: true,
});

export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favorites.$inferSelect;

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [favorites.productId],
    references: [products.id],
  }),
}));
