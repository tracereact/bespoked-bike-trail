import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Feed database with initial values
 */
 async function seed() {
  await prisma.product.deleteMany();
  await prisma.salesPerson.deleteMany();
  await prisma.customer.deleteMany();
  
  // Product 1
  const superBike = await prisma.product.create({
    data: {
      name: 'Super Bike v2',
      manufacturer: 'Super',
      style: 'v2',
      purchasePrice: '$400.99',
      salePrice: '$599.99',
      qtyOnHand: '10',
      commissionPercentage: '5%',
    }  
  });

  // Product 2
  const badBike = await prisma.product.create({
    data: {
      name: 'Bad Bike 2.0',
      manufacturer: 'Bad',
      style: '2.0',
      purchasePrice: '$99.99',
      salePrice: '$199.99',
      qtyOnHand: '10',
      commissionPercentage: '2%',  
    }  
  });

  // Sales Person 1
  const bill = await prisma.salesPerson.create({
    data: {
      firstName: 'Bill',
      lastName: 'Johnson',
      address: '123 Sesame Street',
      phone: '(555) 867-5309',
    }
  });

  // Sales Person 2
  const bob = await prisma.salesPerson.create({
    data: {
      firstName: 'Bob',
      lastName: 'Jackson',
      address: '321 Sesame Street',
      phone: '(555) 555-1234',
      managerId: bill.id
    }
  });

  // Customer 1
  const timmy = await prisma.customer.create({
    data: {
      firstName: 'Timmy',
      lastName: 'Turner',
      address: '500 Fairly Odd Lane',
      phone: '(555) 555-4321',
    }
  });

  // Customer 2
  const turner = await prisma.customer.create({
    data: {
      firstName: 'Turner',
      lastName: 'Timothies',
      address: '700 Pretty Normal St',
      phone: '(555) 123-4321',
    }
  });

  // Purchase 1
  await prisma.sale.create({
    data: {
      productId: superBike.id,
      salesPersonId: bill.id,
      customerId: timmy.id
    }
  });

  // Purchase 2
  await prisma.sale.create({
    data: {
      productId: badBike.id,
      salesPersonId: bob.id,
      customerId: turner.id
    }
  });

  // Purchase 3
  await prisma.sale.create({
    data: {
      productId: badBike.id,
      salesPersonId: bill.id,
      customerId: timmy.id
    }
  });

  // Discount 1
  await prisma.discount.create({
    data: {
      productId: superBike.id,
      discountPercentage: '10%'
    }
  });
}

seed();