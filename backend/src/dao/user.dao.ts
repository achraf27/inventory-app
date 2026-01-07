import type { UserRow } from "../types/userRow.js";
import { Db } from "../database/dbSqlite.js";

/**
 * Data Access Object pour la table `users`.
 * Gère les opérations CRUD sur les utilisateurs.
 */
export class UserDao {

  /**
   * Insère un nouvel utilisateur dans la base.
   *
   * @param user Objet contenant role, name, mail et passwordHash
   * @returns Promise<number> L'ID du nouvel utilisateur
   * @throws Error si l'insertion échoue
   */
  async insert(user: Omit<UserRow, "id">): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run(
      "INSERT INTO users (role, name, mail, password) VALUES (?, ?, ?, ?)",
      user.role,
      user.name,
      user.mail,
      user.passwordHash
    );

    if (result.lastID === undefined) {
      throw new Error("Failed to get last inserted ID");
    }

    return result.lastID;
  }

  /**
   * Met à jour le mot de passe d'un utilisateur.
   *
   * @param id ID de l'utilisateur
   * @param password Nouveau mot de passe hashé
   * @returns Promise<number> Nombre de lignes affectées
   */
  async updatePassword(id: number, password: string): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run("UPDATE users SET password = ? WHERE id = ?", password, id);
    return result.changes!;
  }

  /**
   * Met à jour le nom d'un utilisateur.
   *
   * @param id ID de l'utilisateur
   * @param name Nouveau nom
   * @returns Promise<number> Nombre de lignes affectées
   */
  async updateName(id: number, name: string): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run("UPDATE users SET name = ? WHERE id = ?", name, id);
    return result.changes!;
  }

  /**
   * Met à jour l'email d'un utilisateur.
   *
   * @param id ID de l'utilisateur
   * @param mail Nouvelle adresse email
   * @returns Promise<number> Nombre de lignes affectées
   */
  async updateMail(id: number, mail: string): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run("UPDATE users SET mail = ? WHERE id = ?", mail, id);
    return result.changes!;
  }

  /**
   * Met à jour le rôle d'un utilisateur.
   *
   * @param id ID de l'utilisateur
   * @param role Nouveau rôle
   * @returns Promise<number> Nombre de lignes affectées
   */
  async updateRole(id: number, role: string): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run("UPDATE users SET role = ? WHERE id = ?", role, id);
    return result.changes!;
  }

  /**
   * Supprime un utilisateur de la base.
   *
   * @param id ID de l'utilisateur
   * @returns Promise<number> Nombre de lignes affectées
   * @throws Error si l'ID est invalide
   */
  async delete(id: number): Promise<number> {
    if (!id) throw new Error("Cannot delete undefined user");
    const db = await Db.getConnection();
    const result = await db.run("DELETE FROM users WHERE id = ?", id);
    return result.changes!;
  }

  /**
   * Récupère tous les utilisateurs.
   *
   * @returns Promise<UserRow[]> Liste de tous les utilisateurs
   */
  async findAll(): Promise<UserRow[]> {
    const db = await Db.getConnection();
    const rows = await db.all(`
      SELECT id, role, name, mail, password AS passwordHash
      FROM users
    `);
    return rows as UserRow[];
  }

  /**
   * Récupère un utilisateur par son ID.
   *
   * @param id ID de l'utilisateur
   * @returns Promise<UserRow | undefined> L'utilisateur trouvé ou undefined
   */
  async findById(id: number): Promise<UserRow | undefined> {
    const db = await Db.getConnection();
    const row = await db.get(
      `SELECT id, role, name, mail, password AS passwordHash
       FROM users
       WHERE id = ?`,
      id
    );
    return row as UserRow;
  }

  /**
   * Récupère un utilisateur par son email.
   *
   * @param mail Email de l'utilisateur
   * @returns Promise<UserRow | undefined> L'utilisateur trouvé ou undefined
   */
  async findByEmail(mail: string): Promise<UserRow | undefined> {
    const db = await Db.getConnection();
    const row = await db.get(
      `SELECT id, role, name, mail, password AS passwordHash
       FROM users
       WHERE mail = ?`,
      mail
    );
    return row as UserRow;
  }

  /**
   * Récupère un utilisateur par son nom d'utilisateur.
   *
   * @param name Nom d'utilisateur
   * @returns Promise<UserRow | undefined> L'utilisateur trouvé ou undefined
   */
  async findByUsername(name: string): Promise<UserRow | undefined> {
    const db = await Db.getConnection();
    const row = await db.get(
      `SELECT id, role, name, mail, password AS passwordHash
       FROM users
       WHERE name = ?`,
      name
    );
    return row as UserRow;
  }
}
