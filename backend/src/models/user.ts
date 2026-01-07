import bcrypt from 'bcryptjs';

/**
 * DTO représentant un utilisateur.
 */
export type UserDto = {
  /** Identifiant unique de l'utilisateur */
  id: number;
  /** Nom de l'utilisateur */
  name: string;
  /** Email de l'utilisateur */
  mail: string;
  /** Rôle de l'utilisateur (ex: "Admin", "User") */
  role: string;
};

/**
 * Classe représentant un utilisateur dans le système.
 */
export class User {
  /** Identifiant de l'utilisateur, initialisé à -1 */
  id: number = -1;
  /** Rôle de l'utilisateur */
  readonly role: string;
  /** Nom de l'utilisateur */
  readonly name: string;
  /** Email de l'utilisateur */
  readonly mail: string;
  /** Hash du mot de passe (privé, non exposé) */
  private readonly passwordHash: string;

  /**
   * Crée une instance de User.
   *
   * @param role - Rôle de l'utilisateur ("Admin" ou "User")
   * @param name - Nom de l'utilisateur
   * @param mail - Email de l'utilisateur
   * @param password - Mot de passe en clair ou hashé
   * @param id - Identifiant optionnel (sert si l'utilisateur provient de la BDD)
   */
  constructor(role: string, name: string, mail: string, password: string, id?: number) {
    this.role = role;
    this.name = name;
    this.mail = mail;
    this.passwordHash = password;
    if (id) this.id = id;
  }

  /**
   * Vérifie si un mot de passe en clair correspond au hash stocké.
   *
   * @param plain - Mot de passe en clair à vérifier
   * @returns Promise<boolean> - True si le mot de passe est correct, false sinon
   */
  verifyPassword(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.passwordHash);
  }

  /**
   * Transforme l'objet User en DTO sérialisable.
   *
   * @returns UserDto - Objet contenant id, name, mail et role
   */
  toDto(): UserDto {
    return {
      id: this.id,
      name: this.name,
      mail: this.mail,
      role: this.role,
    };
  }
}
