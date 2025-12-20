import  type { SupplierRow } from "../types/supplierRow.js";
import { Db } from "../database/dbSqlite.js";

export class SupplierDao{

    async insert(suppliers: Omit<SupplierRow,"id">):Promise<number>{
        const db = await Db.getConnection()

      const result = await db.run("INSERT INTO suppliers (contact_name,mail,phone,address) VALUES (?,?,?,?)",
        suppliers.contact_name,
        suppliers.mail,
        suppliers.phone,
        suppliers.address,
    );
    if (result.lastID === undefined) {
        throw new Error("Failed to get last inserted ID");
      }

      return result.lastID;
      
  }

    async delete(id:number):Promise<number>{
        if (!id) {
            throw new Error('Cannot delete undefined article');
          }
        const db = await Db.getConnection();
        const result = await db.run("DELETE FROM suppliers WHERE id = ?", id);
        return result.changes!;

    }

    async findById(id:number): Promise<SupplierRow | undefined> {
        const db = await Db.getConnection();
        const row = await db.get("SELECT * FROM suppliers WHERE id = ?", id);
        return row as SupplierRow|undefined;
    }

    async findAll(): Promise<SupplierRow []> {
            const db = await Db.getConnection();
             const rows = await db.all( `
                SELECT
                 *
                FROM suppliers
                `);
            return rows as SupplierRow[]
        }
    


    async updateName(id:number, name:string):Promise<number>{
        const db = await Db.getConnection()

       const result = await db.run("UPDATE suppliers set contact_name = ?  WHERE id = ?",
            name,
            id
      );
      return result.changes!;
    }


    async updateMail(id:number, mail:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE suppliers set mail = ?  WHERE id = ?",
            mail,
            id
      );
      return result.changes!;
    }

    async updatePhone(id:number, phone:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE suppliers set phone = ?  WHERE id = ?",
            phone,
            id
      );
      return result.changes!;
    }

    async updateAddress(id:number, address:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE suppliers set address = ?  WHERE id = ?",
            address,
            id
      );
      return result.changes!;
    }

   
}