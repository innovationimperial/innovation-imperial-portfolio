import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Function to find the dist directory
const findDistDir = () => {
  // All possible dist directory locations
  const possibilities = [
    join(process.cwd(), 'dist'),
    join(__dirname, 'dist'),
    '/opt/render/project/src/dist',
  ];
  
  console.log('Starting directory search...');
  console.log('Process working directory:', process.cwd());
  console.log('__dirname:', __dirname);
  
  // First check if dist exists in current directory
  const distPath = join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    console.log('Creating dist directory...');
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  // Check for build files in root and move them if needed
  try {
    const currentDirContents = fs.readdirSync(process.cwd());
    console.log('Current directory contents:', currentDirContents);
    
    if (currentDirContents.includes('index.html')) {
      console.log('Found index.html in root, moving to dist...');
      fs.renameSync('index.html', join(distPath, 'index.html'));
    }
    
    if (currentDirContents.includes('assets')) {
      console.log('Found assets in root, moving to dist...');
      fs.renameSync('assets', join(distPath, 'assets'));
    }
  } catch (e) {
    console.error('Error handling root directory files:', e);
  }
  
  // Check all possible locations
  for (const dir of possibilities) {
    console.log(`Checking directory: ${dir}`);
    if (fs.existsSync(dir)) {
      const indexPath = join(dir, 'index.html');
      if (fs.existsSync(indexPath)) {
        console.log(`Found valid dist directory at: ${dir}`);
        return dir;
      }
    }
  }
  
  // Last resort: try to find index.html anywhere and copy it to dist
  try {
    const findIndexHtml = (startPath) => {
      if (!fs.existsSync(startPath)) return null;
      const files = fs.readdirSync(startPath);
      for (const file of files) {
        const filePath = join(startPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
          const found = findIndexHtml(filePath);
          if (found) return found;
        } else if (file === 'index.html') {
          return filePath;
        }
      }
      return null;
    };
    
    const indexPath = findIndexHtml(process.cwd());
    if (indexPath) {
      console.log(`Found index.html at ${indexPath}, copying to dist...`);
      fs.copyFileSync(indexPath, join(distPath, 'index.html'));
      return distPath;
    }
  } catch (e) {
    console.error('Error in last resort search:', e);
  }
  
  throw new Error('Could not find or create valid dist directory with index.html');
};

try {
  console.log('Starting server...');
  const distDir = findDistDir();
  console.log(`Using dist directory: ${distDir}`);
  
  // Serve static files from the dist directory
  app.use(express.static(distDir));
  
  // Handle client-side routing by serving index.html for all routes
  app.get('*', (req, res) => {
    res.sendFile(join(distDir, 'index.html'));
  });
  
  const port = process.env.PORT || 10000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Serving files from: ${distDir}`);
  });
} catch (error) {
  console.error('Server startup error:', error.message);
  console.error('Environment:', process.env.NODE_ENV);
  console.error('Current directory:', process.cwd());
  console.error('__dirname:', __dirname);
  process.exit(1);
} 