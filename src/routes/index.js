import express from 'express'
import healthRoute from './health-route'
import sincronizacionRoute from './sincronizacion-route'
import perfilamientoRoute from './perfilamiento-route'

const app = express()

app.use(
    healthRoute,
    sincronizacionRoute,
    perfilamientoRoute
)

export default app