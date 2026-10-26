import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists (either in project root or relative to dist)
const logsDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  try {
    fs.mkdirSync(logsDir, { recursive: true });
  } catch (e) {
    console.warn('[Logger] Could not create logs directory:', e);
  }
}

const appLogFile = path.join(logsDir, 'app.log');
const errorLogFile = path.join(logsDir, 'error.log');
const chatAuditFile = path.join(logsDir, 'chat-audit.log');

export class AppLogger {
  private static formatTime(): string {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19);
  }

  private static appendToFile(filePath: string, line: string): void {
    try {
      // Rotate if > 5MB
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.size > 5 * 1024 * 1024) {
          const backup = `${filePath}.${Date.now()}.bak`;
          fs.renameSync(filePath, backup);
        }
      }
      fs.appendFileSync(filePath, line + '\n', 'utf-8');
    } catch (e) {
      // Non-blocking fallback
    }
  }

  /**
   * Conversation Audit & Bot Improvement Log:
   * Records exactly what users ask and how the bot answered,
   * so client questions can be reviewed and the bot's catalog/answers upgraded!
   */
  static auditChat(entry: {
    siteKey: string;
    conversationId: string;
    userMessage: string;
    assistantReply: string;
    durationMs: number;
    productCards?: any[];
  }): void {
    const timestamp = this.formatTime();
    const cardsSummary = entry.productCards && entry.productCards.length > 0
      ? `CARDS ATTACHED (${entry.productCards.length}): ` + entry.productCards.map((p: any) => `${p.title} (${p.price?.formatted || p.price?.regular || ''})`).join(', ')
      : 'CARDS ATTACHED: None (0 cards)';

    const auditBlock = [
      '================================================================================',
      `TIMESTAMP : ${timestamp} | CLIENT: [${entry.siteKey}] | SESSION: ${entry.conversationId}`,
      `LATENCY   : ${entry.durationMs}ms`,
      `USER ASKED: "${entry.userMessage}"`,
      `BOT REPLIED:`,
      `${entry.assistantReply}`,
      cardsSummary,
      '================================================================================\n'
    ].join('\n');

    this.appendToFile(chatAuditFile, auditBlock);
  }

  static info(message: string, meta?: Record<string, any>): void {
    const timestamp = this.formatTime();
    const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
    const line = `[${timestamp}] [INFO] ${message}${metaStr}`;
    console.log(line);
    this.appendToFile(appLogFile, line);
  }

  static warn(message: string, meta?: Record<string, any>): void {
    const timestamp = this.formatTime();
    const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
    const line = `[${timestamp}] [WARN] ${message}${metaStr}`;
    console.warn(line);
    this.appendToFile(appLogFile, line);
  }

  static error(message: string, err?: any, meta?: Record<string, any>): void {
    const timestamp = this.formatTime();
    let errDetails = '';
    if (err) {
      if (err instanceof Error) {
        errDetails = ` | Error: ${err.message}\nStack: ${err.stack}`;
      } else if (typeof err === 'object') {
        errDetails = ` | Error: ${JSON.stringify(err)}`;
      } else {
        errDetails = ` | Error: ${String(err)}`;
      }
    }
    const metaStr = meta ? ` | Context: ${JSON.stringify(meta)}` : '';
    const line = `[${timestamp}] [ERROR] ${message}${metaStr}${errDetails}`;
    console.error(line);
    this.appendToFile(appLogFile, line);
    this.appendToFile(errorLogFile, line);
  }

  static getRecentLogs(linesCount: number = 80): string[] {
    try {
      if (!fs.existsSync(appLogFile)) return ['(No logs yet)'];
      const content = fs.readFileSync(appLogFile, 'utf-8');
      const lines = content.split('\n').filter(l => l.trim().length > 0);
      return lines.slice(-linesCount);
    } catch (e) {
      return [`Failed to read logs: ${e}`];
    }
  }

  static getRecentErrors(linesCount: number = 80): string[] {
    try {
      if (!fs.existsSync(errorLogFile)) return ['(No errors recorded)'];
      const content = fs.readFileSync(errorLogFile, 'utf-8');
      const lines = content.split('\n').filter(l => l.trim().length > 0);
      return lines.slice(-linesCount);
    } catch (e) {
      return [`Failed to read error log: ${e}`];
    }
  }

  static getRecentAudits(blocksCount: number = 20): string {
    try {
      if (!fs.existsSync(chatAuditFile)) return '(No customer conversations recorded yet)';
      const content = fs.readFileSync(chatAuditFile, 'utf-8');
      const blocks = content.split('================================================================================\n');
      const filtered = blocks.filter(b => b.trim().length > 0);
      return filtered.slice(-blocksCount).join('================================================================================\n');
    } catch (e) {
      return `Failed to read chat audit log: ${e}`;
    }
  }

  /**
   * Structured, filterable audit log reader for Admin dashboard
   */
  static getStructuredAudits(siteKey?: string, dateFilter?: string, search?: string): Array<{
    timestamp: string;
    siteKey: string;
    session: string;
    latency: string;
    userAsked: string;
    botReplied: string;
    cardsAttached: string;
  }> {
    try {
      if (!fs.existsSync(chatAuditFile)) return [];
      const content = fs.readFileSync(chatAuditFile, 'utf-8');
      const blocks = content.split('================================================================================');
      const entries: Array<any> = [];

      for (const block of blocks) {
        const trimmed = block.trim();
        if (!trimmed) continue;

        const timeMatch = trimmed.match(/TIMESTAMP\s*:\s*([^|]+)\|\s*CLIENT:\s*\[([^\]]+)\]\|\s*SESSION:\s*([^\n]+)/);
        const latencyMatch = trimmed.match(/LATENCY\s*:\s*([^\n]+)/);
        const userMatch = trimmed.match(/USER ASKED:\s*"([^"]+)"/);
        const botMatch = trimmed.match(/BOT REPLIED:\s*\n([\s\S]*?)\n(?:CARDS ATTACHED|$)/);
        const cardsMatch = trimmed.match(/CARDS ATTACHED[^\n]*/);

        if (timeMatch && userMatch) {
          const entryTime = timeMatch[1].trim();
          const entryClient = timeMatch[2].trim();
          const entrySession = timeMatch[3].trim();
          const entryLatency = latencyMatch ? latencyMatch[1].trim() : '0ms';
          const entryUser = userMatch[1].trim();
          const entryBot = botMatch ? botMatch[1].trim() : '';
          const entryCards = cardsMatch ? cardsMatch[0].trim() : 'None';

          if (siteKey && siteKey !== 'all' && entryClient !== siteKey) continue;
          if (dateFilter && !entryTime.startsWith(dateFilter)) continue;
          if (search) {
            const s = search.toLowerCase();
            const textToSearch = (entryUser + ' ' + entryBot + ' ' + entryCards).toLowerCase();
            if (!textToSearch.includes(s)) continue;
          }

          entries.push({
            timestamp: entryTime,
            siteKey: entryClient,
            session: entrySession,
            latency: entryLatency,
            userAsked: entryUser,
            botReplied: entryBot,
            cardsAttached: entryCards
          });
        }
      }
      return entries.reverse(); // Newest first
    } catch {
      return [];
    }
  }
}
