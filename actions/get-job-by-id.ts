"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getJobById(id: string) {
  try {
    const jobListing = await prisma.jobListing.findUnique({
      where: { id },
    });
    return jobListing;
  } catch (error) {
    console.error("Error fetching job listing:", error);
    throw new Error("Could not fetch job listing");
  }
}
