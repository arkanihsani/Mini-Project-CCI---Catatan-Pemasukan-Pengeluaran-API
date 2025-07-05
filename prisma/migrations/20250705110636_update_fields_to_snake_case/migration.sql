/*
  Warnings:

  - You are about to drop the column `createdAt` on the `pemasukan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pemasukan` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `pengeluaran` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pengeluaran` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `pemasukan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `pengeluaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pemasukan` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `pengeluaran` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
