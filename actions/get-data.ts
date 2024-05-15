"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function getData() {
  const article = await prisma.formContent.findMany({});
  return article;
}
