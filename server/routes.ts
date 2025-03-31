import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertShoppingListSchema, insertListItemSchema } from "@shared/schema";
import { z } from "zod";
import { priceController } from "./controllers/price-controller";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Product routes
  app.get("/api/products", async (req, res, next) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/products/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/products/category/:category", async (req, res, next) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

  // Prices routes
  app.get("/api/prices", (req, res) => priceController.getAllPrices(req, res));
  app.get("/api/prices/product/:productId", (req, res) => priceController.getPricesForProduct(req, res));
  app.post("/api/prices/refresh/product/:productId", (req, res) => priceController.refreshPricesForProduct(req, res));
  app.post("/api/prices/refresh/all", (req, res) => priceController.refreshAllPrices(req, res));

  // Shopping list routes
  app.get("/api/shopping-lists", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const lists = await storage.getShoppingLists(req.user.id);
      res.json(lists);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/shopping-lists", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const validatedData = insertShoppingListSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const list = await storage.createShoppingList(validatedData);
      res.status(201).json(list);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/shopping-lists/:id", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const id = parseInt(req.params.id);
      const list = await storage.getShoppingListById(id);
      
      if (!list) {
        return res.status(404).json({ message: "Shopping list not found" });
      }
      
      if (list.userId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }
      
      const updatedList = await storage.updateShoppingList(id, req.body);
      res.json(updatedList);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/shopping-lists/:id", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const id = parseInt(req.params.id);
      const list = await storage.getShoppingListById(id);
      
      if (!list) {
        return res.status(404).json({ message: "Shopping list not found" });
      }
      
      if (list.userId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }
      
      await storage.deleteShoppingList(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  // List items routes
  app.get("/api/shopping-lists/:listId/items", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const listId = parseInt(req.params.listId);
      const list = await storage.getShoppingListById(listId);
      
      if (!list) {
        return res.status(404).json({ message: "Shopping list not found" });
      }
      
      if (list.userId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }
      
      const items = await storage.getListItems(listId);
      res.json(items);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/shopping-lists/:listId/items", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const listId = parseInt(req.params.listId);
      const list = await storage.getShoppingListById(listId);
      
      if (!list) {
        return res.status(404).json({ message: "Shopping list not found" });
      }
      
      if (list.userId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }
      
      const validatedData = insertListItemSchema.parse({
        ...req.body,
        listId
      });
      
      const item = await storage.createListItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/list-items/:id", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const id = parseInt(req.params.id);
      const item = await storage.getListItemById(id);
      
      if (!item) {
        return res.status(404).json({ message: "List item not found" });
      }
      
      const list = await storage.getShoppingListById(item.listId);
      
      if (!list || list.userId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }
      
      const updatedItem = await storage.updateListItem(id, req.body);
      res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/list-items/:id", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const id = parseInt(req.params.id);
      const item = await storage.getListItemById(id);
      
      if (!item) {
        return res.status(404).json({ message: "List item not found" });
      }
      
      const list = await storage.getShoppingListById(item.listId);
      
      if (!list || list.userId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }
      
      await storage.deleteListItem(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  // Favorites routes
  app.get("/api/favorites", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const favorites = await storage.getFavorites(req.user.id);
      res.json(favorites);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/favorites", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const validatedData = z.object({
        productId: z.number()
      }).parse(req.body);
      
      const favorite = await storage.createFavorite({
        userId: req.user.id,
        productId: validatedData.productId
      });
      
      res.status(201).json(favorite);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/favorites/:id", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const id = parseInt(req.params.id);
      const favorite = await storage.deleteFavorite(id);
      
      if (!favorite) {
        return res.status(404).json({ message: "Favorite not found" });
      }
      
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
