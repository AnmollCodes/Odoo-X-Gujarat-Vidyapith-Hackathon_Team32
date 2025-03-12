import { pgTable, text, serial, integer, boolean, timestamp, real, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("consumer"),
  location: text("location"),
  profileImage: text("profile_image"),
  blockchainAddress: text("blockchain_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Products Schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  unit: text("unit").notNull(),
  imageUrl: text("image_url"),
  farmerId: integer("farmer_id").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(),
  farmingMethod: text("farming_method").notNull(),
  harvestDate: timestamp("harvest_date"),
  certifications: text("certifications").array(),
  isVerified: boolean("is_verified").default(false),
  blockchainHash: text("blockchain_hash"),
  qrCode: text("qr_code"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

// Farmers Schema
export const farmers = pgTable("farmers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  farmName: text("farm_name"),
  description: text("description"),
  experience: text("experience"),
  certifications: text("certifications").array(),
  isVerified: boolean("is_verified").default(false),
  blockchainVerificationHash: text("blockchain_verification_hash"),
  rating: real("rating"),
  farmerSince: integer("farmer_since"),
});

export const insertFarmerSchema = createInsertSchema(farmers).omit({
  id: true,
});

// Blockchain Verification Schema
export const verifications = pgTable("verifications", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull(), // 'product' or 'farmer'
  entityId: integer("entity_id").notNull(),
  transactionHash: text("transaction_hash").notNull(),
  blockNumber: integer("block_number").notNull(),
  network: text("network").notNull(),
  verifiedAt: timestamp("verified_at").defaultNow(),
  verificationData: json("verification_data"),
});

export const insertVerificationSchema = createInsertSchema(verifications).omit({
  id: true,
  verifiedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Farmer = typeof farmers.$inferSelect;
export type InsertFarmer = z.infer<typeof insertFarmerSchema>;

export type Verification = typeof verifications.$inferSelect;
export type InsertVerification = z.infer<typeof insertVerificationSchema>;
