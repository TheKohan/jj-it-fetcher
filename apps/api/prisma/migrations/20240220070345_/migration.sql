-- CreateTable
CREATE TABLE "SearchTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SearchTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchTagsOnNotifications" (
    "id" SERIAL NOT NULL,
    "searchTagId" INTEGER NOT NULL,
    "notificationId" INTEGER NOT NULL,

    CONSTRAINT "SearchTagsOnNotifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchTag_name_key" ON "SearchTag"("name");

-- AddForeignKey
ALTER TABLE "SearchTagsOnNotifications" ADD CONSTRAINT "SearchTagsOnNotifications_searchTagId_fkey" FOREIGN KEY ("searchTagId") REFERENCES "SearchTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchTagsOnNotifications" ADD CONSTRAINT "SearchTagsOnNotifications_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
