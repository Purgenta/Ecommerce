/*
  Warnings:

  - You are about to drop the `favourite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `favourite` DROP FOREIGN KEY `Favourite_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `favourite` DROP FOREIGN KEY `Favourite_userId_fkey`;

-- DropTable
DROP TABLE `favourite`;

-- CreateTable
CREATE TABLE `WishList` (
    `userId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,

    UNIQUE INDEX `WishList_userId_articleId_key`(`userId`, `articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WishList` ADD CONSTRAINT `WishList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WishList` ADD CONSTRAINT `WishList_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
