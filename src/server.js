// Entry point that imports and starts the server
import('../server.js').catch(err => {
  console.error('Failed to load server:', err);
  process.exit(1);
});
