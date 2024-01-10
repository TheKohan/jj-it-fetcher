-- CreateTable
CREATE TABLE "B2BOffer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "fromPln" DOUBLE PRECISION NOT NULL,
    "toPln" DOUBLE PRECISION NOT NULL,
    "requiredSkills" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,

    CONSTRAINT "B2BOffer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "B2BOffer_slug_key" ON "B2BOffer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "B2BOffer_url_key" ON "B2BOffer"("url");
