-- CreateTable
CREATE TABLE `jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `min_education` VARCHAR(50) NOT NULL,
    `created_date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expired_date` DATE NOT NULL,
    `quota` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
