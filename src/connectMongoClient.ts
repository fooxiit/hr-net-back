import { MongoClient, type MongoClientOptions } from 'mongodb';

/** Établit et retourne une connexion au serveur MongoDB à l'URL donnée. */
export default async function connectMongoClient(url: string, option?: MongoClientOptions) {
    try {
        const client = new MongoClient(url, option);
        await client.connect();
        console.info(`connection to mongoDB ${url} success`);
        return client;
    } catch (err) {
        console.error(`connection to mongoDB ${url} fail`, err);
        throw err;
    }
}
