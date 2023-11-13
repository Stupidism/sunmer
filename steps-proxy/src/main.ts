// Import required modules using ES6 syntax
import http from 'http';
import { createProxyServer } from 'http-proxy';

// Create a proxy server with an options object
const proxy = createProxyServer({
  changeOrigin: true, // Recommended for proxying to HTTPS servers
  secure: false, // If false, will accept invalid SSL certificates
});

// The target website you want to redirect traffic to
const targetWebsite =
  process.env.TARGET_WEBSITE ?? 'https://www.baidu.com/';

// Create a standard Node.js HTTP server that will pass all requests to the proxy server
const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: targetWebsite }, (error) => {
    console.error('error: ', error);
    // If there's an error while proxying, respond with an error message
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(
      'The proxy server encountered an error while processing your request.'
    );
  });
});

// Specify the port to listen on
const port = process.env.PORT || 3333;

// Start listening for incoming requests
server.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
