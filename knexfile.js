require('dotenv').config();
module.exports[process.env.NODE_ENV] = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'linh',
        password: '123',
        database: 'forum'
    },
    migrations: {
        directory: __dirname + '/database/migrations/',
        tableName: 'migrations'
    },
    seed: {
        directory: './database/seeder'
    }
};