/*
  Warnings:

  - You are about to drop the column `discordNotificationId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `emailNotificationId` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `SearchTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SearchTag` table. All the data in the column will be lost.
  - The primary key for the `SearchTagsOnNotifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SearchTagsOnNotifications` table. All the data in the column will be lost.
  - You are about to drop the column `searchTagId` on the `SearchTagsOnNotifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `searchTagName` to the `SearchTagsOnNotifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SearchTagsOnNotifications" DROP CONSTRAINT "SearchTagsOnNotifications_searchTagId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "discordNotificationId",
DROP COLUMN "emailNotificationId";

-- AlterTable
ALTER TABLE "SearchTag" DROP CONSTRAINT "SearchTag_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "SearchTagsOnNotifications" DROP CONSTRAINT "SearchTagsOnNotifications_pkey",
DROP COLUMN "id",
DROP COLUMN "searchTagId",
ADD COLUMN     "searchTagName" TEXT NOT NULL,
ADD CONSTRAINT "SearchTagsOnNotifications_pkey" PRIMARY KEY ("searchTagName", "notificationId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_key" ON "Notification"("userId");

-- AddForeignKey
ALTER TABLE "SearchTagsOnNotifications" ADD CONSTRAINT "SearchTagsOnNotifications_searchTagName_fkey" FOREIGN KEY ("searchTagName") REFERENCES "SearchTag"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
