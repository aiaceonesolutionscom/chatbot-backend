/**
 * cPanel / Production Application Startup Entry File
 * Used by LiteSpeed / Phusion Passenger in cPanel "Setup Node.js App"
 */
import('./packages/backend/dist/server.js').then(async (mod) => {
  if (typeof mod.startServer === 'function') {
    await mod.startServer();
  }
}).catch((err) => {
  console.error('[cPanel Startup Fatal Error]', err);
  process.exit(1);
});
