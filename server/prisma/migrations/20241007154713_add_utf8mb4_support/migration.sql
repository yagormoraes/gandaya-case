/*
  Warnings:

  - You are about to alter the column `total` on the `Checkout` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `balance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - Made the column `updatedAt` on table `Checkout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Checkout` MODIFY `total` DOUBLE NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `PurshaceHistory` MODIFY `saleDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` MODIFY `balance` DOUBLE NOT NULL;
