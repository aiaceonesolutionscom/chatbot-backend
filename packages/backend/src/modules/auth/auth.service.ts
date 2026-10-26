import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface StoredAuth {
  username: string;
  salt: string;
  passwordHash: string;
  updatedAt: string;
}

interface ActiveSession {
  token: string;
  username: string;
  createdAt: number;
  expiresAt: number;
}

export class AuthService {
  private static dataDir = path.resolve(process.cwd(), 'data');
  private static authFile = path.resolve(process.cwd(), 'data/admin-auth.json');
  private static sessions: Map<string, ActiveSession> = new Map();

  // Brute force protection: Track failed login attempts per IP
  private static failedAttempts: Map<string, { count: number; lockUntil: number }> = new Map();
  private static MAX_ATTEMPTS = 5;
  private static LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

  static initialize(): void {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }

    if (!fs.existsSync(this.authFile)) {
      // Create initial default admin credentials: admin / AceOneAdmin@2026!
      const salt = crypto.randomBytes(32).toString('hex');
      const hash = this.hashPassword('AceOneAdmin@2026!', salt);
      const authData: StoredAuth = {
        username: 'admin',
        salt,
        passwordHash: hash,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(this.authFile, JSON.stringify(authData, null, 2), 'utf-8');
      console.log('[AuthService] Initialized default admin credentials (username: admin)');
    }
  }

  private static getStoredAuth(): StoredAuth {
    this.initialize();
    try {
      const raw = fs.readFileSync(this.authFile, 'utf-8');
      return JSON.parse(raw) as StoredAuth;
    } catch {
      // Recovery fallback
      const salt = crypto.randomBytes(32).toString('hex');
      const hash = this.hashPassword('AceOneAdmin@2026!', salt);
      return {
        username: 'admin',
        salt,
        passwordHash: hash,
        updatedAt: new Date().toISOString()
      };
    }
  }

  private static hashPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  }

  /**
   * Check rate-limit / brute-force lockout for IP
   */
  static checkRateLimit(ip: string): { allowed: boolean; remainingSeconds?: number } {
    const attempt = this.failedAttempts.get(ip);
    if (!attempt) return { allowed: true };

    const now = Date.now();
    if (attempt.lockUntil > now) {
      const remainingSeconds = Math.ceil((attempt.lockUntil - now) / 1000);
      return { allowed: false, remainingSeconds };
    }

    if (now >= attempt.lockUntil && attempt.lockUntil > 0) {
      // Lock expired, reset
      this.failedAttempts.delete(ip);
      return { allowed: true };
    }

    return { allowed: true };
  }

  static recordFailedAttempt(ip: string): void {
    const now = Date.now();
    const current = this.failedAttempts.get(ip) || { count: 0, lockUntil: 0 };
    current.count += 1;

    if (current.count >= this.MAX_ATTEMPTS) {
      current.lockUntil = now + this.LOCKOUT_MS;
      console.warn(`[Security Alert] IP ${ip} locked out for 15 minutes due to ${current.count} failed login attempts.`);
    }

    this.failedAttempts.set(ip, current);
  }

  static resetFailedAttempts(ip: string): void {
    this.failedAttempts.delete(ip);
  }

  /**
   * Verify username & password with constant-time comparison to prevent timing attacks
   */
  static verifyLogin(username: string, password: string, ip: string): { success: boolean; token?: string; error?: string } {
    const rateCheck = this.checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return { 
        success: false, 
        error: `Too many failed login attempts. Please wait ${rateCheck.remainingSeconds} seconds before trying again.` 
      };
    }

    const stored = this.getStoredAuth();
    if (username.trim() !== stored.username) {
      this.recordFailedAttempt(ip);
      return { success: false, error: 'Invalid username or password' };
    }

    const inputHash = this.hashPassword(password, stored.salt);
    const bufA = Buffer.from(inputHash, 'hex');
    const bufB = Buffer.from(stored.passwordHash, 'hex');

    // Constant-time comparison
    let match = false;
    if (bufA.length === bufB.length) {
      match = crypto.timingSafeEqual(bufA, bufB);
    }

    if (!match) {
      this.recordFailedAttempt(ip);
      return { success: false, error: 'Invalid username or password' };
    }

    // Success! Reset failed attempts
    this.resetFailedAttempts(ip);

    // Generate cryptographically secure session token
    const token = crypto.randomBytes(32).toString('hex');
    const sessionDurationMs = 24 * 60 * 60 * 1000; // 24 hours
    const session: ActiveSession = {
      token,
      username: stored.username,
      createdAt: Date.now(),
      expiresAt: Date.now() + sessionDurationMs
    };

    this.sessions.set(token, session);
    return { success: true, token };
  }

  /**
   * Validate session token from cookie or header
   */
  static validateSession(token: string | undefined): boolean {
    if (!token) return false;
    const session = this.sessions.get(token);
    if (!session) return false;

    if (Date.now() > session.expiresAt) {
      this.sessions.delete(token);
      return false;
    }

    return true;
  }

  static isValidSession(token: string | undefined): boolean {
    return this.validateSession(token);
  }

  static destroySession(token: string | undefined): void {
    if (token) {
      this.sessions.delete(token);
    }
  }

  static revokeSession(token: string | undefined): void {
    this.destroySession(token);
  }

  /**
   * Update admin password with security checks
   */
  static updatePassword(currentPass: string, newPass: string, confirmPass?: string): { success: boolean; error?: string } {
    if (!newPass || newPass.length < 8) {
      return { success: false, error: 'New password must be at least 8 characters long.' };
    }
    if (confirmPass && newPass !== confirmPass) {
      return { success: false, error: 'New password and confirmation do not match.' };
    }

    const stored = this.getStoredAuth();
    const currentHash = this.hashPassword(currentPass, stored.salt);
    const bufA = Buffer.from(currentHash, 'hex');
    const bufB = Buffer.from(stored.passwordHash, 'hex');

    if (bufA.length !== bufB.length || !crypto.timingSafeEqual(bufA, bufB)) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    // Update with fresh random salt
    const newSalt = crypto.randomBytes(32).toString('hex');
    const newHash = this.hashPassword(newPass, newSalt);
    const updated: StoredAuth = {
      username: stored.username,
      salt: newSalt,
      passwordHash: newHash,
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(this.authFile, JSON.stringify(updated, null, 2), 'utf-8');
    console.log('[AuthService] Admin password successfully updated.');
    return { success: true };
  }
}
