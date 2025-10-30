import { PGlite } from '@electric-sql/pglite';
import { PrismaPGlite } from 'pglite-prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { DATABASE_DIR } from '$env/static/private';

import { initializeDatabase } from '$lib/db/db';

let client = new PGlite(DATABASE_DIR);

const adapter = new PrismaPGlite(client);

initializeDatabase(new PrismaClient({ adapter }));