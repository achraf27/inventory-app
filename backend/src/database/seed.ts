import bcrypt from "bcryptjs";
import { Db } from "./dbSqlite.js";

async function seed() {
  const db = await Db.getConnection();

  console.log("🌱 Seeding database...");

  // --- USERS ---
  const passwordHash = await bcrypt.hash("password123", 10);

  await db.run(`
    INSERT OR IGNORE INTO users (role, name, mail, password)
    VALUES 
      ('Admin', 'admin', 'admin@mail.com', ?),
      ('User', 'alice', 'alice@mail.com', ?),
      ('User', 'bob', 'bob@mail.com', ?)
  `, [passwordHash, passwordHash, passwordHash]);

  // --- SUPPLIERS ---
  await db.run(`
    INSERT OR IGNORE INTO suppliers (contact_name, mail, phone, address)
    VALUES
      ('FreshFarm', 'contact@freshfarm.com', '0102030405', 'Paris'),
      ('BioMarket', 'hello@biomarket.com', '0607080910', 'Lyon')
  `);

  // --- ARTICLES ---
  await db.run(`
    INSERT OR IGNORE INTO articles (name, unit)
    VALUES
      ('Tomates', 'kg'),
      ('Pommes', 'kg'),
      ('Lait', 'litre'),
      ('Farine', 'kg')
  `);

  // --- SUPPLIERS ↔ ARTICLES ---
  await db.run(`
    INSERT OR IGNORE INTO suppliers_articles (supplier_id, article_id)
    VALUES
      (1, 1),
      (1, 2),
      (2, 3),
      (2, 4)
  `);

  // --- INVENTORY (optionnel pour tests) ---
  await db.run(`
    INSERT OR IGNORE INTO inventory (user_id, article_id, quantity)
    VALUES
      (2, 1, 10), -- Alice : 10kg tomates
      (2, 3, 5),  -- Alice : 5L lait
      (3, 2, 7)   -- Bob : 7kg pommes
  `);

  console.log("✅ Database seeded successfully");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
});
