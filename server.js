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
    // Add Render-specific paths
    '/opt/render/project/src/dist'
  ];
  
  console.log('Searching for dist directory in the following locations:');
  possibilities.forEach((dir, index) => {
    console.log(`${index + 1}. ${dir}`);
    console.log(`   Exists: ${fs.existsSync(dir)}`);
    if (fs.existsSync(dir)) {
      console.log(`   Contains index.html: ${fs.existsSync(join(dir, 'index.html'))}`);
      try {
        console.log(`   Directory contents: ${fs.readdirSync(dir).join(', ')}`);
      } catch (e) {
        console.log(`   Error reading directory: ${e.message}`);
      }
    }
  });
  
  for (const dir of possibilities) {
    if (fs.existsSync(dir) && fs.existsSync(join(dir, 'index.html'))) {
      console.log('Found dist directory at:', dir);
      return dir;
    }
  }
  
  // If we get here, we couldn't find the dist directory
  console.error('Build directory structure:');
  try {
    console.error('Current directory contents:', fs.readdirSync(process.cwd()));
  } catch (e) {
    console.error('Error listing current directory:', e.message);
  }
  
  throw new Error('Could not find dist directory with index.html');
};

try {
  console.log('Starting server...');
  console.log('Current working directory:', process.cwd());
  console.log('__dirname:', __dirname);
  
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