import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

// Create a PostgreSQL client using the environment variable provided by Replit
const connectionString = process.env.DATABASE_URL || "";
const client = postgres(connectionString);

// Create a drizzle instance with our schema
export const db = drizzle(client, { schema });