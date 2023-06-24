import express from 'express'
import { PerfilamientoService } from '../service'

const app = express()
const router = express.Router()
app.use('/api/perfilamiento', router)

// Obtiene zonas de usuarios
router.get('/obtener-zonas', PerfilamientoService.getZonas)

// Obtiene perfiles del sistema
router.get('/obtener-perfiles', PerfilamientoService.getPerfiles)

// Obtiene usuarios del sistema
router.get('/obtener-usuarios', PerfilamientoService.getUsuarios)

// Obtiene zonas de usuarios
router.post('/crear-usuario', PerfilamientoService.addUsuario)

export default app