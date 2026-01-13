import {Pool} from "pg";


/**
 * Classe singleton pour gérer la connexion à la base de données PostegreSQL.
 * 
 * Fournit une instance unique de la connexion et des méthodes utilitaires
 * pour créer les tables nécessaires au backend.
 */
export class DbPostgreSQL {
  /** Instance unique de la connexion */
  private static pool:Pool;

  /**
   * Récupère la connexion à la base PostgreSQL.
   * Si aucune connexion n'existe, elle est créée.
   * 
   * @returns Promise<Pool> La connexion PostegreSQL
   */
  static getPool(): Pool {
    if (!DbPostgreSQL.pool) {
        if(!process.env.DATABASE_URL)
            throw new Error("DATABASE_URL not defined")
      DbPostgreSQL.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl:{rejectUnauthorized:false},
      });
    }
    return DbPostgreSQL.pool;
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
    const pool = await DbPostgreSQL.getPool();


    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        role TEXT NOT NULL,
        name VARCHAR(200) NOT NULL UNIQUE,
        mail TEXT NOT NULL UNIQUE,
        passwordhash TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL UNIQUE,
        unit VARCHAR(50) NOT NULL
      )
    `);

   
    await pool.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id SERIAL PRIMARY KEY,
        contact_name VARCHAR(200) NOT NULL,
        mail TEXT NOT NULL UNIQUE,
        phone TEXT,
        address TEXT
      )
    `);

     await pool.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        article_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, article_id),
        FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
 

    await pool.query(`
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
