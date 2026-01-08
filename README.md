# CRM WhatsApp Backend

Backend server for CRM system with WhatsApp Business integration built with Node.js, Express, and PostgreSQL.

## Features

- WhatsApp message integration using whatsapp-web.js
- Express.js REST API
- PostgreSQL database
- QR code authentication for WhatsApp
- Message storage and retrieval
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/maestroicaro/crm-whatsapp-backend.git
cd crm-whatsapp-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file from .env.example:
```bash
cp .env.example .env
```

4. Update .env with your database and configuration details.

## Running

```bash
npm start
```

The server will start on the port specified in .env (default: 3000).

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/send-message` - Send WhatsApp message
- `GET /api/messages` - Get all messages

## Database

Make sure PostgreSQL is running and create the database:

```sql
CREATE DATABASE crm_db;
```

The application will handle table creation on startup.

## License

MIT
