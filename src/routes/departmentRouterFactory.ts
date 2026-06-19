import type DepartmentController from '../controllers/DepartmentController.js';
import express from 'express';

/** Crée le router Express pour les routes `/department` (GET liste, POST création). */
export default function departmentRouterFactory(departmentController: DepartmentController) {
    const router = express.Router();

    // Retourne la liste de tous les départements ; 404 si la base est vide.
    router.get('/', async (_req, res) => {
        try {
            const departments = await departmentController.departments;
            if (departments.length === 0) return res.sendStatus(404);
            res.status(200).send(JSON.stringify(departments));
        } catch (error) {
            res.sendStatus(500);
        }
    });

    // Crée un département à partir du champ `department` du corps de la requête ; 400 si absent.
    router.post('/', async (req, res) => {
        const { department } = req.body;
        if (!department) return res.sendStatus(400);
        try {
            await departmentController.save(department);
            res.sendStatus(201);
        } catch (error) {
            res.sendStatus(500);
        }
    });
    return router;
}
