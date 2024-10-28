/*
  Warnings:

  - A unique constraint covering the columns `[action,subjectId]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "permissions_action_subjectId_key" ON "permissions"("action", "subjectId");
