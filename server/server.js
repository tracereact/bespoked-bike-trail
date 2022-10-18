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

// List customers
app.get('/customers', async () => {
  const result = await commitToDb(
    prisma.customer.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        address: true,
        phone: true,
      },
    })
  );
  return result;
});

// Get individual sales person
app.get('/customers/:id', async (req) => {
  const result = await commitToDb(
    prisma.customer.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        firstName: true,
        lastName: true,
        address: true,
        phone: true,
        startDate: true,
      },
    })
  );
  return result;
});

// List sales
app.get('/sales', async () => {
  const result = await commitToDb(
    prisma.sale.findMany({
      select: {
        id: true,
        productId: true,
        salesPersonId: true,
        customerId: true,
        salesDate: true,
        product: {
          select: {
            name: true,
            salePrice: true,
            commissionPercentage: true,
          },
        },
        customer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        salesPerson: {
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

// Check if sales person already exists
// const salePersonExists = async (firstName, lastName) => {
//   const salesPerson = (
//     await prisma.salesPerson.findFirst({
//       where: {
//         firstName,
//         lastName
//       }
//     })
//   );

//   return salesPerson !== null;
// };

// Add new customer
app.post('/customers', async (req, res) => {
  if (!req.body || req.body === '') {
    return res.send(app.httpErrors.badRequest('Information is required'));
  }

  const result = await commitToDb(
    prisma.customer.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phone: req.body.phone,
      },
    })
  );

  return result;
});

/* ------------------ PUTs ------------------ */

// Update customer
app.put('/customers/:id', async (req, res) => {
  if (!req.body || req.body === '') {
    return res.send(app.httpErrors.badRequest('Information is required'));
  }

  const result = await commitToDb(
    prisma.customer.update({
      where: { id: req.params.id },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phone: req.body.phone,
      },
    })
  );

  return result;
});

// Start server
app.listen({ port: process.env.PORT });
