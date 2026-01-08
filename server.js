import express from 'express';
import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const app = express();

app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// WhatsApp Client
const client = new Client();

client.on('qr', (qr) => {
  console.log('QR code generated:');
  qrcode.toTerminal(qr);
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  console.log(`New message from ${message.from}: ${message.body}`);

  try {
    await pool.query(
      'INSERT INTO messages (from_number, message_body, timestamp) VALUES ($1, $2, $3)',
      [message.from, message.body, new Date()]
    );
  } catch (error) {
    console.error('Error saving message:', error);
  }
});

client.initialize();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/send-message', async (req, res) => {
  const { phone, message } = req.body;

  try {
    await client.sendMessage(`${phone}@c.us`, message);
    res.json({ success: true, message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY timestamp DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
