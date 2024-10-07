/*
  Warnings:

  - You are about to drop the `PurchaseHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PurchaseHistory` DROP FOREIGN KEY `PurchaseHistory_userId_fkey`;

-- AlterTable
ALTER TABLE `Menu` MODIFY `item` VARCHAR(255) NOT NULL,
    MODIFY `price` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `balance` DECIMAL(10, 2) NOT NULL;

-- DropTable
DROP TABLE `PurchaseHistory`;

-- CreateTable
CREATE TABLE `PurshaceHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `item` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `saleDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Checkout` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `status` ENUM('in_progress', 'completed', 'abandoned', 'insufficient_funds') NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckoutItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkoutId` INTEGER NULL,
    `menuItemId` INTEGER NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `checkoutId`(`checkoutId`),
    INDEX `menuItemId`(`menuItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PurshaceHistory` ADD CONSTRAINT `PurshaceHistory_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Checkout` ADD CONSTRAINT `Checkout_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CheckoutItems` ADD CONSTRAINT `CheckoutItems_ibfk_1` FOREIGN KEY (`checkoutId`) REFERENCES `Checkout`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CheckoutItems` ADD CONSTRAINT `CheckoutItems_ibfk_2` FOREIGN KEY (`menuItemId`) REFERENCES `Menu`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
