import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Function to find the dist directory
const findDistDir = () => {
  const possibilities = [
    join(__dirname, 'dist'),
    join(process.cwd(), 'dist'),
    join(dirname(process.cwd()), 'dist')
  ];
  
  for (const dir of possibilities) {
    if (fs.existsSync(dir) && fs.existsSync(join(dir, 'index.html'))) {
      console.log('Found dist directory at:', dir);
      return dir;
    }
  }
  throw new Error('Could not find dist directory with index.html');
};

try {
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
  console.error('Current directory:', process.cwd());
  console.error('__dirname:', __dirname);
  process.exit(1);
} 