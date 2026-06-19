import type { Collection, MongoClient, ObjectId } from 'mongodb';
import type { DepartmentInDB, Department, NewDepartment } from '../types/Department.js';

/** Accès aux données des départements dans la collection MongoDB `hrNet.departments`. */
export default class DepartmentController {
    private departmentsCollection: Collection<NewDepartment>;

    constructor(mongoClient: MongoClient) {
        this.departmentsCollection = mongoClient.db('hrNet').collection('departments');
    }

    /** Retourne tous les départements de la base. */
    get departments() {
        return new Promise<Department[]>(async (resolve, rejects) => {
            try {
                const departments = (await this.departmentsCollection.find().toArray()).map((department) => departmentAdapter(department));
                resolve(departments);
            } catch (error) {
                console.error('failed to get departments', error);
                rejects(error);
            }
        });
    }

    /** Insère un nouveau département et retourne l'id généré. */
    async save(NewDepartment: NewDepartment) {
        try {
            const newDepartmentId = await this.departmentsCollection.insertOne(NewDepartment);
            return newDepartmentId;
        } catch (error) {
            console.error('failed to save department', error);
        }
    }
}

/** Convertit un document MongoDB en département API en remplaçant `_id` par `id` et en dérivant `value` depuis `label`. */
function departmentAdapter(departmentFromDB: DepartmentInDB): Department {
    const department = { ...departmentFromDB, id: departmentFromDB._id.toString(), value: departmentFromDB.label };
    delete (department as { _id?: ObjectId })._id;
    return department;
}
