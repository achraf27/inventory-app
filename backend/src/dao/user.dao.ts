import type { UserRow } from "../types/userRow.js";
import { Db } from "../database/dbSqlite.js";


export class UserDao{

    async insert(user: Omit<UserRow,"id">):Promise<number>{
        const db = await Db.getConnection()

      const result = await db.run("INSERT INTO users (role, name, mail, password) VALUES (?, ?, ?, ?)",
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


    async updatePassword(id:number, password:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE users set password = ?  WHERE id = ?",
            password,
            id
      );
      return result.changes!;
    }

    async updateName(id:number, mail:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE users set name = ?  WHERE id = ?",
            mail,
            id
      );
      return result.changes!;
    }


    async updateMail(id:number, mail:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE users set mail = ?  WHERE id = ?",
            mail,
            id
      );
      return result.changes!;
    }

     async updateRole(id:number, role:string):Promise<number>{
        const db = await Db.getConnection()

        const result = await db.run("UPDATE users set role = ?  WHERE id = ?",
            role,
            id
      );
      return result.changes!;
    }

    async delete(id:number):Promise<number>{
        if (!id) {
            throw new Error('Cannot delete undefined user');
          }
        const db = await Db.getConnection();
        const result = await db.run("DELETE FROM users WHERE id = ?", id);
        return result.changes!;

    }

    async findAll(): Promise<UserRow []> {
        const db = await Db.getConnection();
         const rows = await db.all( `
            SELECT
              id,
              role,
              name,
              mail,
              password AS passwordHash
            FROM users
            `);
        return rows as UserRow[]
    }

    async findById(id:number): Promise<UserRow | undefined> {
        const db = await Db.getConnection();
         const row = await db.get( `
            SELECT
              id,
              role,
              name,
              mail,
              password AS passwordHash
            FROM users
            WHERE id = ?
          `,id);
        return row as UserRow;
    }

    async findByEmail(mail:string): Promise<UserRow | undefined> {
        const db = await Db.getConnection();
         const row = await db.get( `
            SELECT
              id,
              role,
              name,
              mail,
              password AS passwordHash
            FROM users
            WHERE mail = ?
          `,mail);
        return row as UserRow;
    }

    async findByUsername(name:string): Promise<UserRow | undefined> {
        const db = await Db.getConnection();
        const row = await db.get( `
            SELECT
              id,
              role,
              name,
              mail,
              password AS passwordHash
            FROM users
            WHERE name = ?
          `,name);
        return row as UserRow;
    }
}