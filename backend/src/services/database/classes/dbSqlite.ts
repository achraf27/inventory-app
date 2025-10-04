import sqlite3 from 'sqlite3';
import {Database} from 'sqlite';
import {open} from 'sqlite';

export type DbSource = Database<sqlite3.Database, sqlite3.Statement>

export class Db{
    private static instance: DbSource | null = null;

    static async getConnection(): Promise<DbSource>{
        if (!Db.instance) {
            Db.instance = await open({
              filename: "./db.sqlite",
              driver: sqlite3.Database,
            });
          }
          return Db.instance;
        }
    

    static async createTables() {
        const db = await Db.getConnection();

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(200) NOT NULL,
            mail TEXT NOT NULL,
            password TEXT NOT NULL
        )
        `);

    console.log("Tables créées");
  }
}

