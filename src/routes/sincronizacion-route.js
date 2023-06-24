import express from 'express'
import {SincronizacionService} from '../service'

const app = express()
const router = express.Router()
app.use('/api/sincronizacion', router)

// Obtiene todos los productos del inventario
router.get('/obtener-data', SincronizacionService.getObtenerData)


// code pass sha-2
router.post('/code-hash-pass', SincronizacionService.CodehashClave)


export default app