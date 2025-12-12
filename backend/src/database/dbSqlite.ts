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

        await db.exec(`PRAGMA foreign_keys = ON;`);


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
          CREATE TABLE IF NOT EXISTS inventory (
          article_id INTEGER NOT NULL,
          user_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          UNIQUE (user_id, article_id),
          FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
        `);

         await db.exec(`
          CREATE TABLE IF NOT EXISTS suppliers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          contact_name VARCHAR(200) NOT NULL,
          mail TEXT NOT NULL UNIQUE,
          phone TEXT,
          address TEXT
        )
        `);

          await db.exec(`
          CREATE TABLE IF NOT EXISTS articles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(200) NOT NULL,
          unit VARCHAR NOT NULL
        )
        `);

         await db.exec(`
          CREATE TABLE IF NOT EXISTS article_suppliers (
          article_id INTEGER NOT NULL,
          supplier_id INTEGER NOT NULL,
          PRIMARY KEY(article_id, supplier_id),
          FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
          FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
        )
        `);




    console.log("Tables créées");
  }
}

