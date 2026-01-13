import type { SupplierRow } from "../types/supplierRow.js";
import { DbPostgreSQL } from "../database/dbPostgreSql.js";

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
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query(
      "INSERT INTO suppliers (contact_name, mail, phone, address) VALUES ($1, $2, $3, $4) RETURNING id",
      [suppliers.contact_name, suppliers.mail, suppliers.phone, suppliers.address]
    );
    return result.rows[0].id;
  }

  async delete(id: number): Promise<number> {
    if (!id) throw new Error("Cannot delete undefined supplier");
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("DELETE FROM suppliers WHERE id = $1", [id]);
    return result.rowCount!;
  }

  async findBySupplierId(id: number): Promise<SupplierRow | undefined> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("SELECT * FROM suppliers WHERE id = $1", [id]);
    return result.rows[0] as SupplierRow | undefined;
  }

  async findAllSuppliers(): Promise<SupplierRow[]> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("SELECT * FROM suppliers");
    return result.rows as SupplierRow[];
  }

  async updateName(id: number, name: string): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("UPDATE suppliers SET contact_name = $1 WHERE id = $2", [name, id]);
    return result.rowCount!;
  }

  async updateMail(id: number, mail: string): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("UPDATE suppliers SET mail = $1 WHERE id = $2", [mail, id]);
    return result.rowCount!;
  }

  async updatePhone(id: number, phone: string): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("UPDATE suppliers SET phone = $1 WHERE id = $2", [phone, id]);
    return result.rowCount!;
  }

  async updateAddress(id: number, address: string): Promise<number> {
    const pool = DbPostgreSQL.getPool();
    const result = await pool.query("UPDATE suppliers SET address = $1 WHERE id = $2", [address, id]);
    return result.rowCount!;
  }
}
