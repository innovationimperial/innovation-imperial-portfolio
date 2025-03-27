import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Function to find the dist directory
const findDistDir = () => {
  // First try the default location
  let distPath = join(process.cwd(), 'dist');
  
  // If not found, try the Render-specific path
  if (!fs.existsSync(distPath) && process.env.NODE_ENV === 'production') {
    distPath = '/opt/render/project/src/dist';
  }
  
  console.log('Looking for dist directory at:', distPath);
  
  if (!fs.existsSync(distPath)) {
    console.error('Error: dist directory does not exist. Please run npm run build first.');
    process.exit(1);
  }
  
  // Log the contents of the dist directory
  console.log('Dist directory contents:');
  try {
    const contents = fs.readdirSync(distPath);
    console.log(contents);
  } catch (e) {
    console.error('Error reading dist directory:', e);
    process.exit(1);
  }
  
  return distPath;
};

try {
  console.log('Starting server...');
  const distDir = findDistDir();
  
  // Serve static files from the dist directory
  app.use(express.static(distDir));
  
  // Log all requests
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  
  // Handle client-side routing by serving index.html for all routes
  app.get('*', (req, res) => {
    console.log('Serving index.html for:', req.url);
    const indexPath = join(distDir, 'index.html');
    
    if (!fs.existsSync(indexPath)) {
      console.error('Error: index.html not found in dist directory');
      return res.status(404).send('Not Found: index.html is missing from the build output');
    }
    
    res.sendFile(indexPath);
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