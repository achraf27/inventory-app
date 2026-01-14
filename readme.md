# Inventory App

Application web de gestion d’inventaire avec authentification, rôles utilisateurs
et gestion fournisseurs / articles.

## Stack technique

### Frontend
- React (Vite)
- TypeScript
- Axios

### Backend
- Node.js
- Express
- TypeScript
- JWT (authentification)

### Base de données
- PostgreSQL (Neon)

### Déploiement
- Frontend : Vercel
- Backend : Render

## Fonctionnalités

- Authentification (login / register)
- Gestion des rôles (admin / user)
- CRUD articles
- Gestion des fournisseurs
- Gestion d’inventaire par utilisateur
- Relations entre fournisseurs et articles

## Structure du projet

inventory-app/
├── backend/
│   ├── dist/  
│   ├── docs/  
│   ├── src/
│   │   ├── app/              
│   │   ├── controllers/      
│   │   ├── dao/              
│   │   ├── middlewares/      
│   │   ├── models/           
│   │   ├── repositories/     
│   │   ├── routes/           
│   │   ├── types/            
│   │   └── database/
│   ├── tests/      
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/           
│   │   ├── components/       
│   │   ├── context/          
│   │   ├── pages/            
│   │   ├── scss/             
│   │   ├── services/         
│   │   └── utils/            
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   └── tsconfig.json
│
└── README.md


## Lancer le backend

```bash
cd backend
npm install
npm run build
npm start
```

## Lancer le frontend

```bash
cd backend
npm install
npm run dev
```


## Identifiants pour tester

Rôle: Admin
Nom d'utilisateur : JeanDupont
Mot de passe : password123

Rôle : Utilisateur
Nom d'utilisateur : MarieMartin
Mot de passe : password123

## Améliorations futures

- Pagination des résultats
- Refresh token
- CI/CD
- Dockerisation