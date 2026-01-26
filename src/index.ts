import express from 'express'

const PORT = process.env['PORT'] || 5000

const server = express()

server.get('/', (req, res) => {
    res.send('Salam')
})

server.listen(PORT, () => {
    console.log(`[SERVER IS RUNNING ON PORT ${PORT}]`);
})