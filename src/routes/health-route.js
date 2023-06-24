import express from 'express'

const app = express()

app.get('/api/health', (req, res) => {
    res.json({health: 'BDO Marine Foods - Back ok'})
})

export default app