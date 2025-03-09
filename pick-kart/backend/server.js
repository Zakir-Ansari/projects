require('dotenv').config();
const app = require('./app/app');

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// If the port is in use or the server crashes
server.on('error', error => {
  console.error('Server startup error:', error);
  process.exit(1);
});

// Handle process termination (CTRL+C, `kill` command, Docker stop, etc.)
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await disconnectDB();
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('Process terminated.');
  await disconnectDB();
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
