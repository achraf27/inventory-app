# Backend Express TypeScript

## Architecture du projet

```
backend/
├── src/
│   ├── app/                  # Fichier principal du serveur
│   ├── controllers/          # Logique métier des routes
│   ├── dao/                  # Accès aux données (Data Access Objects)
│   ├── middlewares/          # Middlewares Express
│   ├── models/               # Classes modèles
│   ├── repositories/         # Repository pattern
│   ├── routes/               # Définition des routes
│   └── types/                # Types TypeScript
├── dist/                      # Fichiers compilés
├── node_modules/
├── package.json
├── tsconfig.json
└── .env
```

### Description des dossiers

- **app/** : Point d'entrée de l'application et configuration du serveur Express
- **controllers/** : Gestion de la logique métier et orchestration des services
- **dao/** : Couche d'accès aux données, interaction directe avec la base de données
- **middlewares/** : Middlewares personnalisés (authentification, validation, gestion d'erreurs, etc.)
- **models/** : Définition des modèles de données et leurs types
- **repositories/** : Abstraction de la couche DAO, implémentation du pattern Repository
- **routes/** : Définition des endpoints et routage de l'API
- **types/** : Types TypeScript personnalisés

## Installation

```bash
npm install
```

## Scripts disponibles

### Développement

```bash
npm run build
```

# Démarrer le serveur en production
```bash
npm run start
```

# Démarrer le serveur en mode développement (avec rechargement automatique)
```bash
npm run dev
```

### Tests

J'ai crée a disposition un fichier Full_Verification dans le dossier test 
qui se charge de lancer tout les test 

```bash
./Full_Verification
```


### Documentation

```bash
# Générer la documentation TypeDoc
npm run doc
```

La documentation sera générée dans le dossier `docs/`.

## Déploiement

### Déploiement manuel

1. **Build du projet**

```bash
npm run build
```

2. **Démarrage du serveur**

```bash
npm start
```
