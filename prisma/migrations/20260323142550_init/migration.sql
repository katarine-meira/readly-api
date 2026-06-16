/*
  Warnings:

  - You are about to drop the column `idade` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sobrenome` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Veiculo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MovieUserType" AS ENUM ('WATCHED', 'FAVORITE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "idade",
DROP COLUMN "nome",
DROP COLUMN "sobrenome",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Veiculo";

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "releaseDate" TIMESTAMP(3),

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListMovie" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "ListMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "type" "MovieUserType" NOT NULL,

    CONSTRAINT "MovieUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follows" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListMovie" ADD CONSTRAINT "ListMovie_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListMovie" ADD CONSTRAINT "ListMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieUser" ADD CONSTRAINT "MovieUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieUser" ADD CONSTRAINT "MovieUser_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
