require('dotenv').config()

const { Pool } = require('pg')

const DbConfig = {
    user: 'neondb_owner',
    host: 'ep-quiet-waterfall-ax2g7w40-pooler.c-4.us-east-2.aws.neon.tech',
    database: 'neondb',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(DbConfig)

export async function executeSQL(sqlScript, params = []) {
    try {
        const result = await pool.query(sqlScript, params)

        console.log('SQL executado com sucesso!')
        console.log('Registros afetados:', result.rowCount)

        return result

    } catch (error) {
        console.error('Erro ao executar SQL:', error.message)
        throw error
    }
}
