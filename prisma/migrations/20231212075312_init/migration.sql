/*
  Warnings:

  - You are about to drop the column `checkbox1` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `checkbox2` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `checkbox3` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `checkbox1` on the `Personalize` table. All the data in the column will be lost.
  - You are about to drop the column `checkbox2` on the `Personalize` table. All the data in the column will be lost.
  - You are about to drop the column `checkbox3` on the `Personalize` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_Product" ("id", "imageUrl", "name") SELECT "id", "imageUrl", "name" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Personalize" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "personalize" BOOLEAN NOT NULL DEFAULT false,
    "template" BOOLEAN NOT NULL DEFAULT false,
    "design" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Personalize" ("id", "imageUrl", "name") SELECT "id", "imageUrl", "name" FROM "Personalize";
DROP TABLE "Personalize";
ALTER TABLE "new_Personalize" RENAME TO "Personalize";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
