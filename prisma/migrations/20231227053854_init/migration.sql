/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `shopName` on the `Credential` table. All the data in the column will be lost.
  - Added the required column `password` to the `Credential` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credential" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Credential" ("id") SELECT "id" FROM "Credential";
DROP TABLE "Credential";
ALTER TABLE "new_Credential" RENAME TO "Credential";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
