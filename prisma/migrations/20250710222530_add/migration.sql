/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Studio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Studio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Studio" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Studio_username_key" ON "Studio"("username");
