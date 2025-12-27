import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

import ws from "ws";
import { PrismaClient } from "@/generated/prisma/client";
neonConfig.webSocketConstructor = ws;

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") globalForPrisma.prisma = prisma;

export default prisma;
