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

/* ------------------ GETs ------------------ */

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

// Get individual product
app.get('/products/:id', async (req) => {
  const result = await commitToDb(
    prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        name: true,
        manufacturer: true,
        style: true,
        purchasePrice: true,
        salePrice: true,
        qtyOnHand: true,
        commissionPercentage: true,
        sales: {
          orderBy: {
            salesDate: 'desc',
          },
          select: {
            customer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                address: true,
                phone: true,
              },
            },
            salesPerson: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                address: true,
                phone: true,
              },
            },
            salesDate: true,
          },
        },
        discounts: {
          orderBy: {
            beginDate: 'desc',
          },
          select: {
            id: true,
            beginDate: true,
            endDate: true,
            discountPercentage: true,
          },
        },
      },
    })
  );
  return result;
});

// List sales people
app.get('/sales-people', async () => {
  const result = await commitToDb(
    prisma.salesPerson.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    })
  );
  return result;
});

// Get individual sales person
app.get('/sales-people/:id', async (req) => {
  const result = await commitToDb(
    prisma.salesPerson.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        firstName: true,
        lastName: true,
        address: true,
        phone: true,
        startDate: true,
        terminationDate: true,
        manager: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        employees: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })
  );
  return result;
});

/* ------------------ POSTs ------------------ */

// Add new product
// app.post('/products/:id')

// Start server
app.listen({ port: process.env.PORT });
