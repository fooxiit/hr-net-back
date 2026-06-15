import type DepartmentController from '../controllers/DepartmentController.js';
import express from 'express';
export default function departmentRouterFactory(departmentController: DepartmentController) {
    const router = express.Router();
    router.get('/', async (_req, res) => {
        try {
            const departments = await departmentController.departments;
            if (departments.length === 0) return res.sendStatus(404);
            res.status(200).send(JSON.stringify(departments));
        } catch (error) {
            res.sendStatus(500);
        }
    });

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
