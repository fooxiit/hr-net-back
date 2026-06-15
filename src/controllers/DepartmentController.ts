import type { Collection, MongoClient, ObjectId } from 'mongodb';
import type { DepartmentInDB, Department, NewDepartment } from '../types/Department.js';
export default class DepartmentController {
    private departmentsCollection: Collection<NewDepartment>;

    constructor(mongoClient: MongoClient) {
        this.departmentsCollection = mongoClient.db('hrNet').collection('departments');
    }

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

    async save(NewDepartment: NewDepartment) {
        try {
            const newDepartmentId = await this.departmentsCollection.insertOne(NewDepartment);
            return newDepartmentId;
        } catch (error) {
            console.error('failed to save department', error);
        }
    }
}

function departmentAdapter(departmentFromDB: DepartmentInDB): Department {
    const department = { ...departmentFromDB, id: departmentFromDB._id.toString(), value: departmentFromDB.label };
    delete (department as { _id?: ObjectId })._id;
    return department;
}
