const router = require('express').Router()

router.get('/', (req, res)=> res.send('admin home route'));

router.get('/:id', (req, res) => res.send(`admin details for id: ${req.params.id}`))

module.exports = router;