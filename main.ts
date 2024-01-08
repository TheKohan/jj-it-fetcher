import { Prisma, PrismaClient } from './generated/client/deno/edge';
import { load } from 'https://deno.land/std@0.211.0/dotenv/mod.ts';

const envVars = await load();

const prisma = new PrismaClient({
  datasourceUrl: envVars.DATABASE_URL,
});
