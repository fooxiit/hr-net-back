import type EmployeeController from '../controllers/EmployeeController.js';
import express from 'express';

/** Crée le router Express pour les routes `/employee` (GET liste, POST création). */
export default function employeeRouterFactory(controller: EmployeeController) {
    const router = express.Router();

    // Retourne la liste de tous les employés ; 404 si la base est vide.
    router.get('/', async (_req, res) => {
        try {
            const employees = await controller.employees;
            if (employees.length === 0) return res.sendStatus(404);
            res.status(200).send(JSON.stringify(employees));
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });

    // Crée un employé à partir du champ `employee` du corps de la requête ; 400 si absent.
    router.post('/', async (req, res) => {
        try {
            const { employee } = req.body || { employee: undefined };
            console.log(req);
            if (!employee) return res.sendStatus(400);
            await controller.save(employee);
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });

    return router;
}
