-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "saleCommission" TEXT NOT NULL DEFAULT '0%',
ADD COLUMN     "salePrice" TEXT NOT NULL DEFAULT '$0.00';
