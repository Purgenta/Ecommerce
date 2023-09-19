-- CreateTable
CREATE TABLE `ArticleFlair` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flairId` INTEGER NOT NULL,
    `articleId` INTEGER NOT NULL,

    UNIQUE INDEX `ArticleFlair_articleId_key`(`articleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flair` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `color` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Flair_color_key`(`color`),
    UNIQUE INDEX `Flair_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArticleFlair` ADD CONSTRAINT `ArticleFlair_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
