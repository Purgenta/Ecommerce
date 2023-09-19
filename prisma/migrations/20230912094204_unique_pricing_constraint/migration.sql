/*
  Warnings:

  - A unique constraint covering the columns `[articleId,type]` on the table `Price` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Price_articleId_type_key` ON `Price`(`articleId`, `type`);
