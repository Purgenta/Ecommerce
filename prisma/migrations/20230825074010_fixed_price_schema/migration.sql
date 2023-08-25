/*
  Warnings:

  - Added the required column `articleId` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `price` ADD COLUMN `articleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Price` ADD CONSTRAINT `Price_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
