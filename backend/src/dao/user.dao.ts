import type { UserRow } from "../types/userRow.js";
import { DbPostgreSQL } from "../database/dbPostgreSql.js";

/**
 * Data Access Object pour la table `users`.
 * Gère les opérations CRUD sur les utilisateurs.
 */
export class UserDao {

  async insert(user: Omit<UserRow, "id">): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "INSERT INTO users (role, name, mail, passwordhash) VALUES ($1, $2, $3, $4) RETURNING id",
      [user.role, user.name, user.mail, user.passwordhash]
    );
    return result.rows[0].id;
  }

  async updatePassword(id: number, passwordhash: string): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("UPDATE users SET passwordhash = $1 WHERE id = $2", [passwordhash, id]);
    return result.rowCount!
  }

  async updateName(id: number, name: string): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("UPDATE users SET name = $1 WHERE id = $2", [name, id]);
    return result.rowCount!
  }

  async updateMail(id: number, mail: string): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("UPDATE users SET mail = $1 WHERE id = $2", [mail, id]);
    return result.rowCount!
  }

  async updateRole(id: number, role: string): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("UPDATE users SET role = $1 WHERE id = $2", [role, id]);
    return result.rowCount!
  }

  async delete(id: number): Promise<number> {
    if (!id) throw new Error("Cannot delete undefined user");
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return result.rowCount!
  }

  async findAll(): Promise<UserRow[]> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "SELECT id, role, name, mail, passwordhash FROM users"
    );
    return result.rows as UserRow[];
  }

  async findById(id: number): Promise<UserRow | undefined> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "SELECT id, role, name, mail, passwordhash FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0] as UserRow | undefined;
  }

  async findByEmail(mail: string): Promise<UserRow | undefined> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "SELECT id, role, name, mail, passwordhash FROM users WHERE mail = $1",
      [mail]
    );
    return result.rows[0] as UserRow | undefined;
  }

  async findByUsername(name: string): Promise<UserRow | undefined> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "SELECT id, role, name, mail, passwordhash FROM users WHERE name = $1",
      [name]
    );
    return result.rows[0] as UserRow | undefined;
  }
}
