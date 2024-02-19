/*
  Warnings:

  - A unique constraint covering the columns `[notificationId]` on the table `DiscordNotification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[notificationId]` on the table `EmailNotification` will be added. If there are existing duplicate values, this will fail.
  - Made the column `notificationId` on table `DiscordNotification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notificationId` on table `EmailNotification` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `discordNotificationId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailNotificationId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DiscordNotification" DROP CONSTRAINT "DiscordNotification_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "EmailNotification" DROP CONSTRAINT "EmailNotification_notificationId_fkey";

-- AlterTable
ALTER TABLE "DiscordNotification" ALTER COLUMN "notificationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "EmailNotification" ALTER COLUMN "notificationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "discordNotificationId" INTEGER NOT NULL,
ADD COLUMN     "emailNotificationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DiscordNotification_notificationId_key" ON "DiscordNotification"("notificationId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailNotification_notificationId_key" ON "EmailNotification"("notificationId");

-- AddForeignKey
ALTER TABLE "EmailNotification" ADD CONSTRAINT "EmailNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscordNotification" ADD CONSTRAINT "DiscordNotification_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
