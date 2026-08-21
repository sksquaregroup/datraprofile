const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = parseInt(process.env.PORT, 10) || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

function createServer() {
  const server = http.createServer((req, res) => {
    let parsedUrl = req.url.split('?')[0].split('#')[0];
    if (parsedUrl === '/') {
      parsedUrl = '/index.html';
    }

    let safePath = path.normalize(path.join(ROOT_DIR, decodeURIComponent(parsedUrl)));
    if (!safePath.startsWith(ROOT_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden');
      return;
    }

    if (fs.existsSync(safePath) && fs.statSync(safePath).isDirectory()) {
      safePath = path.join(safePath, 'index.html');
    }

    if (!fs.existsSync(safePath) || !fs.statSync(safePath).isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html>
<html>
<head><title>404 Not Found</title><style>body{font-family:sans-serif;background:#1a103c;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0;}a{color:#00e5ff;text-decoration:none;font-weight:bold;margin-top:20px;}</style></head>
<body><h1>404 — Page Not Found</h1><p>The requested URL was not found on this server.</p><a href="/">&larr; Return Home</a></body>
</html>`);
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(safePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache' });
      res.end(data);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is currently in use. Trying port ${PORT + 1}...`);
      PORT++;
      setTimeout(startServer, 200);
    } else {
      console.error('Server error:', err);
    }
  });

  return server;
}

function startServer() {
  const server = createServer();
  server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`\n======================================================`);
    console.log(`  🚀 Datra Platform Local Dev Server Running!`);
    console.log(`  🔗 Local URL: \x1b[36m${url}\x1b[0m`);
    console.log(`  📁 Root Dir:  ${ROOT_DIR}`);
    console.log(`======================================================\n`);

    if (process.platform === 'win32') {
      exec(`start ${url}`);
    } else if (process.platform === 'darwin') {
      exec(`open ${url}`);
    } else {
      exec(`xdg-open ${url}`);
    }
  });
}

startServer();
