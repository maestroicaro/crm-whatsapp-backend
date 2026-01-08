// Entry point that imports and starts the server
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('../server.js');
