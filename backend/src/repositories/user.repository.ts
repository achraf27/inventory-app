import { UserDao } from "../dao/user.dao.js";
import type { UserRow } from "../types/userRow.js";
import { User } from "../models/user.js";

/**
 * Données nécessaires pour créer un utilisateur
 */
export type CreateUserInput = {
  /** Rôle de l'utilisateur */
  role: string;
  /** Nom de l'utilisateur */
  name: string;
  /** Email de l'utilisateur */
  mail: string;
  /** Hash du mot de passe */
  passwordHash: string;
};

/**
 * Repository pour gérer les opérations sur les utilisateurs.
 */
export class UserRepository {
  private UserDao: UserDao;

  /**
   * Initialise le repository avec un DAO optionnel
   * @param dao - DAO pour la table users
   */
  constructor(dao = new UserDao()) {
    this.UserDao = dao;
  }

  /**
   * Transforme une ligne UserRow en objet User
   * @param row - Ligne de la table users
   * @returns Instance de User
   */
  private mapRowToUser(row: UserRow): User {
    return new User(row.role, row.name, row.mail, row.passwordHash, row.id);
  }

  /**
   * Récupère un utilisateur par ID, email ou nom
   * @param param - ID numérique ou string (email ou nom)
   * @returns User si trouvé, sinon undefined
   */
  public async getUser(param: number | string): Promise<User | undefined> {
    if (typeof param === "number") {
      const row = await this.UserDao.findById(param);
      return row ? this.mapRowToUser(row) : undefined;
    }

    if (param.includes("@")) {
      const row = await this.UserDao.findByEmail(param);
      return row ? this.mapRowToUser(row) : undefined;
    }

    const row = await this.UserDao.findByUsername(param);
    return row ? this.mapRowToUser(row) : undefined;
  }

  /**
   * Récupère tous les utilisateurs
   * @returns Tableau de User
   */
  public async getAllUsers(): Promise<User[] | undefined> {
    const rows = await this.UserDao.findAll();
    return rows.map(row => this.mapRowToUser(row));
  }

  /**
   * Crée un nouvel utilisateur
   * @param _user - Données du nouvel utilisateur
   * @returns User créé avec son ID
   */
  public async createUser(_user: CreateUserInput): Promise<User> {
    const newUser = new User(_user.role, _user.name, _user.mail, _user.passwordHash);
    const id = await this.UserDao.insert(_user);
    newUser.id = id;
    return newUser;
  }

  /**
   * Supprime un utilisateur
   * @param id - ID de l'utilisateur
   * @returns true si supprimé, false sinon
   */
  public async deleteUser(id: number): Promise<boolean> {
    const changes = await this.UserDao.delete(id);
    return changes > 0;
  }

  /**
   * Met à jour le nom d'un utilisateur
   * @param _id - ID de l'utilisateur
   * @param _name - Nouveau nom
   * @returns true si modifié, false sinon
   */
  public async updateName(_id: number, _name: string): Promise<boolean> {
    const changes = await this.UserDao.updateName(_id, _name);
    return changes > 0;
  }

  /**
   * Met à jour l'email d'un utilisateur
   * @param _id - ID de l'utilisateur
   * @param _mail - Nouvel email
   * @returns true si modifié, false sinon
   */
  public async updateMail(_id: number, _mail: string): Promise<boolean> {
    const changes = await this.UserDao.updateMail(_id, _mail);
    return changes > 0;
  }

  /**
   * Met à jour le mot de passe d'un utilisateur
   * @param _id - ID de l'utilisateur
   * @param _password - Nouveau mot de passe hashé
   * @returns true si modifié, false sinon
   */
  public async updatePassword(_id: number, _password: string): Promise<boolean> {
    const changes = await this.UserDao.updatePassword(_id, _password);
    return changes > 0;
  }

  /**
   * Met à jour le rôle d'un utilisateur
   * @param _id - ID de l'utilisateur
   * @param _role - Nouveau rôle
   * @returns true si modifié, false sinon
   */
  public async updateRole(_id: number, _role: string): Promise<boolean> {
    const changes = await this.UserDao.updateRole(_id, _role);
    return changes > 0;
  }
}
