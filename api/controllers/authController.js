const authService = require('../services/authService');

class authController {
    static async login(req, res) {
        try {
            const user = await authService.login(req.body);
            res.status(200).send({ message: 'Logged in successfully', data: { user } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    static async logout(req, res) {
        try {
            console.log("req.data",req.data)
            const result = await authService.logout(req.data.id);
            res.status(200).send({ message: 'Logged out successfully', data : true})
        } catch (error) {
            res.status(400).send({ message: error.message});
        }
    }
}

module.exports = authController;