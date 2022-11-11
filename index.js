const http = require(`http`);
const Bot = require(`./Bot`);

const ModMailBot = new Bot();

// Handle graceful shutdowns
process.on(`SIGINT`, cleanup);
process.on(`SIGTERM`, cleanup);

function cleanup() {
  ModMailBot.destroy();
  process.exit();
}

// Basic HTTP server to keep Azure App Service happy
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ModMailBot is alive!');
}).listen(8080);

ModMailBot.connect();
