import { ObjectId } from 'mongodb';

export interface Department {
    label: string;
    value: string;
    id: string;
}

export type NewDepartment = Omit<Department, 'id'>;

export type DepartmentInDB = NewDepartment & { _id: ObjectId };
