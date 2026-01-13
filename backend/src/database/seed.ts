import bcrypt from "bcryptjs";
import { DbPostgreSQL } from "./dbPostgreSql.js";
import 'dotenv/config';

async function seed() {
  try {
    const pool = DbPostgreSQL.getPool();

    console.log("🌱 Début du seed...");

    // Vider les tables dans le bon ordre (à cause des clés étrangères)
    console.log("🗑️  Nettoyage des tables existantes...");
    await pool.query("DELETE FROM suppliers_articles");
    await pool.query("DELETE FROM inventory");
    await pool.query("DELETE FROM suppliers");
    await pool.query("DELETE FROM articles");
    await pool.query("DELETE FROM users");

    // Reset des séquences
    await pool.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    await pool.query("ALTER SEQUENCE articles_id_seq RESTART WITH 1");
    await pool.query("ALTER SEQUENCE suppliers_id_seq RESTART WITH 1");

    // Seed Users
    console.log("👤 Création des utilisateurs...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    const usersResult = await pool.query(`
      INSERT INTO users (role, name, mail, passwordhash) VALUES
      ('Admin', 'JeanDupont', 'jean.dupont@example.com', $1),
      ('User', 'MarieMartin', 'marie.martin@example.com', $1),
      ('User', 'PierreDurand', 'pierre.durand@example.com', $1),
      ('User', 'SophieBernard', 'sophie.bernard@example.com', $1)
      RETURNING id
    `, [hashedPassword]);
    
    const userIds = usersResult.rows.map(row => row.id);
    console.log(`✅ ${userIds.length} utilisateurs créés`);

    // Seed Articles
    console.log("📦 Création des articles...");
    const articlesResult = await pool.query(`
      INSERT INTO articles (name, unit) VALUES
      ('Farine T55', 'kg'),
      ('Sucre blanc', 'kg'),
      ('Beurre doux', 'kg'),
      ('Œufs', 'unité'),
      ('Lait entier', 'litre'),
      ('Levure fraîche', 'g'),
      ('Sel fin', 'kg'),
      ('Chocolat noir 70%', 'kg'),
      ('Vanille liquide', 'ml'),
      ('Amandes en poudre', 'kg')
      RETURNING id
    `);
    
    const articleIds = articlesResult.rows.map(row => row.id);
    console.log(`✅ ${articleIds.length} articles créés`);

    // Seed Suppliers
    console.log("🏢 Création des fournisseurs...");
    const suppliersResult = await pool.query(`
      INSERT INTO suppliers (contact_name, mail, phone, address) VALUES
      ('Paul Boulanger', 'contact@boulangerie-paul.fr', '0123456789', '15 Rue de la Paix, 75001 Paris'),
      ('Ferme Bio Dupuis', 'commande@ferme-dupuis.fr', '0234567890', '45 Chemin des Prés, 69002 Lyon'),
      ('Epicerie Fine Delmas', 'info@delmas-epicerie.fr', '0345678901', '28 Avenue Victor Hugo, 33000 Bordeaux'),
      ('Fromagerie Artisanale', 'vente@fromagerie-art.fr', '0456789012', '7 Place du Marché, 44000 Nantes')
      RETURNING id
    `);
    
    const supplierIds = suppliersResult.rows.map(row => row.id);
    console.log(`✅ ${supplierIds.length} fournisseurs créés`);

    // Seed Suppliers_Articles (relations)
    console.log("🔗 Création des relations fournisseurs-articles...");
    const supplierArticleRelations = [
      [supplierIds[0], articleIds[0]], // Paul Boulanger - Farine
      [supplierIds[0], articleIds[1]], // Paul Boulanger - Sucre
      [supplierIds[0], articleIds[5]], // Paul Boulanger - Levure
      [supplierIds[1], articleIds[3]], // Ferme Bio - Œufs
      [supplierIds[1], articleIds[4]], // Ferme Bio - Lait
      [supplierIds[1], articleIds[2]], // Ferme Bio - Beurre
      [supplierIds[2], articleIds[7]], // Epicerie Fine - Chocolat
      [supplierIds[2], articleIds[8]], // Epicerie Fine - Vanille
      [supplierIds[2], articleIds[9]], // Epicerie Fine - Amandes
      [supplierIds[3], articleIds[2]], // Fromagerie - Beurre
      [supplierIds[3], articleIds[6]], // Fromagerie - Sel
    ];

    for (const [supplierId, articleId] of supplierArticleRelations) {
      await pool.query(
        "INSERT INTO suppliers_articles (supplier_id, article_id) VALUES ($1, $2)",
        [supplierId, articleId]
      );
    }
    console.log(`✅ ${supplierArticleRelations.length} relations créées`);

    // Seed Inventory
    console.log("📊 Création de l'inventaire...");
    const inventoryData = [
      [articleIds[0], userIds[0], 50],  // Farine - Jean
      [articleIds[1], userIds[0], 30],  // Sucre - Jean
      [articleIds[2], userIds[1], 25],  // Beurre - Marie
      [articleIds[3], userIds[1], 120], // Œufs - Marie
      [articleIds[4], userIds[2], 40],  // Lait - Pierre
      [articleIds[5], userIds[2], 500], // Levure - Pierre
      [articleIds[6], userIds[3], 10],  // Sel - Sophie
      [articleIds[7], userIds[3], 15],  // Chocolat - Sophie
    ];

    for (const [articleId, userId, quantity] of inventoryData) {
      await pool.query(
        "INSERT INTO inventory (article_id, user_id, quantity) VALUES ($1, $2, $3)",
        [articleId, userId, quantity]
      );
    }
    console.log(`✅ ${inventoryData.length} entrées d'inventaire créées`);

    console.log("\n🎉 Seed terminé avec succès !");
    console.log("\n📋 Résumé :");
    console.log(`   - ${userIds.length} utilisateurs (mot de passe: password123)`);
    console.log(`   - ${articleIds.length} articles`);
    console.log(`   - ${supplierIds.length} fournisseurs`);
    console.log(`   - ${supplierArticleRelations.length} relations fournisseurs-articles`);
    console.log(`   - ${inventoryData.length} entrées d'inventaire`);

  } catch (error) {
    console.error("❌ Erreur lors du seed:", error);
    throw error;
  } finally {
    // Fermer la connexion
    await DbPostgreSQL.getPool().end();
  }
}



// Exécuter le seed
seed();

