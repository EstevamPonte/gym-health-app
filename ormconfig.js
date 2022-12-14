module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "ssl": process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  "migrations": [process.env.MIGRATIONS],
  "entities": [process.env.ENTITIES],
  "cli": {
    "migrationsDir": "src/database/migrations",
    "entitiesDir": "src/entities"
  }
}

