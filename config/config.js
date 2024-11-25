module.exports = {
  port_host1: 8081,
  port_host2: 8082,
  db: {
    database: process.env.DB_NAME || 'Store',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '995637',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost'
    }
    /*database: process.env.DB_NAME || 'store',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '995637',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost'
    }*/
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
//5432 /postgres