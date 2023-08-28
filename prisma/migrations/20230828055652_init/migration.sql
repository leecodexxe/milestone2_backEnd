/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Userdata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Userdata_username_key" ON "Userdata"("username");
