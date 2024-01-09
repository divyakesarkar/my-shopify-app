-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "checkbox1" BOOLEAN NOT NULL DEFAULT false,
    "checkbox2" BOOLEAN NOT NULL DEFAULT false,
    "checkbox3" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Personalize" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "checkbox1" BOOLEAN NOT NULL DEFAULT false,
    "checkbox2" BOOLEAN NOT NULL DEFAULT false,
    "checkbox3" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checkbox1" BOOLEAN NOT NULL DEFAULT false,
    "checkbox2" BOOLEAN NOT NULL DEFAULT false,
    "checkbox3" BOOLEAN NOT NULL DEFAULT false
);
