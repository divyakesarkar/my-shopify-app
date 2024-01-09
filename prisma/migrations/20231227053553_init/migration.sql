/*
  Warnings:

  - You are about to drop the column `password` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Credential` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credential" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shopName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Credential" ("contactEmail", "createdAt", "id", "shopName") SELECT "contactEmail", "createdAt", "id", "shopName" FROM "Credential";
DROP TABLE "Credential";
ALTER TABLE "new_Credential" RENAME TO "Credential";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
