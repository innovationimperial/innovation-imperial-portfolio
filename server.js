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
    join(__dirname, 'dist'),
    join(process.cwd(), 'dist'),
    join(dirname(process.cwd()), 'dist'),
    '/opt/render/project/src/dist',
    // Add more fallback paths
    join(__dirname, '..', 'dist'),
    join(process.cwd(), '..', 'dist')
  ];
  
  console.log('Starting directory search...');
  console.log('Process working directory:', process.cwd());
  console.log('__dirname:', __dirname);
  
  // First check if we have a dist directory
  try {
    const currentDirContents = fs.readdirSync(process.cwd());
    console.log('Current directory contents:', currentDirContents);
    
    // Check if build created files in root instead of dist
    if (currentDirContents.includes('index.html') && currentDirContents.includes('assets')) {
      console.log('Found build files in root directory, moving to dist...');
      if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist', { recursive: true });
      }
      fs.renameSync('index.html', join('dist', 'index.html'));
      fs.renameSync('assets', join('dist', 'assets'));
      return join(process.cwd(), 'dist');
    }
  } catch (e) {
    console.error('Error checking current directory:', e);
  }
  
  console.log('Searching for dist directory in the following locations:');
  for (const dir of possibilities) {
    console.log(`Checking: ${dir}`);
    console.log(`  Exists: ${fs.existsSync(dir)}`);
    if (fs.existsSync(dir)) {
      try {
        const hasIndexHtml = fs.existsSync(join(dir, 'index.html'));
        console.log(`  Contains index.html: ${hasIndexHtml}`);
        const contents = fs.readdirSync(dir);
        console.log(`  Directory contents: ${contents.join(', ')}`);
        
        if (hasIndexHtml) {
          console.log('Found valid dist directory at:', dir);
          return dir;
        }
      } catch (e) {
        console.log(`  Error reading directory: ${e.message}`);
      }
    }
  }
  
  // If we get here, we couldn't find the dist directory
  console.error('Could not find dist directory. Directory structure:');
  try {
    const allFiles = fs.readdirSync(process.cwd());
    console.error('Root directory contents:', allFiles);
    
    // Try to create dist directory as last resort
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist', { recursive: true });
      console.log('Created new dist directory');
    }
  } catch (e) {
    console.error('Error listing/creating directories:', e.message);
  }
  
  throw new Error('Could not find or create valid dist directory with index.html');
};

try {
  console.log('Starting server...');
  const distDir = findDistDir();
  
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