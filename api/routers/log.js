const router = require('express').Router()
const LogController = require('../controllers/logController')

router.get('/', LogController.fetchLogs);

module.exports = router;