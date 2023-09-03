/*
  Warnings:

  - You are about to drop the column `senha` on the `Pessoa` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cidadesId" INTEGER NOT NULL,
    CONSTRAINT "Pessoa_cidadesId_fkey" FOREIGN KEY ("cidadesId") REFERENCES "Cidades" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pessoa" ("cidadesId", "email", "id") SELECT "cidadesId", "email", "id" FROM "Pessoa";
DROP TABLE "Pessoa";
ALTER TABLE "new_Pessoa" RENAME TO "Pessoa";
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
