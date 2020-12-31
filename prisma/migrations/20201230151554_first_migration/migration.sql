-- CreateTable
CREATE TABLE `post` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` VARCHAR(191),
    `published` BOOLEAN NOT NULL DEFAULT false,
    `authorId` INT NOT NULL,
INDEX `authorId`(`authorId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191),
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
UNIQUE INDEX `user.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
