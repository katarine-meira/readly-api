/*
  Warnings:

  - You are about to drop the column `movieId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `ListMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovieUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[followerId,followingId]` on the table `Follows` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,mediaId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mediaId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'BOOK');

-- CreateEnum
CREATE TYPE "MediaUserStatus" AS ENUM ('WATCHED', 'FAVORITE', 'WATCHLIST', 'READ', 'READING', 'WANT_TO_READ');

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follows" DROP CONSTRAINT "Follows_followingId_fkey";

-- DropForeignKey
ALTER TABLE "ListMovie" DROP CONSTRAINT "ListMovie_listId_fkey";

-- DropForeignKey
ALTER TABLE "ListMovie" DROP CONSTRAINT "ListMovie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieUser" DROP CONSTRAINT "MovieUser_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieUser" DROP CONSTRAINT "MovieUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_movieId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "movieId",
ADD COLUMN     "mediaId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ListMovie";

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "MovieUser";

-- DropEnum
DROP TYPE "MovieUserType";

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "posterPath" TEXT,
    "releaseDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieDetails" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "MovieDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookDetails" (
    "id" TEXT NOT NULL,
    "googleBooksId" TEXT NOT NULL,
    "authors" TEXT[],
    "publisher" TEXT,
    "pageCount" INTEGER,
    "isbn" TEXT,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "BookDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListItem" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "ListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "status" "MediaUserStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieDetails_tmdbId_key" ON "MovieDetails"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieDetails_mediaId_key" ON "MovieDetails"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "BookDetails_googleBooksId_key" ON "BookDetails"("googleBooksId");

-- CreateIndex
CREATE UNIQUE INDEX "BookDetails_mediaId_key" ON "BookDetails"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "ListItem_listId_mediaId_key" ON "ListItem"("listId", "mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "MediaUser_userId_mediaId_status_key" ON "MediaUser"("userId", "mediaId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Follows_followerId_followingId_key" ON "Follows"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_mediaId_key" ON "Review"("userId", "mediaId");

-- AddForeignKey
ALTER TABLE "MovieDetails" ADD CONSTRAINT "MovieDetails_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookDetails" ADD CONSTRAINT "BookDetails_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaUser" ADD CONSTRAINT "MediaUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaUser" ADD CONSTRAINT "MediaUser_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
