import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllPosts() {
  return await prisma.post.findMany();
}

export default getAllPosts;
