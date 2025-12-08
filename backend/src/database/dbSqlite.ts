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
            role TEXT NOT NULL,
            name VARCHAR(200) NOT NULL UNIQUE,
            mail TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `);

        await db.exec(`
          CREATE TABLE IF NOT EXISTS articles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          name VARCHAR(200) NOT NULL,
          quantity INTEGER,
          unit VARCHAR NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          FOREIGN KEY (user_id) REFERENCES users(id)
          
        )
        `);

    console.log("Tables créées");
  }
}

