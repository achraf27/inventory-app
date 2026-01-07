import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import { open } from 'sqlite';

/**
 * Type représentant une connexion à la base SQLite.
 */
export type DbSource = Database<sqlite3.Database, sqlite3.Statement>;

/**
 * Classe singleton pour gérer la connexion à la base de données SQLite.
 * 
 * Fournit une instance unique de la connexion et des méthodes utilitaires
 * pour créer les tables nécessaires au backend.
 */
export class Db {
  /** Instance unique de la connexion */
  private static instance: DbSource | null = null;

  /**
   * Récupère la connexion à la base SQLite.
   * Si aucune connexion n'existe, elle est créée.
   * 
   * @returns Promise<DbSource> La connexion SQLite
   */
  static async getConnection(): Promise<DbSource> {
    if (!Db.instance) {
      Db.instance = await open({
        filename: "./db.sqlite",
        driver: sqlite3.Database,
      });
    }
    return Db.instance;
  }

  /**
   * Crée les tables de la base de données si elles n'existent pas.
   * 
   * Tables créées :
   * - users
   * - inventory
   * - suppliers
   * - articles
   * - suppliers_articles
   * 
   * Cette méthode active également les clés étrangères avec `PRAGMA foreign_keys = ON`.
   * 
   * @returns Promise<void>
   */
  static async createTables(): Promise<void> {
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
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
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
      CREATE TABLE IF NOT EXISTS suppliers_articles (
        supplier_id INTEGER NOT NULL,
        article_id INTEGER NOT NULL,
        PRIMARY KEY(article_id, supplier_id),
        FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
      )
    `);

    console.log("Tables créées");
  }
}
