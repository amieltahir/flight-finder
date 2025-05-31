// backend/index.js
import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import flightRoutes from './routes/flights.js';

dotenv.config();

const app = Fastify({ logger: true });

// Enable CORS for frontend communication
await app.register(cors, {
  origin: '*', // In production, restrict this to your frontend domain
});

// Register routes
app.register(flightRoutes, { prefix: '/api/flights' });

// Start the server
const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

