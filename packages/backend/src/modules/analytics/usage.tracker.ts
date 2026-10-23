import fs from 'fs';
import path from 'path';

export interface UsageRecord {
  siteKey: string;
  tokensEstimate: number;
  durationMs: number;
  timestamp?: number;
}

export interface TenantUsageStats {
  siteKey: string;
  today: {
    date: string;
    messages: number;
    tokens: number;
  };
  thisMonth: {
    month: string;
    messages: number;
    tokens: number;
  };
  allTime: {
    totalMessages: number;
    totalTokens: number;
  };
  recentDays: Array<{ date: string; messages: number; tokens: number }>;
}

export class UsageTracker {
  private static dataDir: string = path.resolve(process.cwd(), 'data');
  private static storageFile: string = path.resolve(process.cwd(), 'data/usage.json');
  private static memoryStore: Map<string, any> = new Map();
  private static isInitialized = false;

  private static ensureInit(): void {
    if (this.isInitialized) return;
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      if (fs.existsSync(this.storageFile)) {
        const raw = fs.readFileSync(this.storageFile, 'utf-8');
        const parsed = JSON.parse(raw);
        for (const [k, v] of Object.entries(parsed)) {
          this.memoryStore.set(k, v);
        }
      }
    } catch (e) {
      console.warn('[UsageTracker] Error initializing storage:', e);
    }
    this.isInitialized = true;
  }

  private static saveToDisk(): void {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      const obj: Record<string, any> = {};
      for (const [k, v] of this.memoryStore.entries()) {
        obj[k] = v;
      }
      fs.writeFileSync(this.storageFile, JSON.stringify(obj, null, 2), 'utf-8');
    } catch (e) {
      console.warn('[UsageTracker] Failed to save usage to disk:', e);
    }
  }

  /**
   * Records an AI conversation turn for a specific client
   */
  static record(record: UsageRecord): void {
    this.ensureInit();
    const { siteKey, tokensEstimate, durationMs } = record;
    const now = new Date();
    const dateKey = now.toISOString().substring(0, 10); // YYYY-MM-DD
    const monthKey = now.toISOString().substring(0, 7); // YYYY-MM

    if (!this.memoryStore.has(siteKey)) {
      this.memoryStore.set(siteKey, {
        allTime: { messages: 0, tokens: 0 },
        daily: {},
        monthly: {}
      });
    }

    const tenantData = this.memoryStore.get(siteKey);

    // All time
    tenantData.allTime.messages = (tenantData.allTime.messages || 0) + 1;
    tenantData.allTime.tokens = (tenantData.allTime.tokens || 0) + tokensEstimate;

    // Daily
    if (!tenantData.daily[dateKey]) {
      tenantData.daily[dateKey] = { messages: 0, tokens: 0 };
    }
    tenantData.daily[dateKey].messages += 1;
    tenantData.daily[dateKey].tokens += tokensEstimate;

    // Monthly
    if (!tenantData.monthly[monthKey]) {
      tenantData.monthly[monthKey] = { messages: 0, tokens: 0 };
    }
    tenantData.monthly[monthKey].messages += 1;
    tenantData.monthly[monthKey].tokens += tokensEstimate;

    this.saveToDisk();
  }

  /**
   * Retrieves usage breakdown for a specific tenant (Today, This Month, All Time)
   */
  static getTenantStats(siteKey: string): TenantUsageStats {
    this.ensureInit();
    const now = new Date();
    const dateKey = now.toISOString().substring(0, 10);
    const monthKey = now.toISOString().substring(0, 7);

    const tenantData = this.memoryStore.get(siteKey) || {
      allTime: { messages: 0, tokens: 0 },
      daily: {},
      monthly: {}
    };

    const todayStats = tenantData.daily?.[dateKey] || { messages: 0, tokens: 0 };
    const monthStats = tenantData.monthly?.[monthKey] || { messages: 0, tokens: 0 };

    // Get last 7 days history
    const recentDays: Array<{ date: string; messages: number; tokens: number }> = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dKey = d.toISOString().substring(0, 10);
      const st = tenantData.daily?.[dKey] || { messages: 0, tokens: 0 };
      recentDays.push({
        date: dKey,
        messages: st.messages,
        tokens: st.tokens
      });
    }

    return {
      siteKey,
      today: {
        date: dateKey,
        messages: todayStats.messages,
        tokens: todayStats.tokens
      },
      thisMonth: {
        month: monthKey,
        messages: monthStats.messages,
        tokens: monthStats.tokens
      },
      allTime: {
        totalMessages: tenantData.allTime?.messages || 0,
        totalTokens: tenantData.allTime?.tokens || 0
      },
      recentDays
    };
  }

  /**
   * Retrieves all tenants usage overview (for multi-client admin dashboard)
   */
  static getAllTenantsStats(): TenantUsageStats[] {
    this.ensureInit();
    const stats: TenantUsageStats[] = [];
    for (const siteKey of this.memoryStore.keys()) {
      stats.push(this.getTenantStats(siteKey));
    }
    return stats;
  }
}
