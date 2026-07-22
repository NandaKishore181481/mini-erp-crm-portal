import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL || 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database with dummy data...');

  // Create Users
  const user = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: 'hashed_password_here',
      role: 'ADMIN'
    }
  });

  // Create Customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'John Doe',
      mobile: '+1 555-0192',
      email: 'john.doe@techcorp.com',
      businessName: 'TechCorp Solutions',
      type: 'WHOLESALE',
      address: '123 Silicon Valley, CA',
      status: 'ACTIVE'
    }
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Jane Smith',
      mobile: '+1 555-0345',
      email: 'jane@retail-plus.com',
      businessName: 'Retail Plus',
      type: 'RETAIL',
      address: '456 Market St, NY',
      status: 'LEAD'
    }
  });

  // Create Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Industrial Widget A',
      sku: 'WID-A-100',
      category: 'Hardware',
      unitPrice: 45.99,
      stock: 150,
      minStockAlert: 20,
      location: 'Warehouse 1'
    }
  });

  // Create Challans
  await prisma.challan.create({
    data: {
      challanNumber: 'CHL-2026-001',
      customerId: customer1.id,
      status: 'CONFIRMED',
      totalQty: 50,
      createdBy: user.id,
      items: {
        create: [
          {
            productId: product1.id,
            productNameSnapshot: product1.name,
            skuSnapshot: product1.sku,
            priceSnapshot: product1.unitPrice,
            qty: 50
          }
        ]
      }
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
