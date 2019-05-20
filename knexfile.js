require('dotenv').config();
module.exports[process.env.NODE_ENV]= {
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 1,
        database: process.env.MYSQL_DATABASE || 'webnews'
    },
    pool: {
        min: 2,
        max: 10,
        afterCreate: function(conn, cb) {
          conn.query('SET sql_mode="NO_ENGINE_SUBSTITUTION";', function (err) {
            cb(err, conn);
          });
        }
    },
    migrations: {
        directory: __dirname + '/database/migrations/',
        tableName: 'migrations'
    },
    seeds: {
        directory: __dirname + '/database/seeds'
    }
};