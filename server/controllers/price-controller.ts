import { Request, Response } from 'express';
import { log } from '../vite';
import { priceService } from '../services/price-service';
import { storage } from '../storage';

/**
 * Price Controller for handling price-related API requests
 */
export class PriceController {
  /**
   * Get all prices
   */
  async getAllPrices(req: Request, res: Response) {
    try {
      const prices = await storage.getPrices();
      res.json(prices);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`Error fetching prices: ${errorMessage}`, 'price-controller');
      res.status(500).json({ error: 'Failed to fetch prices' });
    }
  }

  /**
   * Get prices for a specific product
   */
  async getPricesForProduct(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }

      const prices = await storage.getPricesByProductId(productId);
      res.json(prices);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`Error fetching prices for product: ${errorMessage}`, 'price-controller');
      res.status(500).json({ error: 'Failed to fetch prices for product' });
    }
  }

  /**
   * Refresh prices for a specific product from all sources
   */
  async refreshPricesForProduct(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.productId);
      if (isNaN(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }

      // Get product
      const product = await storage.getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Fetch updated prices from external sources
      const newPrices = await priceService.fetchPricesForProduct(product);
      
      // Delete existing prices
      const existingPrices = await storage.getPricesByProductId(productId);
      for (const price of existingPrices) {
        await storage.deletePrice(price.id);
      }

      // Save new prices
      const savedPrices = [];
      for (const price of newPrices) {
        const savedPrice = await storage.createPrice(price);
        savedPrices.push(savedPrice);
      }

      res.json(savedPrices);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`Error refreshing prices: ${errorMessage}`, 'price-controller');
      res.status(500).json({ error: 'Failed to refresh prices for product' });
    }
  }

  /**
   * Refresh prices for all products in the database
   */
  async refreshAllPrices(req: Request, res: Response) {
    try {
      // Get all products
      const products = await storage.getProducts();
      
      // Refresh prices for each product
      const results = [];
      
      for (const product of products) {
        // Fetch updated prices from external sources
        const newPrices = await priceService.fetchPricesForProduct(product);
        
        // Delete existing prices
        const existingPrices = await storage.getPricesByProductId(product.id);
        for (const price of existingPrices) {
          await storage.deletePrice(price.id);
        }

        // Save new prices
        const savedPrices = [];
        for (const price of newPrices) {
          const savedPrice = await storage.createPrice(price);
          savedPrices.push(savedPrice);
        }

        results.push({
          productId: product.id,
          productName: product.name,
          pricesCount: savedPrices.length
        });
      }

      res.json({
        totalProducts: products.length,
        updatedProducts: results
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`Error refreshing all prices: ${errorMessage}`, 'price-controller');
      res.status(500).json({ error: 'Failed to refresh all prices' });
    }
  }
}

// Export singleton instance
export const priceController = new PriceController();