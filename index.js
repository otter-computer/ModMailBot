const Bot = require(`./Bot`);

const ModMailBot = new Bot();

// Handle graceful shutdowns
process.on(`SIGINT`, cleanup);
process.on(`SIGTERM`, cleanup);

function cleanup() {
  ModMailBot.destroy();
  process.exit();
}

ModMailBot.connect();
