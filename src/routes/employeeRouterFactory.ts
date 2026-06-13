import type EmployeeController from '../controllers/EmployeeController.js';
import express from 'express';
export default function employeeRouterFactory(controller: EmployeeController) {
    const router = express.Router();
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

    router.post('/', async (req, res) => {
        try {
            const { employee } = req.body;
            if (!employee) res.sendStatus(400);
            await controller.save(employee);
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });

    return router;
}
