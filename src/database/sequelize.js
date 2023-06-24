import { database as dbConfig } from '../config'
import { Sequelize } from 'sequelize'

export let sequelize

if (process.env.NODE_ENV === 'local') {
    sequelize = new Sequelize(dbConfig)
} else {
    sequelize = new Sequelize({
        dialect: 'mssql',
        timezone: '-03:00',
        pool: {
            max: Number(process.env.POOL_MAX) || 5,
            min: Number(process.env.POOL_MIN) || 0,
            idle: Number(process.env.POOL_IDLE) || 30000,
            acquire: Number(process.env.POOL_ACQUIRE) || 1000
          }        
    })
}

// sequelize.afterConnect(async (conn, _opt) => {
//     const searchPath = process.env.SCHEMA
//     console.log(`Seteando esquema ${searchPath}... `)
//     try {
//         await conn.query(`SET search_path = ${searchPath} `)
//     } catch (err) {
//         console.error('Error seteando esquema', err)
//     }
// })

export { Sequelize }

export default { sequelize, Sequelize }