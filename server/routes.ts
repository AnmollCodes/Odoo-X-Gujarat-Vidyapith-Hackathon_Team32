import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertProductSchema,
  insertFarmerSchema,
  insertVerificationSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handler middleware
  const handleError = (err: any, res: Response) => {
    if (err instanceof ZodError) {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: fromZodError(err).message 
      });
    }
    return res.status(500).json({ message: err.message || "Internal server error" });
  };

  // User routes
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json({ id: user.id, username: user.username, role: user.role });
    } catch (error) {
      handleError(error, res);
    }
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return password in response
      const { password, ...userData } = user;
      res.json(userData);
    } catch (error) {
      handleError(error, res);
    }
  });

  // Product routes
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const farmerId = req.query.farmerId ? parseInt(req.query.farmerId as string) : undefined;
      const category = req.query.category as string | undefined;
      
      const products = await storage.getProducts({ farmerId, category });
      res.json(products);
    } catch (error) {
      handleError(error, res);
    }
  });

  app.get("/api/products/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string || "";
      const products = await storage.searchProducts(query);
      res.json(products);
    } catch (error) {
      handleError(error, res);
    }
  });

  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      handleError(error, res);
    }
  });

  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      handleError(error, res);
    }
  });

  app.put("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const productData = req.body;
      
      const updatedProduct = await storage.updateProduct(id, productData);
      
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(updatedProduct);
    } catch (error) {
      handleError(error, res);
    }
  });

  app.delete("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProduct(id);
      
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      handleError(error, res);
    }
  });

  // Farmer routes
  app.get("/api/farmers", async (req: Request, res: Response) => {
    try {
      const farmers = await storage.getFarmers();
      res.json(farmers);
    } catch (error) {
      handleError(error, res);
    }
  });

  app.get("/api/farmers/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const farmer = await storage.getFarmer(id);
      
      if (!farmer) {
        return res.status(404).json({ message: "Farmer not found" });
      }
      
      res.json(farmer);
    } catch (error) {
      handleError(error, res);
    }
  });

  app.post("/api/farmers", async (req: Request, res: Response) => {
    try {
      const farmerData = insertFarmerSchema.parse(req.body);
      const farmer = await storage.createFarmer(farmerData);
      res.status(201).json(farmer);
    } catch (error) {
      handleError(error, res);
    }
  });

  app.put("/api/farmers/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const farmerData = req.body;
      
      const updatedFarmer = await storage.updateFarmer(id, farmerData);
      
      if (!updatedFarmer) {
        return res.status(404).json({ message: "Farmer not found" });
      }
      
      res.json(updatedFarmer);
    } catch (error) {
      handleError(error, res);
    }
  });

  // Verification routes
  app.get("/api/verifications/entity/:type/:id", async (req: Request, res: Response) => {
    try {
      const { type, id } = req.params;
      const entityId = parseInt(id);
      
      const verifications = await storage.getVerificationsByEntity(type, entityId);
      res.json(verifications);
    } catch (error) {
      handleError(error, res);
    }
  });

  app.post("/api/verifications", async (req: Request, res: Response) => {
    try {
      const verificationData = insertVerificationSchema.parse(req.body);
      const verification = await storage.createVerification(verificationData);
      res.status(201).json(verification);
    } catch (error) {
      handleError(error, res);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
