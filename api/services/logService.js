const logModel = require('../models/logModel');

class LogService {
    static async recordLog(userId, action, details) {
        let log = new logModel({
            userId,
            action: action || '',
            details: details || {},
            timestamp: new Date()
        });
        await log.save();
    }

    static async fetchLogs(queryParam) {
        let query = {};
        if (queryParam.userId) {
            query.userId = queryParam.userId;
        }
        if (queryParam.startDate && queryParam.endDate) {
            query.timestamp = {
                $gte: new Date(queryParam.startDate),
                $lte: new Date(queryParam.endDate)
            };
        }
        let logs = await logModel.find(query);
        return logs;
    }
}

module.exports = LogService;