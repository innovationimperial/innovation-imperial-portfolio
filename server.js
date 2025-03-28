import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Function to find the dist directory
const findDistDir = () => {
  const possiblePaths = [
    join(process.cwd(), 'dist'),
    '/opt/render/project/src/dist',
    join(__dirname, 'dist')
  ];
  
  console.log('Current working directory:', process.cwd());
  console.log('__dirname:', __dirname);
  console.log('Checking possible dist paths:', possiblePaths);
  
  for (const distPath of possiblePaths) {
    console.log('Checking path:', distPath);
    if (fs.existsSync(distPath)) {
      console.log('Found dist directory at:', distPath);
      try {
        const contents = fs.readdirSync(distPath);
        console.log('Dist directory contents:', contents);
        if (contents.includes('index.html')) {
          return distPath;
        }
        console.log('Warning: index.html not found in', distPath);
      } catch (e) {
        console.error('Error reading directory:', distPath, e);
      }
    }
  }
  
  console.error('Error: Could not find valid dist directory with index.html');
  console.error('Please ensure you have run npm run build and the build completed successfully');
  process.exit(1);
};

try {
  console.log('Starting server...');
  console.log('Node environment:', process.env.NODE_ENV);
  const distDir = findDistDir();
  
  // Serve static files from the dist directory
  app.use(express.static(distDir));
  
  // Log all requests
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  
  // Handle client-side routing
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
  console.error('Server startup error:', error);
  console.error('Environment:', process.env.NODE_ENV);
  console.error('Current directory:', process.cwd());
  console.error('__dirname:', __dirname);
  process.exit(1);
} 