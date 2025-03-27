import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Function to find the dist directory
const findDistDir = () => {
  const distPath = join(process.cwd(), 'dist');
  console.log('Looking for dist directory at:', distPath);
  
  if (!fs.existsSync(distPath)) {
    console.log('Creating dist directory...');
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  // Log the contents of the dist directory
  console.log('Dist directory contents:');
  try {
    const contents = fs.readdirSync(distPath);
    console.log(contents);
    
    if (contents.includes('index.html')) {
      const indexContent = fs.readFileSync(join(distPath, 'index.html'), 'utf-8');
      console.log('index.html content:', indexContent);
    }
  } catch (e) {
    console.error('Error reading dist directory:', e);
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