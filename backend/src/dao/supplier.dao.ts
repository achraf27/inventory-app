import type { SupplierRow } from "../types/supplierRow.js";
import { Db } from "../database/dbSqlite.js";

/**
 * Data Access Object pour les fournisseurs.
 * Contient toutes les opérations CRUD sur la table `suppliers`.
 */
export class SupplierDao {

  /**
   * Insère un nouveau fournisseur dans la base.
   *
   * @param suppliers Objet SupplierRow sans l'ID
   * @returns Promise<number> L'ID du fournisseur inséré
   * @throws Error si l'insertion échoue ou si lastID est undefined
   */
  async insert(suppliers: Omit<SupplierRow, "id">): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run(
      "INSERT INTO suppliers (contact_name, mail, phone, address) VALUES (?, ?, ?, ?)",
      suppliers.contact_name,
      suppliers.mail,
      suppliers.phone,
      suppliers.address
    );
    if (result.lastID === undefined) {
      throw new Error("Failed to get last inserted ID");
    }
    return result.lastID;
  }

  /**
   * Supprime un fournisseur existant par son ID.
   *
   * @param id ID du fournisseur
   * @returns Promise<number> Nombre de lignes supprimées
   * @throws Error si l'ID est undefined
   */
  async delete(id: number): Promise<number> {
    if (!id) {
      throw new Error("Cannot delete undefined supplier");
    }
    const db = await Db.getConnection();
    const result = await db.run("DELETE FROM suppliers WHERE id = ?", id);
    return result.changes!;
  }

  /**
   * Récupère un fournisseur par son ID.
   *
   * @param id ID du fournisseur
   * @returns Promise<SupplierRow | undefined> Le fournisseur trouvé ou undefined
   */
  async findBySupplierId(id: number): Promise<SupplierRow | undefined> {
    const db = await Db.getConnection();
    const row = await db.get("SELECT * FROM suppliers WHERE id = ?", id);
    return row as SupplierRow | undefined;
  }

  /**
   * Récupère tous les fournisseurs.
   *
   * @returns Promise<SupplierRow[]> Liste de tous les fournisseurs
   */
  async findAllSuppliers(): Promise<SupplierRow[]> {
    const db = await Db.getConnection();
    const rows = await db.all("SELECT * FROM suppliers");
    return rows as SupplierRow[];
  }

  /**
   * Met à jour le nom du contact d'un fournisseur.
   *
   * @param id ID du fournisseur
   * @param name Nouveau nom du contact
   * @returns Promise<number> Nombre de lignes modifiées
   */
  async updateName(id: number, name: string): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run("UPDATE suppliers SET contact_name = ? WHERE id = ?", name, id);
    return result.changes!;
  }

  /**
   * Met à jour l'adresse email d'un fournisseur.
   *
   * @param id ID du fournisseur
   * @param mail Nouvelle adresse email
   * @returns Promise<number> Nombre de lignes modifiées
   */
  async updateMail(id: number, mail: string): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run("UPDATE suppliers SET mail = ? WHERE id = ?", mail, id);
    return result.changes!;
  }

  /**
   * Met à jour le numéro de téléphone d'un fournisseur.
   *
   * @param id ID du fournisseur
   * @param phone Nouveau numéro de téléphone
   * @returns Promise<number> Nombre de lignes modifiées
   */
  async updatePhone(id: number, phone: string): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run("UPDATE suppliers SET phone = ? WHERE id = ?", phone, id);
    return result.changes!;
  }

  /**
   * Met à jour l'adresse d'un fournisseur.
   *
   * @param id ID du fournisseur
   * @param address Nouvelle adresse
   * @returns Promise<number> Nombre de lignes modifiées
   */
  async updateAddress(id: number, address: string): Promise<number> {
    const db = await Db.getConnection();
    const result = await db.run("UPDATE suppliers SET address = ? WHERE id = ?", address, id);
    return result.changes!;
  }
}
