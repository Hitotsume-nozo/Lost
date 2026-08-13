import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let globalConnection: mysql.Connection | null = null;

async function createConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    timezone: 'Z',
  });

  return connection;
}

export async function getDb() {
  if (!globalConnection) {
    globalConnection = await createConnection();
  }

  try {
    // Test connection health
    await globalConnection.ping();
  } catch (error) {
    console.log('Reconnecting to database...');
    globalConnection = await createConnection();
  }

  return drizzle(globalConnection, { schema, mode: 'default' });
}

// Helper for calling stored procedures
export async function callProcedure<T>(procedureName: string, params: any[] = []): Promise<T> {
  const db = await getDb();
  const connection = (db as any).session;
  
  if (!connection) {
    throw new Error('Database connection not available');
  }

  const paramsPlaceholder = params.length > 0 ? params.map(() => '?').join(', ') : '';
  const sql = `CALL ${procedureName}(${paramsPlaceholder})`;
  
  const [results] = await connection.execute(sql, params);
  return results as T;
}
