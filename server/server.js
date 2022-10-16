import fastify from 'fastify';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load in everything from .env file
dotenv.config();

const app = fastify();
app.register(sensible);
app.register(cors, {
  origin: process.env.CLIENT_URL,

  // Sending along cookies
  credentials: true,
});
const prisma = new PrismaClient();

// Helper function for handling server errors
const commitToDb = async (promise) => {
  const [error, data] = await app.to(promise);

  // 500 -- something wrong with server
  if (error) return app.httpErrors.internalServerError(error.message);

  // No errors caught -- return data to user
  return data;
};

// List products available
app.get('/products', async () => {
  const result = await commitToDb(
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  );
  return result;
});

app.listen({ port: process.env.PORT });