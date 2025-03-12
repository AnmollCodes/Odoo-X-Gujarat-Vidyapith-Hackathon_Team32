import {
  users,
  products,
  farmers,
  verifications,
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type Farmer,
  type InsertFarmer,
  type Verification,
  type InsertVerification,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProduct(id: number): Promise<Product | undefined>;
  getProducts(options?: { farmerId?: number, category?: string }): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Farmer methods
  getFarmer(id: number): Promise<Farmer | undefined>;
  getFarmerByUserId(userId: number): Promise<Farmer | undefined>;
  getFarmers(): Promise<Farmer[]>;
  createFarmer(farmer: InsertFarmer): Promise<Farmer>;
  updateFarmer(id: number, farmer: Partial<InsertFarmer>): Promise<Farmer | undefined>;
  
  // Verification methods
  getVerification(id: number): Promise<Verification | undefined>;
  getVerificationsByEntity(entityType: string, entityId: number): Promise<Verification[]>;
  createVerification(verification: InsertVerification): Promise<Verification>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private farmers: Map<number, Farmer>;
  private verifications: Map<number, Verification>;
  private currentUserId: number;
  private currentProductId: number;
  private currentFarmerId: number;
  private currentVerificationId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.farmers = new Map();
    this.verifications = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentFarmerId = 1;
    this.currentVerificationId = 1;
    
    // Initialize with some demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo farmers
    const farmerUser1: InsertUser = {
      username: "rajesh_kumar",
      password: "password123",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      role: "farmer",
      location: "Coorg, Karnataka, India",
      profileImage: "https://images.unsplash.com/photo-1591280063444-d3c514eb6e13",
      blockchainAddress: "0x8a21...f92e",
    };
    
    const farmer1User = this.createUser(farmerUser1);
    
    const farmer1: InsertFarmer = {
      userId: farmer1User.id,
      farmName: "Rajesh's Natural Honey Farm",
      description: "I specialize in producing pure, wild forest honey using sustainable harvesting methods.",
      experience: "I have been practicing natural farming since 2008, with a focus on honey and spices.",
      certifications: ["India Organic Certified (2020)"],
      isVerified: true,
      blockchainVerificationHash: "0x8a21f92e",
      rating: 4.8,
      farmerSince: 2008,
    };
    
    const createdFarmer1 = this.createFarmer(farmer1);
    
    // Create demo products
    const product1: InsertProduct = {
      name: "Wild Forest Honey",
      description: "Pure, unprocessed honey from the untouched forests of Coorg",
      price: 450,
      unit: "500g",
      imageUrl: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
      farmerId: createdFarmer1.id,
      location: "Coorg, Karnataka",
      category: "Honey",
      farmingMethod: "Wild harvesting",
      harvestDate: new Date("2023-06-15"),
      certifications: ["Organic Certified", "Chemical-Free"],
      isVerified: true,
      blockchainHash: "0x8a21f92e",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=product_1_verification",
    };
    
    this.createProduct(product1);
    
    // Create verification records
    const verification1: InsertVerification = {
      entityType: "product",
      entityId: 1,
      transactionHash: "0x8a21f92e",
      blockNumber: 18293711,
      network: "Ethereum",
      verificationData: {
        certificationBody: "India Organic",
        verificationDate: "2023-06-20",
        validUntil: "2024-06-20",
      },
    };
    
    this.createVerification(verification1);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProducts(options?: { farmerId?: number, category?: string }): Promise<Product[]> {
    const allProducts = Array.from(this.products.values());
    
    if (!options) {
      return allProducts;
    }
    
    return allProducts.filter(product => {
      if (options.farmerId && product.farmerId !== options.farmerId) {
        return false;
      }
      
      if (options.category && product.category !== options.category) {
        return false;
      }
      
      return true;
    });
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id, createdAt: new Date() };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) {
      return undefined;
    }
    
    const updatedProduct = { ...product, ...productUpdate };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.location.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Farmer methods
  async getFarmer(id: number): Promise<Farmer | undefined> {
    return this.farmers.get(id);
  }

  async getFarmerByUserId(userId: number): Promise<Farmer | undefined> {
    return Array.from(this.farmers.values()).find(
      (farmer) => farmer.userId === userId
    );
  }
  
  async getFarmers(): Promise<Farmer[]> {
    return Array.from(this.farmers.values());
  }

  async createFarmer(insertFarmer: InsertFarmer): Promise<Farmer> {
    const id = this.currentFarmerId++;
    const farmer: Farmer = { ...insertFarmer, id };
    this.farmers.set(id, farmer);
    return farmer;
  }

  async updateFarmer(id: number, farmerUpdate: Partial<InsertFarmer>): Promise<Farmer | undefined> {
    const farmer = this.farmers.get(id);
    if (!farmer) {
      return undefined;
    }
    
    const updatedFarmer = { ...farmer, ...farmerUpdate };
    this.farmers.set(id, updatedFarmer);
    return updatedFarmer;
  }

  // Verification methods
  async getVerification(id: number): Promise<Verification | undefined> {
    return this.verifications.get(id);
  }

  async getVerificationsByEntity(entityType: string, entityId: number): Promise<Verification[]> {
    return Array.from(this.verifications.values()).filter(
      (verification) => 
        verification.entityType === entityType && 
        verification.entityId === entityId
    );
  }

  async createVerification(insertVerification: InsertVerification): Promise<Verification> {
    const id = this.currentVerificationId++;
    const verification: Verification = { 
      ...insertVerification, 
      id, 
      verifiedAt: new Date() 
    };
    this.verifications.set(id, verification);
    return verification;
  }
}

export const storage = new MemStorage();
