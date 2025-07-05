/*
  Warnings:

  - Added the required column `updatedAt` to the `pemasukan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `pengeluaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pemasukan` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `pengeluaran` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
