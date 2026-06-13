import type EmployeeController from '../controllers/EmployeeController.js';
import express from 'express';
export default function employeeRouterFactory(controller: EmployeeController) {
    const router = express.Router();
    router.get('/', async (_req, res) => {
        try {
            const employees = await controller.employees;
            res.status(200).send(JSON.stringify(employees));
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });

    router.post('/', async (req, res) => {
        try {
            const { employee } = req.body;
            await controller.saveEmployee(employee);
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    });

    return router;
}
