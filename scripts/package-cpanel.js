import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Preparing cPanel Backend Deployment Package...');

// 1. Build all workspaces first to ensure latest dist
console.log('[1/4] Building latest workspaces...');
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

// 2. Setup staging directory
const outputDir = path.join(rootDir, 'dist-cpanel');
const stagingDir = path.join(outputDir, 'chatbot-backend');
const zipFile = path.join(outputDir, 'cpanel-backend-deployment.zip');

if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}
fs.mkdirSync(stagingDir, { recursive: true });

console.log('[2/4] Copying required production files to staging...');

// Root files
fs.copyFileSync(path.join(rootDir, 'app.js'), path.join(stagingDir, 'app.js'));
fs.copyFileSync(path.join(rootDir, 'package.json'), path.join(stagingDir, 'package.json'));
fs.copyFileSync(path.join(rootDir, '.cpanel.yml'), path.join(stagingDir, '.cpanel.yml'));

// Production .env
const envContent = `PORT=3000
HOST=0.0.0.0
OPENROUTER_API_KEY=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
OPENROUTER_MODEL=openrouter/free
ADMIN_KEY=admin
`;
fs.writeFileSync(path.join(stagingDir, '.env'), envContent, 'utf-8');

// Copy packages (only dist, package.json, tenants)
const packagesToCopy = [
  { name: 'shared', dirs: ['dist'], files: ['package.json'] },
  { name: 'backend', dirs: ['dist', 'tenants'], files: ['package.json'] },
  { name: 'widget', dirs: ['dist'], files: ['package.json'] }
];

for (const pkg of packagesToCopy) {
  const pkgStaging = path.join(stagingDir, 'packages', pkg.name);
  fs.mkdirSync(pkgStaging, { recursive: true });

  for (const f of pkg.files) {
    const srcF = path.join(rootDir, 'packages', pkg.name, f);
    if (fs.existsSync(srcF)) {
      fs.copyFileSync(srcF, path.join(pkgStaging, f));
    }
  }

  for (const d of pkg.dirs) {
    const srcD = path.join(rootDir, 'packages', pkg.name, d);
    const destD = path.join(pkgStaging, d);
    if (fs.existsSync(srcD)) {
      fs.cpSync(srcD, destD, { recursive: true });
    }
  }
}

// Ensure logs, data, and tmp directories exist
fs.mkdirSync(path.join(stagingDir, 'logs'), { recursive: true });
fs.mkdirSync(path.join(stagingDir, 'data'), { recursive: true });
fs.mkdirSync(path.join(stagingDir, 'tmp'), { recursive: true });

console.log('[3/4] Creating ZIP archive compatible with Linux/cPanel...');
try {
  const tarCmd = `tar.exe -a -cf "${zipFile}" -C "${stagingDir}" .`;
  execSync(tarCmd, { stdio: 'inherit' });
  const stats = fs.statSync(zipFile);
  console.log(`\n🎉 [Package SUCCESS] cPanel Deployment ZIP created!`);
  console.log(`   --> ${zipFile}`);
  console.log(`   --> Size: ${(stats.size / 1024).toFixed(1)} KB (${(stats.size / 1048576).toFixed(2)} MB)\n`);
} catch (e) {
  console.error('[Package ERROR] Failed to compress ZIP:', e);
} finally {
  if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
}
