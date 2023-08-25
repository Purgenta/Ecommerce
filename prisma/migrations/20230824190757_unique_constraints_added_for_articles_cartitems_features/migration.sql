/*
  Warnings:

  - A unique constraint covering the columns `[articleId,featureId]` on the table `ArticleFeature` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url,articleId]` on the table `ArticlePhoto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,status]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cartId,articleId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId,name]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ArticlePhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `isSelling` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `articlephoto` ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ArticleFeature_articleId_featureId_key` ON `ArticleFeature`(`articleId`, `featureId`);

-- CreateIndex
CREATE UNIQUE INDEX `ArticlePhoto_url_articleId_key` ON `ArticlePhoto`(`url`, `articleId`);

-- CreateIndex
CREATE UNIQUE INDEX `Cart_userId_status_key` ON `Cart`(`userId`, `status`);

-- CreateIndex
CREATE UNIQUE INDEX `CartItem_cartId_articleId_key` ON `CartItem`(`cartId`, `articleId`);

-- CreateIndex
CREATE UNIQUE INDEX `Feature_categoryId_name_key` ON `Feature`(`categoryId`, `name`);

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
