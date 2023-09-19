-- CreateTable
CREATE TABLE `Discount` (
    `id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,

    UNIQUE INDEX `Discount_articleId_key`(`articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryDiscount` (
    `id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `CategoryDiscount_categoryId_key`(`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryDiscount` ADD CONSTRAINT `CategoryDiscount_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
