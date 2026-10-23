/**
 * cPanel / Production Application Startup Entry File
 * Used by LiteSpeed / Phusion Passenger in cPanel "Setup Node.js App"
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from current application root directory
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, 'packages/backend/.env') });

import('./packages/backend/dist/server.js').then(async (mod) => {
  if (typeof mod.startServer === 'function') {
    await mod.startServer();
  }
}).catch((err) => {
  console.error('[cPanel Startup Fatal Error]', err);
  process.exit(1);
});
