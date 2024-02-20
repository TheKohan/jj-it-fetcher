/*
  Warnings:

  - You are about to drop the column `notificationId` on the `DiscordNotification` table. All the data in the column will be lost.
  - You are about to drop the column `notificationId` on the `EmailNotification` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the `SearchTagsOnNotifications` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `DiscordNotification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `EmailNotification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `DiscordNotification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `EmailNotification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DiscordNotification" DROP CONSTRAINT "DiscordNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "EmailNotification" DROP CONSTRAINT "EmailNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "SearchTagsOnNotifications" DROP CONSTRAINT "SearchTagsOnNotifications_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "SearchTagsOnNotifications" DROP CONSTRAINT "SearchTagsOnNotifications_searchTagName_fkey";

-- DropIndex
DROP INDEX "DiscordNotification_notificationId_key";

-- DropIndex
DROP INDEX "EmailNotification_notificationId_key";

-- AlterTable
ALTER TABLE "DiscordNotification" DROP COLUMN "notificationId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EmailNotification" DROP COLUMN "notificationId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "SearchTag" ADD CONSTRAINT "SearchTag_pkey" PRIMARY KEY ("name");

-- DropTable
DROP TABLE "SearchTagsOnNotifications";

-- CreateTable
CREATE TABLE "_EmailNotificationToSearchTag" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscordNotificationToSearchTag" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmailNotificationToSearchTag_AB_unique" ON "_EmailNotificationToSearchTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EmailNotificationToSearchTag_B_index" ON "_EmailNotificationToSearchTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscordNotificationToSearchTag_AB_unique" ON "_DiscordNotificationToSearchTag"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscordNotificationToSearchTag_B_index" ON "_DiscordNotificationToSearchTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordNotification_userId_key" ON "DiscordNotification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailNotification_userId_key" ON "EmailNotification"("userId");

-- AddForeignKey
ALTER TABLE "EmailNotification" ADD CONSTRAINT "EmailNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Notification"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscordNotification" ADD CONSTRAINT "DiscordNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Notification"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmailNotificationToSearchTag" ADD CONSTRAINT "_EmailNotificationToSearchTag_A_fkey" FOREIGN KEY ("A") REFERENCES "EmailNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmailNotificationToSearchTag" ADD CONSTRAINT "_EmailNotificationToSearchTag_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchTag"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscordNotificationToSearchTag" ADD CONSTRAINT "_DiscordNotificationToSearchTag_A_fkey" FOREIGN KEY ("A") REFERENCES "DiscordNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscordNotificationToSearchTag" ADD CONSTRAINT "_DiscordNotificationToSearchTag_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchTag"("name") ON DELETE CASCADE ON UPDATE CASCADE;
