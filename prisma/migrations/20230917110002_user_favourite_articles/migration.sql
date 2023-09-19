-- CreateTable
CREATE TABLE `Favourite` (
    `userId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,

    UNIQUE INDEX `Favourite_userId_articleId_key`(`userId`, `articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favourite` ADD CONSTRAINT `Favourite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favourite` ADD CONSTRAINT `Favourite_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleFlair` ADD CONSTRAINT `ArticleFlair_flairId_fkey` FOREIGN KEY (`flairId`) REFERENCES `Flair`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
