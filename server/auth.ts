import { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import session from "express-session";
import memorystore from "memorystore";
import { storage } from "./storage";
import { User } from "@shared/schema";

// Extend express-session with our user property
declare module 'express-session' {
  interface Session {
    user?: Omit<User, 'password'>;
  }
}

// For a real application, use a proper secret from environment variables
const SESSION_SECRET = process.env.SESSION_SECRET || "agrichain-secret-key-change-in-production";

export function setupAuth(app: Express) {
  const MemoryStore = memorystore(session);

  app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000 // Prune expired entries every 24h
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Add authentication middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.session.user || null;
    next();
  });

  // Register endpoint
  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      const { username, password, ...userData } = req.body;

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = await storage.createUser({
        username,
        password: hashedPassword,
        ...userData
      });

      // Don't include password in response
      const { password: _, ...userWithoutPassword } = newUser;

      // Set user in session
      req.session.user = userWithoutPassword;

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  });

  // Login endpoint
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Don't include password in session or response
      const { password: _, ...userWithoutPassword } = user;

      // Set user in session
      req.session.user = userWithoutPassword;

      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  });

  // Logout endpoint
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });

  // Get current user endpoint
  app.get('/api/auth/user', (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    res.json(req.session.user);
  });

  // Forgot password endpoint
  app.post('/api/auth/forgot-password', async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      // In a real application, you would:
      // 1. Find the user by email
      // 2. Generate a unique token and store it with an expiration
      // 3. Send an email with the reset link containing the token
      
      // For this demo, we'll simulate success without sending a real email
      // Just returning a 200 status as if we sent the email
      setTimeout(() => {
        // Simulate processing time
        console.log(`Password reset requested for: ${email}`);
      }, 500);

      res.json({ message: 'Password reset instructions sent to your email' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Server error during password reset request' });
    }
  });

  // Reset password endpoint
  app.post('/api/auth/reset-password', async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;
      
      if (!token || !password) {
        return res.status(400).json({ message: 'Token and password are required' });
      }

      // In a real application, you would:
      // 1. Verify the token is valid and not expired
      // 2. Find the user associated with this token
      // 3. Update the user's password
      // 4. Invalidate the token

      // For this demo, we'll simulate success
      setTimeout(() => {
        // Simulate processing time
        console.log(`Password reset processed with token: ${token.substring(0, 6)}...`);
      }, 500);
      
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Server error during password reset' });
    }
  });
}