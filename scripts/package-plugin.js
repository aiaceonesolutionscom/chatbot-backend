import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const widgetDist = path.join(rootDir, 'packages/widget/dist/widget.js');
const pluginAssetsDir = path.join(rootDir, 'packages/wordpress-plugin/assets');
const pluginWidgetDest = path.join(pluginAssetsDir, 'widget.js');

if (!fs.existsSync(widgetDist)) {
  console.error('[Package] widget.js not found! Please build widget first.');
  process.exit(1);
}

if (!fs.existsSync(pluginAssetsDir)) {
  fs.mkdirSync(pluginAssetsDir, { recursive: true });
}

// Copy widget.js into WordPress plugin assets
fs.copyFileSync(widgetDist, pluginWidgetDest);
console.log(`[Package] Copied widget.js to ${pluginWidgetDest}`);

// Rename staging directory to fresh name to avoid "Destination folder already exists"
const zipOutputDir = path.join(rootDir, 'dist-plugin');
const pluginSlug = 'universal-commerce-ai-chatbot';
const zipOutputFile = path.join(zipOutputDir, `${pluginSlug}.zip`);
const tempStagingDir = path.join(zipOutputDir, pluginSlug);

if (!fs.existsSync(zipOutputDir)) {
  fs.mkdirSync(zipOutputDir, { recursive: true });
}

if (fs.existsSync(zipOutputFile)) {
  fs.unlinkSync(zipOutputFile);
}

if (fs.existsSync(tempStagingDir)) {
  fs.rmSync(tempStagingDir, { recursive: true, force: true });
}

// Copy plugin files into fresh staging directory
const pluginSourceDir = path.join(rootDir, 'packages/wordpress-plugin');
fs.cpSync(pluginSourceDir, tempStagingDir, { recursive: true });

// Rename PHP file inside staging to match pluginSlug
const oldPhp = path.join(tempStagingDir, 'universal-ai-commerce-chatbot.php');
const newPhp = path.join(tempStagingDir, `${pluginSlug}.php`);
if (fs.existsSync(oldPhp)) {
  fs.renameSync(oldPhp, newPhp);
}

// Use bsdtar (tar.exe) to create POSIX forward-slash ZIP compatible with Linux / cPanel
try {
  const tarCmd = `tar.exe -a -cf "${zipOutputFile}" -C "${zipOutputDir}" ${pluginSlug}`;
  execSync(tarCmd, { stdio: 'inherit' });
  console.log(`\n🎉 [Package SUCCESS] WordPress Plugin ZIP generated:`);
  console.log(`   --> ${zipOutputFile}`);
} catch (e) {
  console.error('[Package ERROR] Failed to compress ZIP:', e);
} finally {
  if (fs.existsSync(tempStagingDir)) {
    fs.rmSync(tempStagingDir, { recursive: true, force: true });
  }
}
