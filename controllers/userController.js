const UserService = require('../services/userService');

class UserController {

    async register(req, res) {
        try {
            const user = await UserService.register(req.body);
            res.status(201).send({ message: 'User registered successfully', data: { user } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const user = await UserService.login(req.body);
            res.status(200).send({ message: 'User logged in successfully', data: { user } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    async getUser(req, res) {
        try {
            const user = await UserService.getUser(req.params.id);
            res.status(200).send({ data: { user } });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

}

module.exports = new UserController();
