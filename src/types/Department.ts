import { ObjectId } from 'mongodb';

/** Département tel qu'exposé par l'API, avec un `id` lisible. */
export interface Department {
    label: string;
    value: string;
    id: string;
}

/** Payload pour créer un département (sans `id`, généré par MongoDB). */
export type NewDepartment = Omit<Department, 'id'>;

/** Département tel que stocké en base, avec le champ `_id` natif de MongoDB. */
export type DepartmentInDB = NewDepartment & { _id: ObjectId };
