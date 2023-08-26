-- DropForeignKey
ALTER TABLE `articlefeature` DROP FOREIGN KEY `ArticleFeature_featureId_fkey`;

-- AddForeignKey
ALTER TABLE `ArticleFeature` ADD CONSTRAINT `ArticleFeature_featureId_fkey` FOREIGN KEY (`featureId`) REFERENCES `Feature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
