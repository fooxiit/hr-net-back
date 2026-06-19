# HRnet — Back-end

API REST pour l'application HRnet, réalisée dans le cadre du **Projet 14** de la formation [Développeur d'application JavaScript React](https://openclassrooms.com/fr/paths/517-developpeur-dapplication-javascript-react) d'OpenClassrooms.

Le front-end associé est disponible ici : [https://github.com/fooxiit/hr-net](https://github.com/fooxiit/hr-net)

---

## Stack technique

- **Runtime** : Node.js (ESM)
- **Framework** : Express 5
- **Langage** : TypeScript
- **Base de données** : MongoDB
- **Bibliothèques** : `mongodb`, `cors`, `body-parser`

---

## Prérequis

- Node.js >= 18
- MongoDB en cours d'exécution sur `localhost:27017`

---

## Installation

```bash
npm install
```

---

## Démarrage

```bash
npm start
```

Le serveur compile le TypeScript puis démarre sur le port **3000**.

La base de données attendue est `hrNet` sur l'instance MongoDB locale.

---

## Architecture

```
src/
├── app.ts                          # Point d'entrée : Express, CORS, routes
├── connectMongoClient.ts           # Connexion MongoDB
├── controllers/
│   ├── EmployeeController.ts       # Lecture et écriture des employés
│   └── DepartmentController.ts     # Lecture et écriture des départements
├── routes/
│   ├── employeeRouterFactory.ts    # Routes /employee
│   └── departmentRouterFactory.ts  # Routes /department
└── types/
    ├── Employee.ts                 # Types Employee, NewEmployee, EmployeeInDB
    └── Department.ts               # Types Department, NewDepartment, DepartmentInDB
```

---

## API

### Employés

| Méthode | Route       | Description                          | Corps attendu                  | Réponses      |
|---------|-------------|--------------------------------------|--------------------------------|---------------|
| GET     | `/employee` | Retourne la liste de tous les employés | —                              | 200, 404, 500 |
| POST    | `/employee` | Crée un nouvel employé               | `{ "employee": { ...champs } }` | 201, 400, 500 |

Champs d'un employé :

| Champ         | Type   |
|---------------|--------|
| `firstName`   | string |
| `lastName`    | string |
| `startDate`   | Date   |
| `department`  | string |
| `dateOfBirth` | Date   |
| `street`      | string |
| `city`        | string |
| `state`       | string |
| `zipCode`     | string |

### Départements

| Méthode | Route         | Description                             | Corps attendu                    | Réponses      |
|---------|---------------|-----------------------------------------|----------------------------------|---------------|
| GET     | `/department` | Retourne la liste de tous les départements | —                                | 200, 404, 500 |
| POST    | `/department` | Crée un nouveau département             | `{ "department": { ...champs } }` | 201, 400, 500 |

Champs d'un département :

| Champ   | Type   |
|---------|--------|
| `label` | string |
| `value` | string |

---

## CORS

Seules les requêtes provenant de `localhost` sont autorisées. Toute origine externe sera rejetée.
