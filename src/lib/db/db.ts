import { PrismaClient } from '@prisma/client';

export type DatabaseClient = PrismaClient;

let _db: DatabaseClient | null = null;

export function initializeDatabase(client: DatabaseClient) {
  _db = client;
}

export function getDatabase(): DatabaseClient | null {
  return _db;
}