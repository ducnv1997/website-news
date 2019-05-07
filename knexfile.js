require('dotenv').config();
module.exports[process.env.NODE_ENV] = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '1',
        database: 'webnews'
    },
    migrations: {
        directory: __dirname + '/database/migrations/',
        tableName: 'migrations'
    },
    seeds: {
        directory: __dirname + '/database/seeds'
    }
};