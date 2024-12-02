const LogService = require('../services/logService');

class LogController {
    async fetchLogs(req, res) {
        try {
            const logs = await LogService.fetchLogs(req.query);
            res.status(200).send({ data: { logs } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

}

module.exports = new LogController();
