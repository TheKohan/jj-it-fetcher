/*
  Warnings:

  - A unique constraint covering the columns `[webhookId]` on the table `DiscordNotification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `EmailNotification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DiscordNotification_userId_key";

-- DropIndex
DROP INDEX "EmailNotification_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "DiscordNotification_webhookId_key" ON "DiscordNotification"("webhookId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailNotification_email_key" ON "EmailNotification"("email");
