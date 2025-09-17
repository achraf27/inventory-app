# Cahier des charges : Application de gestion d’inventaire pour boulangerie

## 1. Contexte et objectifs
**Contexte :**  
La boulangerie souhaite disposer d’un outil interne simple pour gérer les stocks de produits, suivre les commandes fournisseurs et visualiser les ventes. L’application doit être accessible depuis un navigateur sur ordinateur ou tablette dans le magasin.

**Objectifs :**
- Suivi en temps réel des stocks et des produits.
- Gestion des fournisseurs et des commandes d’achat.
- Gestion des ventes et des mouvements de stock.
- Génération de rapports simples (produits faibles en stock, produits les plus vendus).
- Sécurisation de l’accès par authentification et rôles utilisateurs.

## 2. Public cible
- Propriétaire et gérants de la boulangerie.  
- Employés responsables de la caisse et du réapprovisionnement.

## 3. Fonctionnalités principales

### 3.1 Gestion des produits
- Ajouter, modifier et supprimer des produits.
- Stocker des informations : nom, description, prix, catégorie, photo, référence, code-barres.
- Gestion des stocks en temps réel (quantité disponible, seuil minimum).

### 3.2 Gestion des stocks
- Suivi des entrées et sorties de produits.
- Alertes automatiques pour stocks bas.
- Historique des mouvements de stock.

### 3.3 Gestion des fournisseurs
- Ajouter, modifier et supprimer des fournisseurs.
- Suivi des commandes passées et reçues.
- Informations de contact et conditions d’achat.

### 3.4 Gestion des ventes
- Enregistrer les ventes de produits.
- Mise à jour automatique des stocks après vente.
- Possibilité de générer des tickets ou bons de livraison.

### 3.5 Rapports et statistiques
- Produits en rupture ou proches du seuil minimal.
- Produits les plus vendus.
- Historique des entrées et sorties de stock.

### 3.6 Gestion des utilisateurs
- Authentification par login/mot de passe.
- Rôles : Administrateur (gestion complète), Employé (accès limité).
- Journalisation des actions pour suivi et audit.

## 4. Architecture technique

### 4.1 Frontend
- **Technologie :** React.js
- **Rôle :** interface utilisateur, tableaux de bord, formulaires, alertes.
- **Accessibilité :** navigateur desktop et tablette.

### 4.2 Backend
- **Technologie :** Express.js + Node.js
- **Rôle :** API REST pour le frontend, gestion des opérations CRUD, logique métier.

### 4.3 Base de données
- **Technologie :** Oracle Autonomous DB (Free Tier)
- **Rôle :** stockage des produits, stocks, commandes, utilisateurs et historiques.

### 4.4 Déploiement
- **Plateforme :** Oracle Cloud Free Tier
- **Configuration :** 1 vCPU, 1 Go RAM pour backend + base de données.
- **Sécurité :** HTTPS, authentification, sauvegardes régulières.

## 5. Contraintes
- Application légère pour fonctionner sur 1 vCPU / 1 Go RAM.
- Interface simple et intuitive pour des employés non techniques.
- Disponibilité 24/7 pour consultation du stock et prise de commandes.
- Protection des données internes (authentification obligatoire, sauvegardes).

## 6. Livrables
- Application frontend (React.js) prête à déployer.
- Backend (Express.js) avec API REST documentée.
- Base de données configurée et pré-remplie avec quelques exemples de produits.
- Documentation technique et guide utilisateur.

## 7. Planning
| Phase | Description | Durée |
|-------|-------------|-------|
| Analyse & conception | Cahier des charges, architecture technique | 1 semaine |
| Développement backend | API CRUD, authentification, logique métier | 2-3 semaines |
| Développement frontend | Interface utilisateur, tableaux de bord, formulaires | 2-3 semaines |
| Tests & corrections | Tests fonctionnels et sécurité | 1 semaine |
| Déploiement | Sur Oracle Cloud Free Tier, configuration HTTPS | 1 semaine |
| Formation utilisateur | Guide et formation rapide du personnel | 1 jour |

## 8. Évolutions possibles
- Ajout d’un module de prévisions de stock basé sur les ventes.
- Intégration d’un module caisse pour suivre les ventes en temps réel.
- Export des rapports au format PDF ou Excel.