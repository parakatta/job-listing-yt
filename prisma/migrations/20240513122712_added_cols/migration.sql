/*
  Warnings:

  - Added the required column `desc` to the `JobListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `JobListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibility` to the `JobListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobListing" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL,
ADD COLUMN     "responsibility" TEXT NOT NULL;
