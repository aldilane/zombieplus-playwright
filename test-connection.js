const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();

        console.log('✅ Conexão com Neon estabelecida!');

        const result = await client.query(`
            SELECT
                current_database() AS database,
                current_user AS usuario,
                NOW() AS data_hora,
                version() AS versao
        `);

        console.log('📌 Informações do banco:');
        console.table(result.rows);

    } catch (error) {
        console.error('❌ Erro na conexão:', error.message);

    } finally {
        await client.end();
    }
}

testConnection();
