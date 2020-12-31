/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `user`. If there are existing duplicate values, the migration will fail.
  - Made the column `name` on table `user` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user.name_unique` ON `user`(`name`);
