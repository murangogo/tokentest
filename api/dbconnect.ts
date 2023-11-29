import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connection = {
    host: 'ep-wispy-sun-12751723-pooler.us-east-1.postgres.vercel-storage.com',
    port: 5432,
    database: 'verceldb',
    user: 'default',
    password: 'Uu2KczRb3qMZ',
    ssl: { rejectUnauthorized: false }
};

const db = pgp(connection);

export default db;