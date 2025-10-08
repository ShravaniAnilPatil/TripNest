import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // note the .js extension

const router = express.Router();
const SALT_ROUNDS = 10;

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    // Check if user exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({ name, email: email.toLowerCase(), passwordHash });
    await user.save();

    // Return minimal user detail (do NOT return passwordHash)
    res.status(201).json({ message: 'User created', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // avoid revealing whether email exists for security reasons
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // If you want a token, create a JWT here. For now return basic info:
    res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
