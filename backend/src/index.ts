import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env['BACKEND_PORT'] || 3001;

app.listen(PORT, () => {
  console.log(`Backend Autocheck rodando em http://localhost:${PORT}`);
});
